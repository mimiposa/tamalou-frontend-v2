'use client';

import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import NavLinks from "@/components/NavLinks"; // Import AuthContext to get the user's auth state

export default function Home() {
    const { user } = useAuth(); // Get the user state from AuthContext

    return (
        <>
            <header className="w-full">
                <nav className="w-full flex justify-end items-end">
                    <NavLinks/> {/* Updated dynamic navigation links */}
                </nav>
            </header>
            <div className="flex flex-col items-center justify-center min-h-screen">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Welcome to Tamalou</h1>
                <p className="px-5 text-center flex text-lg text-gray-600 mb-8">
                    Your personal essential oil recipe generator for everyday aches and pains.
                </p>

                {user ? ( // If the user is logged in, show different content
                    <div className="flex flex-col items-center">
                        <p className="text-lg text-gray-700 mb-6">Welcome
                            back, {user.name ? user.name : user.email}!</p>
                        <Link href="/profile/details"
                              className="bg-black text-white px-6 py-2 rounded-full shadow-md hover:bg-opacity-95 transition duration-200">
                            Go to Profile
                        </Link>
                    </div>
                ) : ( // If the user is not logged in, show the Register and Login buttons
                    <div className="flex gap-4">
                        <Link href="/register"
                              className="bg-black text-white px-6 py-2 rounded-full shadow-md hover:bg-opacity-95 transition duration-200">
                            Register
                        </Link>
                        <Link href="/login"
                              className="text-black  px-6 py-2 rounded-full shadow-md border-2 hover:bg-gray-200 transition duration-200">
                            Login
                        </Link>
                    </div>
                )}
            </div>
        </>
    );
}
