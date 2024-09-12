import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {toast} from "react-toastify";

let baseUrl = 'https://itransition-task4-server-nine.vercel.app/api/users'

const initialState = {
    users: [],
    loading: false,
    error: null,
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await axios.get(baseUrl);
    return response.data;
});

export const blockUsers = createAsyncThunk('users/blockUsers', async (userIds) => {
    console.log(userIds)
    await axios.put(baseUrl + '/block', {userIds});
    return userIds;
});

export const unblockUsers = createAsyncThunk('users/unblockUsers', async (userIds) => {
    await axios.put(baseUrl + '/unblock', {userIds});
    return userIds;
});

export const deleteUsers = createAsyncThunk('users/deleteUsers', async (userIds) => {
    let result = await axios.delete(baseUrl + '/delete', {data: {userIds}});
    return result.data;
});

export const selfBlock = createAsyncThunk('users/selfBlock', async (id)=>{
    let result = await axios.put(baseUrl + '/selfBlock', {id});
    return result.data;
})

export const deleteUserAsUser = createAsyncThunk('users/deleteUserAsUser', async (id) => {
    let result = await axios.delete(baseUrl + '/deleteSelf', {data: {id}});
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
                console.log(action);
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


            .addCase(deleteUserAsUser.pending, (state) => {
                state.loading = true
            })
            .addCase(deleteUserAsUser.fulfilled, (state) => {
                state.loading = false
                toast.success('You have deleted yourself')
                setTimeout(()=>{
                    window.location.reload();
                }, 1000)
            })
            .addCase(deleteUserAsUser.rejected, (state) => {
                state.loading = false
                toast.error('Failed to delete yourself')
            });
    },
});

export default userSlice.reducer;