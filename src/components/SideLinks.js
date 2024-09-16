'use client';

import { useAuth } from '../context/AuthContext';
import Link from 'next/link';

const SideLinks = () => {
    const { user, logout } = useAuth();

    return (
        <>
            <Link href="/" className="flex items-center px-4 py-2 text-gray-700 rounded-lg transition hover:text-gray-400 focus:text-gray-400">
                <span  className="ml-3">Home</span>
            </Link>
            {user && (
                <>
                    <Link href="/recipes" className="flex items-center px-4 py-2 text-gray-700 rounded-lg transition focus:text-gray-400">
                        <span  className="ml-3">Recipes</span>
                    </Link>
                    <Link href="/recipes/generate"
                          className="flex items-center px-4 py-2 text-gray-700 rounded-lg transition focus:text-gray-400">
                        <span className="ml-3">Tamalou</span>
                    </Link>
                </>
            )}

        </>
    );
};

export default SideLinks;
