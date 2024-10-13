'use client';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import person from '../../public/assets/person-profil.png';
import { logout } from '../redux/slices/authSlice';

const NavLinks = () => {
    const dispatch = useDispatch(); // Initialize dispatch for Redux actions
    const router  = useRouter(); // Initialize dispatch for Redux actions
    const [open, setOpen] = useState(false);

    const openDropDown = () => {
        setOpen(!open);
    };

    const handleProfileNavigation = () => {
        router.push('/profile'); // Navigate to the profile page
    };

    const handleLogout = () => {
        dispatch(logout()); // Dispatch the logout action from Redux
        router.push('/login'); // Navigate to the login page
    };

    return (
        <div className="absolute w-full flex justify-end right-2 top-5">
            <button
                id="profile-btn"
                onClick={openDropDown}
                className="flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
            >
                <Image src={person} alt="Profile" width={40} height={40} />
            </button>

            {open && (
                <div
                    id="profile-menu"
                    className="absolute top-6 right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-10"
                >
                    <div
                        onClick={handleProfileNavigation}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                    >
                        Mon profile
                    </div>
                    {/*<div
                        onClick={handleLogout}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                    >
                        Mes recettes
                    </div>
                    <div
                        onClick={handleLogout}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                    >
                        Paramètres
                    </div>*/}
                    <div
                        onClick={handleLogout}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                    >
                        Logout
                    </div>
                </div>
            )}
        </div>
    );
};

export default NavLinks;
