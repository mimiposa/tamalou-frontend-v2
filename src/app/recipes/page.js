'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const Recipes = () => {
    const [recipes, setRecipes] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const token = Cookies.get('token');
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/recipes/recipes`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setRecipes(response.data);
            } catch (err) {
                setError(err.response?.data?.error || 'Failed to fetch recipes.');
            }
        };

        fetchRecipes();
    }, []);

    const handleDelete = async (id) => {
        try {
            const token = Cookies.get('token');
            await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/recipes/delete/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setRecipes(recipes.filter((recipe) => recipe.id !== id));
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to delete recipe.');
        }
    };

    return (
        <div>
            <h1>Your Recipes</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ul>
                {recipes.map((recipe) => (
                    <li key={recipe.id}>
                        <h2>{recipe.title}</h2>
                        <p>{recipe.ingredients}</p>
                        <button onClick={() => handleDelete(recipe.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Recipes;
