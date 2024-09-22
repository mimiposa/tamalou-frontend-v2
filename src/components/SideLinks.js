// src/components/SideLinks.js

'use client';

import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import {RecipeContext} from "@/context/RecipeContext";
import {useContext, useEffect} from "react";


const SideLinks = ({ closeSidebar }) => {
    const { user } = useAuth();
    const { isClear, clearRecipe, resetClearRecipe } = useContext(RecipeContext);


    useEffect(() => {
        if (isClear) {
            // Reset the state after clearing the recipe
            resetClearRecipe();
        }
        console.log('user', user)
    }, [isClear, clearRecipe, resetClearRecipe]);

    const handleLinkClick = () => {
        // Call closeSidebar to close the sidebar when a link is clicked
        closeSidebar();
    };

    const handleClearRecipe = () => {
        if (!isClear) {
            clearRecipe();
        }
        closeSidebar();
    };

    return (
        <>
            <Link href="/" onClick={handleLinkClick} className="flex items-center px-4 py-2 text-gray-700 rounded-lg transition hover:text-gray-400 focus:text-gray-400">
                <span className="ml-3">Home</span>
            </Link>
            {user && (
                <>
                    <Link href="/recipes/generate" onClick={handleClearRecipe} className="flex items-center px-4 py-2 text-gray-700 rounded-lg transition focus:text-gray-400">
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
