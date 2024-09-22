'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import {useAuth} from "@/context/AuthContext";
import NavLinks from "@/components/NavLinks";

const ProfilePage = () => {
    const [userProfile, setUserProfile] = useState({});
    const [last5Recipes, setLast5Recipes] = useState([]);
    const [newRecipe, setNewRecipe] = useState({ name: '', ingredients: '', notes: '' });
    const { user } = useAuth(); // Get the user state from AuthContext

    // Fetch user profile and last 5 generated recipes
    useEffect(() => {
        const fetchData = async () => {
            const token = Cookies.get('token');
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/users/profile`,
                    {
                    headers: { Authorization: `Bearer ${token}` },
                });
                console.log("user", user)
                setUserProfile(user);
                setLast5Recipes(response.data.recipes);
            } catch (error) {
                console.error('Error fetching profile data:', error);
            }
        };
        fetchData();
    }, [user]);

    // Handle Add Recipe
    const handleAddRecipe = async (e) => {
        e.preventDefault();
        // Logic for adding recipe
    };

    return userProfile && <>
        <header className="w-full">
            <nav className="w-full flex justify-end items-end">
                <NavLinks/> {/* Updated dynamic navigation links */}
            </nav>
        </header>
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-full max-w-md bg-white rounded-lg p-6">
                <h2 className="text-2xl font-bold text-center mb-6">Welcome!</h2>

                    {/* User Profile Section */}
                    <div className="mb-6">
                        <h3 className="text-xl font-semibold">Profile Details</h3>
                        <p><strong>Name:</strong> {userProfile.name}</p>
                        <p><strong>Email:</strong> {userProfile.email}</p>
                        <button className="bg-black text-white px-4 py-2 rounded-full mt-4 hover:bg-black">
                            Edit Profile
                        </button>
                    </div>

                    {/* Recently Generated Recipes */}
                    <div className="mb-6">
                        <h3 className="text-xl font-semibold">Recently Generated Recipes</h3>
                        <ul className="list-disc list-inside mt-4">
                            {last5Recipes && last5Recipes.length > 0 ? last5Recipes.map(recipe => (
                                <li key={recipe.id} className="mb-2">{recipe.name}</li>
                            )) : <p>No recent recipes</p>}
                        </ul>
                    </div>

                    {/* Add Your Own Recipe */}
                    <div>
                        <h3 className="text-xl font-semibold">Add Your Own Recipe</h3>
                        <form onSubmit={handleAddRecipe} className="mt-4">
                            <div className="mb-4">
                                <label className="block mb-1 font-medium">Recipe Name</label>
                                <input
                                    type="text"
                                    value={newRecipe.name}
                                    onChange={(e) => setNewRecipe({ ...newRecipe, name: e.target.value })}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block mb-1 font-medium">Ingredients</label>
                                <textarea
                                    value={newRecipe.ingredients}
                                    onChange={(e) => setNewRecipe({ ...newRecipe, ingredients: e.target.value })}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                ></textarea>
                            </div>

                            <div className="mb-4">
                                <label className="block mb-1 font-medium">Notes (Optional)</label>
                                <textarea
                                    value={newRecipe.notes}
                                    onChange={(e) => setNewRecipe({ ...newRecipe, notes: e.target.value })}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-black text-white py-2 rounded-full hover:bg-black transition"
                            >
                                Add Recipe
                            </button>
                        </form>
                    </div>
                </div>
            </div>
    </>

};

export default ProfilePage;