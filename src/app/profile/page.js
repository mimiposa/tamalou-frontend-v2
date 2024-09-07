'use client';

import { useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Profile = () => {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login'); // Redirect to login if not logged in
        }
    }, [user, loading, router]);

    if (loading) {
        return <p>Loading...</p>; // Show a loading message while checking auth state
    }

    return user ? (
        <div className="flex flex-col items-center justify-center min-h-screen-layout bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold mb-6 text-center">
                    Welcome, {user.name ? user.name : user.email} !
                </h1>
                {/* Display additional user details or actions */}
            </div>
        </div>
    ) : null;
};

export default Profile;
