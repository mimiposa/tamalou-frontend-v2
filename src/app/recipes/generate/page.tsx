'use client';

import { useEffect, useState, FormEvent } from 'react';
import { useSelector } from 'react-redux';

import axios from 'axios';
import Cookies from 'js-cookie';
import Image from 'next/image';
import DOMPurify from 'dompurify';
import logo from '../../../../public/assets/tamalou-logo.png';
import {RootState} from "../../../redux/store";
import Homepage from "../../../components/homepage";

// Define types for recipe and user
interface Recipe {
    name: string;
    ingredients: string[];
    instructions: string[];
    warningmessage?: string;
}

const CreateRecipe: React.FC = () => {
    const [symptoms, setSymptoms] = useState('');
    const [recipe, setRecipe] = useState<Recipe | null>(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const { user } = useSelector((state: RootState) => state.auth); // Redux for user state
    const { isClear } = useSelector((state: RootState) => state.recipe); // Redux for recipe state


    useEffect(() => {
        setRecipe(null);
    }, [isClear]);

    const token = Cookies.get('token');

    const handleGenerateRecipe = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setRecipe(null);

        const token = Cookies.get('token');

        if (!user || !token) {
            setError('You must be logged in to generate a recipe.');
            Cookies.remove('token');
            return;
        }

        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/api/recipes/generate`,
                { symptoms },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setRecipe(response.data);
            setSuccess('Recipe generated successfully!');
        } catch (err: any) {
            console.error('Error generating recipe:', err);
            const errorMessage =
                err.response?.status === 404
                    ? err.response.data.error
                    : 'Failed to generate recipe. Please try again.';
            setError(errorMessage);
        }
    };

    const handleGenerateRecipeOnClick = async (symptoms: string) => {
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
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setRecipe(response.data);
            setSuccess('Recipe generated successfully!');
        } catch (err: any) {
            console.error('Error generating recipe:', err);
            const errorMessage =
                err.response?.status === 404
                    ? err.response.data.error
                    : 'Failed to generate recipe. Please try again.';
            setError(errorMessage);
        }
    };

    const handleSaveRecipe = async () => {
        if (!recipe) {
            setError('No recipe to save.');
            return;
        }

        const token = Cookies.get('token');


        try {
            await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/api/recipes/save`,
                recipe,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setSuccess('Recipe saved successfully!');
        } catch (err) {
            console.error('Error saving recipe:', err);
            setError('Failed to save the recipe. Please try again.');
        }
    };

    return (
        <div className="flex flex-col items-center md:overflow-y-hidden justify-end min-h-dvh">
            {user ? (
                <main className="h-dvh flex-1 md:p-6 md:overflow-y-hidden flex flex-col items-center justify-between">
                    {recipe ? (
                        <div className="w-full max-w-3xl md:p-6 bg-white rounded-lg mb-4 flex flex-grow flex-col items-start justify-center">
                            {/* Generated Recipe Section */}
                            <h2 className="text-xl font-semibold mb-2 capitalize">{recipe.name}</h2>
                            <p className="mb-2">
                                <strong>Ingredients:</strong>
                            </p>
                            <ul className="list-disc list-inside mb-4">
                                {recipe.ingredients.map((ingredient, index) => (
                                    <li key={index}>{ingredient}</li>
                                ))}
                            </ul>
                            <p className="mb-2">
                                <strong>Instructions:</strong>
                            </p>
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
                    ) : (
                        <div className="w-full text-center flex flex-grow flex-col items-center justify-center">
                            {/* Suggestions Section */}
                            <div className="mb-6">
                                <Image src={logo} alt="Logo" className="w-16 h-16 mx-auto" />
                            </div>

                            <div className="mt-6 max-w-3xl w-full grid grid-cols-2 gap-4">
                                <button
                                    onClick={() => handleGenerateRecipeOnClick("J'ai mal à la tête")}
                                    className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 hover:shadow-md transition"
                                >
                                    <p className="text-sm font-medium text-gray-800">
                                        J&rsquo;ai mal à la tête
                                    </p>
                                </button>
                                <button
                                    onClick={() => handleGenerateRecipeOnClick("Je fais de l'eczéma")}
                                    className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 hover:shadow-md transition"
                                >
                                    <p className="text-sm font-medium text-gray-800">
                                        Je fais de l&rsquo;eczéma
                                    </p>
                                </button>
                                <button
                                    onClick={() => handleGenerateRecipeOnClick("je souffre d'arthrose")}
                                    className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 hover:shadow-md transition"
                                >
                                    <p className="text-sm font-medium text-gray-800">
                                        je souffre d&rsquo;arthrose
                                    </p>
                                </button>
                                <button
                                    onClick={() => handleGenerateRecipeOnClick("J'ai des boutons d'acné")}
                                    className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 hover:shadow-md transition"
                                >
                                    <p className="text-sm font-medium text-gray-800">
                                        J&rsquo;ai des boutons d&rsquo;acné
                                    </p>
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Search Form Section */}
                    <div className="w-full max-w-3xl rounded-lg sticky mb-8 border-gray-50">
                        <form onSubmit={handleGenerateRecipe} className="flex items-center bg-gray-200 rounded-full shadow-md">
                            <input
                                type="text"
                                placeholder="Enter symptoms or preferences"
                                value={symptoms}
                                onChange={(e) => setSymptoms(DOMPurify.sanitize(e.target.value))}
                                className="flex-grow p-3 border-none rounded-full focus:outline-none bg-transparent"
                                required
                            />
                            <button type="submit" className="flex-shrink-0 bg-transparent text-black px-4 py-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 text-gray-600 rounded-full hover:bg-gray-200 transition duration-200"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <circle cx="12" cy="12" r="10" stroke="gray" strokeWidth="1.5" fill="bg-gray-200" />
                                    <path
                                        d="M10 8l4 4-4 4"
                                        stroke="gray"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </button>
                        </form>
                        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
                    </div>
                </main>
            ) : (
                <Homepage />
            )}
        </div>
    );
};

export default CreateRecipe;
