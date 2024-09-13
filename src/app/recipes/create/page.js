'use client';

import { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import axios from 'axios';
import Cookies from "js-cookie";

const CreateRecipe = () => {
    const [symptoms, setSymptoms] = useState('');
    const [recipe, setRecipe] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const { user } = useAuth();

    const handleGenerateRecipe = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setRecipe(null);

        const token = Cookies.get('token');

        if (!user || !token) {
            setError('You must be logged in to generate a recipe.');
            return;
        }

        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/api/recipes/generate`,
                { symptoms },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setRecipe(response.data);
            setSuccess('Recipe generated successfully!');
        } catch (err) {
            console.error('Error generating recipe:', err);
            const errorMessage = err.status === 404 ? err.response.data.error : 'Failed to generate recipe. Please try again.';
            setError(errorMessage);
        }
    };

    const handleSaveRecipe = async () => {
        if (!recipe) {
            setError('No recipe to save.');
            return;
        }

        try {
            await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/api/recipes/save`,
                recipe,
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`
                    }
                }
            );

            setSuccess('Recipe saved successfully!');
        } catch (err) {
            console.error('Error saving recipe:', err);
            setError('Failed to save the recipe. Please try again.');
        }
    };

    return (
        <div className="flex flex-col items-center justify-end min-h-screen-layout">
            {/* Generated Recipe Section */}
            {recipe && (
                <div className="w-full max-w-3xl p-6 bg-white rounded-lg shadow-lg mb-4">
                    <h2 className="text-xl font-semibold mb-2">{recipe.name}</h2>
                    <p className="mb-2"><strong>Ingredients:</strong></p>
                    <ul className="list-disc list-inside mb-4">
                        {recipe.ingredients.map((ingredient, index) => (
                            <li key={index}>{ingredient}</li>
                        ))}
                    </ul>
                    <p className="mb-2"><strong>Instructions:</strong></p>
                    <div className="mb-4">
                        {recipe.instructions.map((instruction, index) => (
                            <p key={index}>{instruction}</p>
                        ))}
                    </div>
                    <div className="mt-1 text-red-500">{recipe.warningmessage}</div>
                    <button
                        onClick={handleSaveRecipe}
                        className="mt-4 w-full bg-black text-white px-6 py-2 rounded-full shadow-md hover:bg-opacity-95 transition duration-200"
                    >
                        Save Recipe
                    </button>
                </div>
            )}

            {/* Form Section - Sticks at the Bottom */}
            <div className="w-full max-w-3xl rounded-lg sticky bottom-0">
                <form onSubmit={handleGenerateRecipe} className="flex items-center bg-gray-200 rounded-full shadow-md">
                    <input
                        type="text"
                        placeholder="Enter symptoms or preferences"
                        value={symptoms}
                        onChange={(e) => setSymptoms(e.target.value)}
                        className="flex-grow p-3 border-none rounded-full focus:outline-none bg-transparent"
                        required
                    />
                    <button
                        type="submit"
                        className="flex-shrink-0 bg-transparent text-black px-4 py-2 "
                    >
                        {/* Right-pointing arrow icon similar to the provided design */}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600 rounded-full hover:bg-gray-200 transition duration-200" fill="none"
                             viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" stroke="gray" strokeWidth="1.5" fill="bg-gray-200"/>
                            <path d="M10 8l4 4-4 4" stroke="gray" strokeWidth="2" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                        </svg>
                    </button>
                </form>
                {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
            </div>


        </div>
    );
};

export default CreateRecipe;
