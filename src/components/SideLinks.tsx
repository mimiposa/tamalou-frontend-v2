'use client';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { logout } from '../redux/slices/authSlice';
import { clearRecipe, resetClearRecipe } from '../redux/slices/recipeSlice';
import Cookies from "js-cookie";

// Define the types for props
interface SideLinksProps {
    closeSidebar: () => void;
}

const SideLinks: React.FC<SideLinksProps> = ({ closeSidebar }) => {
    const dispatch = useDispatch(); // Initialize dispatch for Redux actions
    const router = useRouter(); // Initialize router for navigation
    const { user, loading } = useSelector((state: RootState) => state.auth); // Use Redux state for auth
    const { isClear } = useSelector((state: RootState) => state.recipe); // Use Redux state for recipe

    useEffect(() => {
        if (isClear) {
            // Reset the state after clearing the recipe
            dispatch(resetClearRecipe()); // Dispatch the resetClearRecipe action from Redux
        }
    }, [isClear, dispatch]);

    const handleLinkClick = () => {
        // Call closeSidebar to close the sidebar when a link is clicked
        closeSidebar();
    };

    const handleClearRecipe = () => {
        if (!isClear) {
            dispatch(clearRecipe()); // Dispatch the clearRecipe action from Redux
        }
        closeSidebar();
    };

    const token = Cookies.get('token');
    console.log("user", user)


    return (
        <>
            <Link
                href="/"
                onClick={handleLinkClick}
                className="flex items-center px-4 py-2 text-gray-700 rounded-lg transition hover:text-gray-400 focus:text-gray-400"
            >
                <span className="ml-3">Home</span>
            </Link>
            {user && (
                <>
                    <Link
                        href="/recipes/generate"
                        onClick={handleClearRecipe}
                        className="flex items-center px-4 py-2 text-gray-700 rounded-lg transition focus:text-gray-400"
                    >
                        <span className="ml-3">Tamalou</span>
                    </Link>
                </>
            )}
            {user && user.data?.role === 'admin' && (
                <Link
                    href="/admin"
                    className="flex items-center px-4 py-2 text-gray-700 rounded-lg transition focus:text-gray-400"
                >
                    <span className="ml-3">Admin Panel</span>
                </Link>
            )}
        </>
    );
};

export default SideLinks;
