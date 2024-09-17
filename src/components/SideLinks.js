// src/components/SideLinks.js

'use client';

import { useAuth } from '../context/AuthContext';
import Link from 'next/link';

const SideLinks = ({ closeSidebar }) => {
    const { user } = useAuth();

    const handleLinkClick = () => {
        // Call closeSidebar to close the sidebar when a link is clicked
        closeSidebar();
    };

    return (
        <>
            <Link href="/" onClick={handleLinkClick} className="flex items-center px-4 py-2 text-gray-700 rounded-lg transition hover:text-gray-400 focus:text-gray-400">
                <span className="ml-3">Home</span>
            </Link>
            {user && (
                <>
                    <Link href="/recipes" onClick={handleLinkClick} className="flex items-center px-4 py-2 text-gray-700 rounded-lg transition focus:text-gray-400">
                        <span className="ml-3">Recipes</span>
                    </Link>
                    <Link href="/recipes/generate" onClick={handleLinkClick} className="flex items-center px-4 py-2 text-gray-700 rounded-lg transition focus:text-gray-400">
                        <span className="ml-3">Tamalou</span>
                    </Link>
                </>
            )}
            {user && user.role === 'admin' && (
                <Link href="/admin" className="flex items-center px-4 py-2 text-gray-700 rounded-lg transition focus:text-gray-400">
                    <span className="ml-3">Admin Panel</span>
                </Link>
            )}

        </>
    );
};

export default SideLinks;
