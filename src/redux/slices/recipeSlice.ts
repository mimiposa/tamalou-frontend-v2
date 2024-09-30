import { createSlice } from '@reduxjs/toolkit';

interface RecipeState {
    isClear: boolean;
}

const initialState: RecipeState = {
    isClear: false,
};

const recipeSlice = createSlice({
    name: 'recipe',
    initialState,
    reducers: {
        clearRecipe: (state) => {
            state.isClear = true;
        },
        resetClearRecipe: (state) => {
            state.isClear = false;
        },
    },
});

export const { clearRecipe, resetClearRecipe } = recipeSlice.actions;
export default recipeSlice.reducer;
