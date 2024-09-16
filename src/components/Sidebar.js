// src/components/Sidebar.js

'use client';

import { useState, useEffect, useRef } from 'react';
import SideLinks from "@/components/SideLinks";

const Sidebar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const sidebarRef = useRef(null);
    const burgerRef = useRef(null); // Ref for the burger button

    const toggleSidebar = () => {
        // Toggle sidebar state when clicking on the burger button
        setIsSidebarOpen((prevState) => !prevState);
    };

    const closeSidebar = () => {
        // Close sidebar
        setIsSidebarOpen(false);
    };

    // Handle click outside to close sidebar
    useEffect(() => {
        const handleClickOutside = (event) => {
            // Check if the click was outside the sidebar or burger button
            if (
                sidebarRef.current &&
                !sidebarRef.current.contains(event.target) &&
                burgerRef.current &&
                !burgerRef.current.contains(event.target)
            ) {
                closeSidebar();
            }
        };

        // Add event listener
        document.addEventListener('mousedown', handleClickOutside);

        // Cleanup event listener on component unmount
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isSidebarOpen]);

    return (
        <>
            {/* Toggle Button for Mobile */}
            <button
                ref={burgerRef} // Reference for burger button
                className="md:hidden fixed top-4 left-4 z-20 p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition duration-200"
                onClick={toggleSidebar}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {/* Icon representing the burger menu */}
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>

            {/* Sidebar */}
            <aside
                ref={sidebarRef}
                className={`fixed inset-y-0 left-0 transform bg-gray-50 border-r border-gray-200 p-4 overflow-y-auto transition-transform duration-200 ease-in-out z-10 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 md:w-64`}
            >
                <div className="flex flex-col h-full">
                    <h2 className="hidden md:block text-xl font-bold mb-6">Menu</h2>
                    <nav className="flex-1 space-y-2 pt-12 md:pt-0">
                        {/* Pass closeSidebar function to SideLinks to close sidebar on link click */}
                        <SideLinks closeSidebar={closeSidebar} />
                    </nav>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
