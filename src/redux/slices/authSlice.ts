import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';
import {jwtDecode} from "jwt-decode";
import {purgeStoredState} from "redux-persist";
import {persistConfig} from "../store";
import {router} from "next/client";

// Define the initial state
interface AuthState {
    user: null | UserData;
    retrievedUser: null | User;
    loading: boolean;
}

export interface UserData {
    data: null | User;
}


export interface User {
    user: any;
    name: string;
    email: string;
    role?: string;
    password?: string;
}

const initialState: AuthState = {
    user: null,
    retrievedUser: null,
    loading: true,
};

// Helper function to check token expiration
const isTokenExpired = (token: string): boolean => {
    try {
        const decoded: any = jwtDecode(token);
        const currentTime = Date.now() / 1000; // Current time in seconds
        return decoded.exp < currentTime;
    } catch (error) {
        return true; // If decoding fails, assume token is expired
    }
};

// Async thunk for checking user retrievedUser
export const checkUserSession = createAsyncThunk('auth/checkUserSession', async (_, { dispatch }) => {
    const token = Cookies.get('token');

    if (token) {
        // Check if token has expired
        if (isTokenExpired(token)) {
            // If token expired, log out the user
            dispatch(logout());
            return null;
        }

        // If token is valid, fetch user data
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/users/profile`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    }
    return null;
});

// Async thunk for logging in
export const login = createAsyncThunk('auth/login', async ({ email, password }: { email: string; password: string }) => {
    const token = Cookies.get('token');

    const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/login`,
        { email, password },
        {
            headers: { Authorization: `Bearer ${token}` }
        }
    );
    Cookies.set('token', response.data.token);

    return response.data;
});

// Async thunk for registration
export const register = createAsyncThunk('auth/register', async ({ name, email, password }: { name: string; email: string; password: string }) => {
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/users/register`, { name, email, password });
});

// Auth slice
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            Cookies.remove('token');
            // Purge the persisted state
            purgeStoredState(persistConfig);
            state.user = null;
            state.retrievedUser = null;
            //router.push('/login')
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(checkUserSession.pending, (state) => {
                state.loading = true;
            })
            .addCase(checkUserSession.fulfilled, (state, action) => {
                state.retrievedUser = action.payload;
                state.loading = false;
            })
            .addCase(checkUserSession.rejected, (state) => {
                state.loading = false;  // Ensure loading stops if login fails
            })
            .addCase(login.pending, (state) => {
                state.loading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
            })
            .addCase(login.rejected, (state) => {
                state.loading = false;  // Ensure loading stops if login fails
            })
    },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
