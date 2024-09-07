'use client';

import { useAuth } from '../context/AuthContext';
import Link from 'next/link';

const NavLinks = () => {
    const { user, logout } = useAuth();

    return (
        <>
            {!user ? (
                <>
                    <Link href="/login" className="text-lg font-semibold text-gray-700 hover:text-blue-500">
                        Login
                    </Link>
                    <Link href="/register" className="text-lg font-semibold text-gray-700 hover:text-blue-500">
                        Register
                    </Link>
                </>
            ) : (
                <button onClick={logout} className="text-lg font-semibold text-gray-700 hover:text-blue-500">
                    Logout
                </button>
            )}
        </>
    );
};

export default NavLinks;
