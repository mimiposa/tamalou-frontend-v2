'use client';

import { useAuth } from '../context/AuthContext';
import Link from 'next/link';

const NavLinks = () => {
    const { user, logout } = useAuth();

    return (
        <>
            <Link href="/" className="text-lg font-semibold text-gray-700 hover:text-gray-400 focus:text-gray-400">
                Home
            </Link>
            <Link href="/recipes" className="text-lg font-semibold text-gray-700 hover:text-gray-400 focus:text-gray-400">
                Recipes
            </Link>
            {user && (
                <Link href="/recipes/create" className="text-lg font-semibold text-gray-700 hover:text-gray-400 focus:text-gray-400">
                    Tamalou
                </Link>
            )}
            {!user ? (
                <>
                    <Link href="/login" className="text-lg font-semibold text-gray-700 hover:text-gray-400 focus:text-gray-400">
                        Login
                    </Link>
                    <Link href="/register" className="text-lg font-semibold text-gray-700 hover:text-gray-400 focus:text-gray-400">
                        Register
                    </Link>
                </>
            ) : (
                <button onClick={logout} className="text-lg font-semibold text-gray-700 hover:text-gray-400 focus:text-gray-400">
                    Logout
                </button>
            )}
        </>
    );
};

export default NavLinks;
