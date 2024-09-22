'use client';

import { useAuth } from '@/context/AuthContext';
import {useState} from "react";
import Image from "next/image";
import person from '../app/assets/person-profil.png';

const NavLinks = () => {
    const { logout, profile } = useAuth();
    const [open, setOpen] = useState(false);

    const openDropDown = () => {
        setOpen(!open);
    };

    return (
        <div className="relative">
            <button id="profile-btn" onClick={openDropDown} className="flex items-center text-gray-500 hover:text-gray-700 focus:outline-none">
                <Image src={person} alt="Profile" className="w-10"/>
            </button>
            {open &&
                <div id="profile-menu"
                     className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-10">
                    <div onClick={profile}
                            className={`block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer`}>
                        Mon profile
                    </div>
                    <div onClick={logout}
                            className={`block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer`}>
                        Mes recettes
                    </div>
                    <div onClick={logout}
                            className={`block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer`}>
                        Paramètres
                    </div>
                    <div onClick={logout}
                            className={`block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer`}>
                        Logout
                    </div>
                </div>
            }
        </div>
    );
};

export default NavLinks;
