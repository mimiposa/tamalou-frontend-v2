'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext'; // Import AuthContext to get the user's auth state

export default function Home() {
    const { user } = useAuth(); // Get the user state from AuthContext

    return (
        <div className="flex flex-col items-center justify-center min-h-screen-layout bg-gradient-to-r from-green-100 to-blue-100">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Tamalou</h1>
            <p className="text-lg text-gray-600 mb-8">
                Your personal essential oil recipe generator for everyday aches and pains.
            </p>

            {user ? ( // If the user is logged in, show different content
                <div className="flex flex-col items-center">
                    <p className="text-lg text-gray-700 mb-6">Welcome back, {user.name ? user.name : user.email}!</p>
                    <Link href="/profile" className="bg-green-500 text-white px-6 py-2 rounded-full shadow-md hover:bg-green-600 transition duration-200">
                        Go to Profile
                    </Link>
                </div>
            ) : ( // If the user is not logged in, show the Register and Login buttons
                <div className="flex gap-4">
                    <Link href="/register" className="bg-blue-500 text-white px-6 py-2 rounded-full shadow-md hover:bg-blue-600 transition duration-200">
                        Register
                    </Link>
                    <Link href="/login" className="bg-green-500 text-white px-6 py-2 rounded-full shadow-md hover:bg-green-600 transition duration-200">
                        Login
                    </Link>
                </div>
            )}
        </div>
    );
}
