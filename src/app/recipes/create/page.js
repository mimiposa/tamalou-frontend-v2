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
        <div className="flex flex-col items-center justify-end min-h-screen-layout bg-gray-100 p-6">
            {/* Generated Recipe Section */}
            {recipe && (
                <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg mb-4">
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
                        className="mt-4 w-full bg-green-500 text-white py-2 rounded-lg shadow-md hover:bg-green-600 transition duration-200"
                    >
                        Save Recipe
                    </button>
                </div>
            )}

            {/* Form Section - Sticks at the Bottom */}
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg sticky bottom-0">
                <h1 className="text-2xl font-bold mb-4 text-center">Create a New Recipe</h1>
                <form onSubmit={handleGenerateRecipe} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Enter symptoms or preferences"
                        value={symptoms}
                        onChange={(e) => setSymptoms(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
                    >
                        Generate Recipe
                    </button>
                </form>
                {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
                {success && <p className="mt-4 text-green-500 text-center">{success}</p>}
            </div>
        </div>
    );
};

export default CreateRecipe;
