import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {toast} from "react-toastify";

let baseUrl = 'https://itransition-task4-server-nine.vercel.app/api/auth'

const initialState = {
    user: null,
    loading: false,
    error: false,
};

export const login = createAsyncThunk(
    'auth/login',
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await axios.post(baseUrl+'/login', credentials);
            return response.data;
        } catch (error) {
             return rejectWithValue(error);
        }
    }
);

export const registration = createAsyncThunk(
    'auth/registration',
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.post(baseUrl+'/registration', data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                if (action?.payload?.response?.data?.message){
                    toast.error(action?.payload?.response?.data?.message)
                }
                state.error = true
            })
            .addCase(registration.pending, (state) => {
                state.loading = true;
            })
            .addCase(registration.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(registration.rejected, (state, action) => {
                state.loading = false;
                if (action?.payload?.response?.data?.message){
                    toast.error(action?.payload?.response?.data?.message)
                }
                state.error = true
            });
    },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;