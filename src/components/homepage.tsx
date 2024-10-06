'use client';


import {useSelector} from "react-redux";
import {RootState} from "../redux/store";
import {router} from "next/client";
import Link from "next/link";
import React from "react";

export const Homepage: React.FC = () => {
    const {user} = useSelector((state: RootState) => state.auth); // Redux for user state

    const handleRecipesNavigation = () => {
        router.push('/recipes/generate'); // Navigate to the profile page
    };

    return <>
            <div className="flex flex-col items-center justify-center">
                <div className="max-w-7xl mx-auto">
                    {/* Welcome Section */}
                    <div className="mb-10">
                        <h2 className="text-2xl font-bold mb-6">Welcome {user?.data?.name} !</h2>
                        <p className="text-sm font-medium text-gray-800">Find personalized essential oil recipes to relieve your
                            everyday aches and pains.</p>
                    </div>

                    {/* Get Started Section */}
                    <section className="mb-10">
                        <h2 className="text-2xl font-bold mb-6">Get Started</h2>

                        {/* Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Card 1: Set up your profile */}
                            <div className="flex flex-col justify-between bg-white p-6 rounded-lg shadow-lg">
                                <div className="flex items-center justify-center mb-4">
                                    <div className="bg-gray-200 p-4 rounded-full">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-gray-500"
                                             fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                  d="M5.121 19.071A7.5 7.5 0 0112 12m0 0a7.5 7.5 0 017.071 7.071M12 12v4m0-10a3 3 0 100 6 3 3 0 000-6z"/>
                                        </svg>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <h3 className="text-md font-semibold text-gray-700 mt-3 mb-3">Set up your profile</h3>
                                    <p className="text-sm text-gray-500 pt-2 pb-2">Add your personal details and preferences to get the
                                        most personalized recipes.</p>
                                </div>
                                <div className="flex justify-center items-center mt-3">

                                    <Link
                                        href="/profile"
                                        className="text-md bg-gray-800 text-white px-4 py-2 rounded-lg">
                                        Profile Settings
                                    </Link>
                                </div>
                            </div>

                            {/* Card 2: Generate your first recipe */}
                            <div className="flex flex-col justify-between bg-white p-6 rounded-lg shadow-lg">
                                <div className="flex items-center justify-center mb-4">
                                    <div className="bg-gray-200 p-4 rounded-full">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-gray-500"
                                             fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                  d="M8 12h8m-4-4v8m7-8H5m0 0v8a2 2 0 002 2h10a2 2 0 002-2V8m-2 0V6a2 2 0 00-2-2H9a2 2 0 00-2 2v2z"/>
                                        </svg>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <h3 className="text-md font-semibold text-gray-700 mt-3 mb-3">Generate your first recipe</h3>
                                    <p className="text-sm text-gray-500 pt-2 pb-2">Input your symptoms and receive a personalized essential oil recipe.</p>
                                </div>
                                <div className="flex justify-center items-center mt-3">

                                    <Link
                                        href="/recipes/generate"
                                        className="text-md bg-gray-800 text-white px-4 py-2 rounded-lg">
                                        Generate Recipe
                                    </Link>

                                </div>
                            </div>

                            {/* Card 3: Explore your saved recipes */}
                            <div className="flex flex-col justify-between p-6 rounded-lg shadow-lg">
                                <div className="flex items-center justify-center mb-4">
                                    <div className="bg-gray-200 p-4 rounded-full">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-gray-500"
                                             fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                  d="M5 5v14l7-7 7 7V5a2 2 0 00-2-2H7a2 2 0 00-2 2z"/>
                                        </svg>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <h3 className="text-md font-semibold text-gray-700 mt-3 mb-3">Explore your saved recipes</h3>
                                    <p className="text-sm text-gray-500 pt-2 pb-2">Access and manage your saved recipes for different symptoms.</p>
                                </div>
                                <div className="flex justify-center items-center mt-3">
                                    <button
                                        onClick={() => handleRecipesNavigation}
                                        className="text-md bg-gray-800 text-white px-4 py-2 rounded-lg">View Recipes</button>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
};

export default Homepage;
