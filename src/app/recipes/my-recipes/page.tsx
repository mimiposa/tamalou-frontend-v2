'use client';

import { useState, useEffect, FormEvent } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import {checkUserSession, logout} from "../../../redux/slices/authSlice";
import {useDispatch} from "react-redux";

// Define types for recipe and user profile
interface Recipe {
    id: number;
    name: string;
    ingredients: string;
    notes?: string;
}

interface UserProfile {
    name?: string;
    email: string;
    recipes?: Recipe[];
}

const ProfilePage: React.FC = () => {
    const dispatch = useDispatch(); // Initialize dispatch for Redux actions
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [last5Recipes, setLast5Recipes] = useState<Recipe[]>([]);
    const [newRecipe, setNewRecipe] = useState<Recipe>({ id: 0, name: '', ingredients: '', notes: '' });

    useEffect(() => {
        // @ts-ignore
        dispatch(checkUserSession())
    }, []);

    useEffect(() => {
        fetchData();
    }, [dispatch]);

    const fetchData = async () => {
        const token = Cookies.get('token');
        if (token) {
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/users/profile`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                const { data } = response;
                setUserProfile(data.user);
                setLast5Recipes(data.recipes || []);
            } catch (error) {
                console.error('Error fetching profile data:', error);
            }
        }
    };

    // Handle Add Recipe
    const handleAddRecipe = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Logic for adding recipe (assuming you have an API endpoint for this)
    };

    return userProfile ? (
        <div className="flex items-center justify-center p-10">
            <div className="w-full max-w-md bg-white rounded-lg p-6">
                {/* Recently Generated Recipes */}
                <div className="mb-6">
                    <h3 className="text-xl font-semibold">Recently Generated Recipes</h3>
                    <ul className="list-disc list-inside mt-4">
                        {last5Recipes && last5Recipes.length > 0 ? (
                            last5Recipes.map((recipe) => (
                                <li key={recipe.id} className="mb-2">
                                    {recipe.name}
                                </li>
                            ))
                        ) : (
                            <p>No recent recipes</p>
                        )}
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
    ) : null;
};

export default ProfilePage;
