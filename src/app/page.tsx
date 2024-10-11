'use client';

import Link from 'next/link';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import React, {FC} from 'react';
import Homepage from "../components/homepage";

const Home: FC = () => {

    const { user } = useSelector((state: RootState) => state?.auth); // Redux for user state

    return (
        <div className="flex flex-col items-center justify-center md:p-8 min-h-dvh">
            <div className="flex flex-col items-center justify-center">


                {user ?
                    <Homepage/>

                    :   <>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                            Welcome to Tamalou
                        </h1>
                        <p className="px-5 text-center flex text-lg text-gray-600 mb-8">
                            Your personal essential oil recipe generator for everyday aches and pains.
                        </p>
                        <div className="flex gap-4">
                        <Link
                        href="/register"
                        className="bg-black text-white px-6 py-2 rounded-full shadow-md hover:bg-opacity-95 transition duration-200">
                        Register
                        </Link>
                            <Link
                                href="/login"
                                className="text-black px-6 py-2 rounded-full shadow-md border-2 hover:bg-gray-200 transition duration-200">
                                Login
                            </Link>
                        </div>
                    </>
                }
            </div>
        </div>
    );
};

export default Home;
