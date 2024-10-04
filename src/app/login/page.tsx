'use client'

import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import DOMPurify from 'dompurify';
import {checkUserSession, login} from '../../redux/slices/authSlice'; // Import the login action
import {AppDispatch, RootState} from '../../redux/store';
import Homepage from '../../components/homepage';
import Cookies from "js-cookie";

const Login: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const {user, loading} = useSelector((state: RootState) => state.auth); // Redux for user state
    const [clientReady, setClientReady] = useState(false);


    useEffect(() => {
        setClientReady(true); // Ensures client-side rendering
    }, []);


    if (!clientReady) return null; // Avoid mismatches between server and client

    const token = Cookies.get('token');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');  // Clear any previous errors

        try {
            await dispatch(login({email, password}));
            await dispatch(checkUserSession());


        } catch (err) {
            setError('Login failed. Please check your credentials.');
        }
    };


    return (
        <>
            {clientReady && user ?
                <Homepage/> :
                <div className="flex flex-col items-center justify-center md:p-8 min-h-dvh p-10">
                    <div className="w-full max-w-md p-8 bg-white rounded-lg md:shadow-lg">
                        <h1 className="text-2xl font-bold mb-6 text-center">Welcome!</h1>
                        <form onSubmit={handleLogin} className="space-y-4">
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(DOMPurify.sanitize(e.target.value))}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
                                required
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(DOMPurify.sanitize(e.target.value))}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
                                required
                            />
                            <button
                                type="submit"
                                className="w-full bg-gray-200 text-black px-6 py-2 rounded-full shadow-md border-2 hover:text-white hover:bg-black transition duration-200">
                                Login
                            </button>
                        </form>
                        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
                    </div>
                </div>
            }
        </>

    )

}


export default Login;
