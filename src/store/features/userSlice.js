import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {toast} from "react-toastify";
import {baseUrl} from "../../url/baseUrl";

const initialState = {
    users: [],
    loading: false,
    error: null,
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await axios.get(baseUrl+'/api/users');
    console.log(response)
    return response.data;
});

export const blockUsers = createAsyncThunk('users/blockUsers', async (userIds) => {
    await axios.put(baseUrl + '/api/users/block', {userIds});
    return userIds;
});

export const unblockUsers = createAsyncThunk('users/unblockUsers', async (userIds) => {
    await axios.put(baseUrl + '/api/users/unblock', {userIds});
    return userIds;
});

export const deleteUsers = createAsyncThunk('users/deleteUsers', async (userIds) => {
    let result = await axios.delete(baseUrl + '/api/users/delete', {data: {userIds}});
    return result.data;
});

export const selfBlock = createAsyncThunk('users/selfBlock', async (id)=>{
    let result = await axios.put(baseUrl + '/api/users/selfBlock', {id});
    return result.data;
})

export const selfDelete = createAsyncThunk('users/selfDelete', async (id) => {
    let result = await axios.delete(baseUrl + '/api/users/selfDelete', {data: {id}});
    return result.data;
});



const userSlice = createSlice({
    name: 'users',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            .addCase(selfBlock.pending, (state) => {
                state.loading = true
            })
            .addCase(selfBlock.fulfilled, (state) => {
                state.loading = false
                toast.success('You have blocked yourself')
                setTimeout(()=>{
                    window.location.reload();
                }, 1000)
            })
            .addCase(selfBlock.rejected, (state) => {
                state.loading = false
                toast.error('Failed to block yourself')
            })


            .addCase(selfDelete.pending, (state) => {
                state.loading = true
            })
            .addCase(selfDelete.fulfilled, (state) => {
                state.loading = false
                toast.success('You have deleted yourself')
                setTimeout(()=>{
                    window.location.reload();
                }, 1000)
            })
            .addCase(selfDelete.rejected, (state) => {
                state.loading = false
                toast.error('Failed to delete yourself')
            });
    },
});

export default userSlice.reducer;