'use client';


// context/RecipeContext.js
import React, { createContext, useState } from 'react';

export const RecipeContext = createContext();

export const RecipeProvider = ({ children }) => {
    const [isClear, setIsClear] = useState(false);

    const clearRecipe = () => {
        setIsClear(true); // Set the recipe state to clear
    };

    const resetClearRecipe = () => {
        setIsClear(false); // Reset the state
    };

    return (
        <RecipeContext.Provider value={{ isClear, clearRecipe, resetClearRecipe }}>
            {children}
        </RecipeContext.Provider>
    );
};
