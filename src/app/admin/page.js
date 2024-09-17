'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import NavLinks from "@/components/NavLinks";
import {useAuth} from "@/context/AuthContext";
import {useRouter} from "next/navigation";
import Cookies from "js-cookie";

const AdminPanel = () => {
    const [recipes, setRecipes] = useState([]);
    const [newRecipe, setNewRecipe] = useState({
        category: '',
        name: '',
        keywords: '',
        ingredients: '',
        instructions: '',
        warningMessage: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const { user, loading } = useAuth();
    const router = useRouter();


    const fetchRecipes = async () => {
        try {
            const token = Cookies.get('token');
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/recipes`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setRecipes(response.data);
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to fetch recipes.');
        }
    };

    useEffect(() => {
        fetchRecipes();
    }, []);

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login'); // Redirect to login if not logged in
        }
    }, [user, loading, router]);

    if (loading) {
        return <p>Loading...</p>; // Show a loading message while checking auth state
    }



    const handleInputChange = (e) => {
        setNewRecipe({ ...newRecipe, [e.target.name]: e.target.value });
    };

    const handleAddRecipe = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/recipes/add`, newRecipe);
            setSuccess('Recipe added successfully!');
            fetchRecipes(); // Refresh the list after adding a new recipe
        } catch (err) {
            setError('Failed to add recipe');
        }
    };

    return user && user.role === "admin" ? (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>

            <form onSubmit={handleAddRecipe} className="bg-white p-6 rounded-lg shadow-lg mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                {/* Form fields for recipe details */}
                <div className="flex flex-col mb-4">
                    <label className="text-sm font-semibold mb-2">Category</label>
                    <input
                        type="text"
                        name="category"
                        placeholder="Category"
                        onChange={handleInputChange}
                        required
                        className="p-2 border border-gray-300 rounded-md"
                    />
                </div>

                <div className="flex flex-col mb-4">
                    <label className="text-sm font-semibold mb-2">Name</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        onChange={handleInputChange}
                        required
                        className="p-2 border border-gray-300 rounded-md"
                    />
                </div>

                <div className="flex flex-col mb-4">
                    <label className="text-sm font-semibold mb-2">Keywords (comma-separated)</label>
                    <textarea
                        name="keywords"
                        placeholder="Keywords (comma-separated)"
                        onChange={handleInputChange}
                        required
                        className="p-2 border border-gray-300 rounded-md"
                    ></textarea>
                </div>

                <div className="flex flex-col mb-4">
                    <label className="text-sm font-semibold mb-2">Ingredients (comma-separated)</label>
                    <textarea
                        name="ingredients"
                        placeholder="Ingredients (comma-separated)"
                        onChange={handleInputChange}
                        required
                        className="p-2 border border-gray-300 rounded-md"
                    ></textarea>
                </div>

                <div className="flex flex-col mb-4">
                    <label className="text-sm font-semibold mb-2">Instructions (comma-separated)</label>
                    <textarea
                        name="instructions"
                        placeholder="Instructions (comma-separated)"
                        onChange={handleInputChange}
                        required
                        className="p-2 border border-gray-300 rounded-md"
                    ></textarea>
                </div>

                <div className="flex flex-col mb-4">
                    <label className="text-sm font-semibold mb-2">Warning Message</label>
                    <input
                        type="text"
                        name="warningMessage"
                        placeholder="Warning Message"
                        onChange={handleInputChange}
                        className="p-2 border border-gray-300 rounded-md"
                    />
                </div>

                <div className="md:col-span-2">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200 w-full"
                    >
                        Add Recipe
                    </button>
                </div>
            </form>

            {error && <p className="text-red-500 mb-4">{error}</p>}
            {success && <p className="text-green-500 mb-4">{success}</p>}

            <h2 className="text-xl font-bold mb-4">Existing Recipes</h2>
            <ul className="bg-white p-4 rounded-lg shadow-lg">
                {recipes.map((recipe) => (
                    <li key={recipe.id} className="border-b py-2">
                        <strong>{recipe.name}</strong> - {recipe.category}
                    </li>
                ))}
            </ul>
        </div>
    ) : <div>You dont have sufficient rights to view this page !</div>;
};

export default AdminPanel;
