'use client';

import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useTranslation } from 'react-i18next';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {checkUserSession, logout} from "../../redux/slices/authSlice";

interface Recipe {
    id: string;
    category: string;
    name: string;
    keywords: string[];
    ingredients: string[];
    instructions: string[];
    warningMessage: string;
}

interface NewRecipe {
    category: string;
    name: string;
    keywords: string;
    ingredients: string;
    instructions: string;
    warningMessage: string;
}

const AdminPanel: React.FC = () => {
    const dispatch = useDispatch(); // Initialize dispatch for Redux actions
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [newRecipe, setNewRecipe] = useState<NewRecipe>({
        category: '',
        name: '',
        keywords: '',
        ingredients: '',
        instructions: '',
        warningMessage: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const { user, retrievedUser, loading } = useSelector((state: RootState) => state.auth); // Redux for user state

    const router = useRouter();
    const { t } = useTranslation();
    const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
    const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);

    const [clientReady, setClientReady] = useState(false);

    const fetchRecipes = async () => {
        try {
            const token = Cookies.get('token');
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/recipes`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setRecipes(response.data);
        } catch (err: any) {
            setError(err.response?.data?.error || 'Failed to fetch recipes.');
        }
    };

    useEffect(() => {
        checkUserSession()
    }, []);

    useEffect(() => {
        fetchRecipes();
        setClientReady(true); // Ensures client-side rendering
    }, []);



    if (loading) {
        return <p>Loading...</p>;
    }

    if (!clientReady) return null; // Avoid mismatches between server and client


    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setNewRecipe({ ...newRecipe, [e.target.name]: e.target.value });
    };

    const handleAddOrUpdateRecipe = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const token = Cookies.get('token');
            if (editingRecipe) {
                await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/recipes/${editingRecipe.id}`, newRecipe, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setSuccess('Recipe updated successfully!');
            } else {
                await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/recipes/add`, newRecipe, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setSuccess('Recipe added successfully!');
            }
            fetchRecipes();
            setNewRecipe({
                category: '',
                name: '',
                keywords: '',
                ingredients: '',
                instructions: '',
                warningMessage: '',
            });
            setEditingRecipe(null);
        } catch (err) {
            setError(editingRecipe ? 'Failed to update recipe' : 'Failed to add recipe');
        }
    };

    const handleEditRecipe = (recipe: Recipe) => {
        setNewRecipe({
            category: recipe.category,
            name: recipe.name,
            keywords: recipe.keywords.join(', '),
            ingredients: recipe.ingredients.join(', '),
            instructions: recipe.instructions.join(', '),
            warningMessage: recipe.warningMessage,
        });
        setEditingRecipe(recipe);
    };

    const handleDeleteRecipe = async (id: string) => {
        setError('');
        setSuccess('');
        try {
            const token = Cookies.get('token');
            await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/recipes/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setSuccess('Recipe deleted successfully!');
            fetchRecipes();
        } catch (err) {
            setError('Failed to delete recipe');
        }
    };

    const groupedRecipes = recipes.reduce<Record<string, Recipe[]>>((acc, recipe) => {
        if (!acc[recipe.category]) {
            acc[recipe.category] = [];
        }
        acc[recipe.category].push(recipe);
        return acc;
    }, {});

    const toggleCategory = (category: string) => {
        setExpandedCategories((prev) => ({
            ...prev,
            [category]: !prev[category],
        }));
    };

    return user && user.data?.role === "admin" ?
        <div className="container mx-auto p-10">
            <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>

            <form onSubmit={handleAddOrUpdateRecipe} className="bg-white p-6 rounded-lg shadow-lg mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="flex flex-col mb-4">
                    <label className="text-sm font-semibold mb-2">{t('category')}</label>
                    <input
                        type="text"
                        name="category"
                        value={newRecipe.category}
                        placeholder="Category"
                        onChange={handleInputChange}
                        required
                        className="p-2 border border-gray-300 rounded-md"
                    />
                </div>

                <div className="flex flex-col mb-4">
                    <label className="text-sm font-semibold mb-2">{t('name')}</label>
                    <input
                        type="text"
                        name="name"
                        value={newRecipe.name}
                        placeholder="Name"
                        onChange={handleInputChange}
                        required
                        className="p-2 border border-gray-300 rounded-md"
                    />
                </div>

                <div className="flex flex-col mb-4">
                    <label className="text-sm font-semibold mb-2">{t('keywords')}</label>
                    <textarea
                        name="keywords"
                        value={newRecipe.keywords}
                        placeholder="Keywords (comma-separated)"
                        onChange={handleInputChange}
                        required
                        className="p-2 border border-gray-300 rounded-md"
                    ></textarea>
                </div>

                <div className="flex flex-col mb-4">
                    <label className="text-sm font-semibold mb-2">{t('ingredients')}</label>
                    <textarea
                        name="ingredients"
                        value={newRecipe.ingredients}
                        placeholder="Ingredients (comma-separated)"
                        onChange={handleInputChange}
                        required
                        className="p-2 border border-gray-300 rounded-md"
                    ></textarea>
                </div>

                <div className="flex flex-col mb-4">
                    <label className="text-sm font-semibold mb-2">{t('instructions')}</label>
                    <textarea
                        name="instructions"
                        value={newRecipe.instructions}
                        placeholder="Instructions (comma-separated)"
                        onChange={handleInputChange}
                        required
                        className="p-2 border border-gray-300 rounded-md"
                    ></textarea>
                </div>

                <div className="flex flex-col mb-4">
                    <label className="text-sm font-semibold mb-2">{t('warningmessage')}</label>
                    <input
                        type="text"
                        name="warningMessage"
                        value={newRecipe.warningMessage}
                        placeholder="Warning Message"
                        onChange={handleInputChange}
                        className="p-2 border border-gray-300 rounded-md"
                    />
                </div>

                <div className="md:col-span-2">
                    <button type="submit" className="bg-black text-white px-6 py-2 rounded-full shadow-md hover:bg-opacity-95 transition duration-200 w-full">
                        {editingRecipe ? t('Update Recipe') : t('Add Recipe')}
                    </button>
                </div>
            </form>

            {error && <p className="text-red-500 mb-4">{error}</p>}
            {success && <p className="text-green-500 mb-4">{success}</p>}

            <h2 className="text-xl font-bold mb-4">Existing Recipes</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {Object.keys(groupedRecipes).map((category) => (
                    <div key={category} className="bg-gray-100 p-4 rounded-lg shadow-lg border hover:border-gray-800 transition duration-200 cursor-pointer" onClick={() => toggleCategory(category)}>
                        <button className="text-lg font-semibold mb-2 text-gray-800 w-full text-left">
                            {t(category)}
                        </button>
                        {expandedCategories[category] && (
                            <ul className="mt-2">
                                {groupedRecipes[category].map((recipe) => (
                                    <li key={recipe.id} className="border-b py-2 flex justify-between">
                                        <strong>{recipe.name}</strong>
                                        <div className="flex justify-between">
                                            <button className="text-sm text-blue-500 hover:underline mr-2" onClick={() => handleEditRecipe(recipe)}>
                                                {t('Edit')}
                                            </button>
                                            <button onClick={() => handleDeleteRecipe(recipe.id)} className="text-red-500 hover:text-red-700 text-sm font-semibold">
                                                Delete
                                            </button>
                                        </div>
                                    </li>
                                    ))}
                            </ul>
                        )}
                    </div>
                ))}
            </div>
        </div>
     : <div>{t('You don’t have sufficient rights to view this page!')}</div>
};

export default AdminPanel;
