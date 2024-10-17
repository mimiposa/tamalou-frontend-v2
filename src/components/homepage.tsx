'use client';


import {useSelector} from "react-redux";
import {RootState} from "../redux/store";
import Link from "next/link";
import React from "react";
import Image from "next/image";

export const Homepage: React.FC = () => {
    const {user} = useSelector((state: RootState) => state?.auth || {}); // Redux for user state
    const profileSrc = "/assets/Tamalou-profile.jpg"
    const generateurSrc = "/assets/generateur.jpg"
    const recipeSrc = "/assets/recipes.jpg"

    return <>
            <div className="flex flex-col items-center justify-center">
                <div className="max-w-7xl mx-auto">
                    <div className="home-header flex flex-col justify-center items-center">
                        {/* Welcome Section */}
                        <div className="mb-10 text-gray-700">
                            <h2 className="text-2xl font-bold mb-6 mt-6">Welcome {user?.data?.name} !</h2>
                            <p className="text-sm font-medium">Find personalized essential oil recipes to relieve your
                                everyday aches and pains.</p>
                        </div>

                    </div>

                    {/* Get Started Section */}
                    <section className="mb-10">
                        <h2 className="text-2xl font-bold mt-6">Get Started</h2>

                        {/* Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Card 1: Set up your profile */}
                            <div className="flex flex-col justify-between bg-white p-6 rounded-lg shadow-lg">
                                <div className="flex items-center justify-center mb-4">
                                    <Image src={profileSrc} alt="profile" width={200} height={200}/>
                                </div>
                                <div className="mb-4">
                                    <h3 className="text-md font-semibold text-gray-700 mt-3 mb-3">Set up your profile</h3>
                                    <p className="text-sm text-gray-500 pt-2 pb-2">Add your personal details and preferences to get the
                                        most personalized recipes.</p>
                                </div>
                                <div className="flex justify-center items-center mt-3">

                                    <Link
                                        href="/profile"
                                        className="bg-[#A3B18A] text-white px-6 py-2 rounded-full transition duration-300 hover:bg-[#7d936a]">
                                        Profile Settings
                                    </Link>
                                </div>
                            </div>

                            {/* Card 2: Generate your first recipe */}
                            <div className="flex flex-col justify-between bg-white p-6 rounded-lg shadow-lg">
                                <div className="flex items-center justify-center mb-4">
                                    <Image src={generateurSrc} alt="profile"
                                           width="200"
                                           height={200}
                                           sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />

                                </div>
                                <div className="mb-4">
                                    <h3 className="text-md font-semibold text-gray-700 mt-3 mb-3">Generate your first recipe</h3>
                                    <p className="text-sm text-gray-500 pt-2 pb-2">Input your symptoms and receive a personalized essential oil recipe.</p>
                                </div>
                                <div className="flex justify-center items-center mt-3">

                                    <Link
                                        href="/recipes/generate"
                                        className="bg-[#A3B18A] text-white px-6 py-2 rounded-full transition duration-300 hover:bg-[#7d936a]">
                                        Generate Recipe
                                    </Link>

                                </div>
                            </div>

                            {/* Card 3: Explore your saved recipes */}
                            <div className="flex flex-col justify-between p-6 rounded-lg shadow-lg">
                                <div className="flex items-center justify-center mb-4">
                                    <Image src={recipeSrc} alt="profile" width={200} height={200}/>
                                </div>
                                <div className="mb-4">
                                    <h3 className="text-md font-semibold text-gray-700 mt-3 mb-3">Explore your saved recipes</h3>
                                    <p className="text-sm text-gray-500 pt-2 pb-2">Access and manage your saved recipes for different symptoms.</p>
                                </div>
                                <div className="flex justify-center items-center mt-3">
                                    <button
                                        className="bg-[#A3B18A] text-white px-6 py-2 rounded-full transition duration-300 hover:bg-[#7d936a]">View Recipes</button>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
};

export default Homepage;
