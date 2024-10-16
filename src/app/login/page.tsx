'use client'

import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import DOMPurify from 'dompurify';
import {checkUserSession, login} from '../../redux/slices/authSlice'; // Import the login action
import {AppDispatch, RootState} from '../../redux/store';
import Homepage from '../../components/homepage';

const Login: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const {user} = useSelector((state: RootState) => state?.auth || {}); // Redux for user state
    const [clientReady, setClientReady] = useState(false);


    useEffect(() => {
        dispatch(checkUserSession())
        setClientReady(true); // Ensures client-side rendering
    }, []);


    if (!clientReady) return null; // Avoid mismatches between server and client

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');  // Clear any previous errors

        try {
            if(!user) {
                await dispatch(login({email, password}));
            } else {
                await dispatch(checkUserSession());
            }
        } catch (err) {
            setError('Login failed. Please check your credentials.');
        }
    };

    return (
        <div>
            {clientReady && user ?
                <Homepage/> :
                <div className="flex flex-col items-center justify-center md:p-10 min-h-dvh">
                    <div className="w-full max-w-md p-8 bg-white rounded-lg">
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
                                className="bg-[#A3B18A] text-white px-6 py-2 rounded-full transition duration-300 hover:bg-[#7d936a] w-full">
                                Login
                            </button>
                        </form>
                        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
                    </div>
                </div>
            }
        </div>

    )

}


export default Login;
