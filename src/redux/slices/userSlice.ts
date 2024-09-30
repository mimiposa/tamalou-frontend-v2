import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

// Define the initial state
interface AuthState {
    user: null | { name: string; email: string; role?: string; };
    loading: boolean;
}

const initialState: AuthState = {
    user: null,
    loading: true,
};

// Async thunk for checking user session
export const checkUserSession = createAsyncThunk('auth/checkUserSession', async () => {
    const token = Cookies.get('token');
    if (token) {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/users/profile`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    }
    return null;
});

// Async thunk for logging in
export const login = createAsyncThunk('auth/login', async ({ email, password }: { email: string; password: string }) => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/users/login`, { email, password });
    Cookies.set('token', response.data.token);
    return response.data;
});

// Async thunk for registration
export const register = createAsyncThunk('auth/register', async ({ name, email, password }: { name: string; email: string; password: string; }) => {
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/users/register`, { name, email, password });
});

// Auth slice
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            Cookies.remove('token');
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(checkUserSession.pending, (state) => {
                state.loading = true;
            })
            .addCase(checkUserSession.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
            })
            .addCase(checkUserSession.rejected, (state) => {
                state.user = null;
                state.loading = false;  // Ensure loading stops if session retrieval fails
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
            });
    },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
