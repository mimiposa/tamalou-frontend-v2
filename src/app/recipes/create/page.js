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

        console.log('user', user)

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
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold mb-6 text-center">Create a New Recipe</h1>
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

                {recipe && (
                    <div className="mt-6">
                        <h2 className="text-xl font-semibold">Generated Recipe</h2>
                        <p className="mt-2"><strong>Title:</strong> {recipe.name}</p>
                        <p><strong>Ingredients:</strong> {recipe.ingredients.join(', ')}</p>
                        <p><strong>Instructions:</strong> {recipe.instructions}</p>
                        <button
                            onClick={handleSaveRecipe}
                            className="mt-4 w-full bg-green-500 text-white py-2 rounded-lg shadow-md hover:bg-green-600 transition duration-200"
                        >
                            Save Recipe
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CreateRecipe;
