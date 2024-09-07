'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // User state to manage login/logout
    const [loading, setLoading] = useState(true); // Loading state to handle auth check

    useEffect(() => {
        // Check for an active session on initial load
        const checkUserSession = async () => {
            const token = Cookies.get('token');
            if (token) {
                try {
                    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/users/profile`, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    setUser(response.data);
                } catch (err) {
                    console.error('Failed to fetch user profile', err);
                    setUser(null);
                }
            }
            setLoading(false);
        };

        checkUserSession();
    }, []);

    const login = async (email, password) => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/users/login`, { email, password });
            Cookies.set('token', response.data.token);
            setUser(response.data);
        } catch (err) {
            console.error('Login error', err);
            throw err; // Re-throw to handle errors in the component
        }
    };

    const logout = () => {
        Cookies.remove('token');
        setUser(null);
    };

    const register = async (name, email, password) => {
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/users/register`, { name, email, password });
        } catch (err) {
            console.error('Registration error', err);
            throw err;
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
