import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCatelogry } from "./getAPI";



const initialState = {
    loading: '',
    error: '',
    categories:[]
}

export const loadCategories = createAsyncThunk(
    'search',
    async () =>{
            let fetch = await getCatelogry();
            let data = fetch.data;
            return data;
    }
)

export const categories = createSlice({
    name: 'search',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(loadCategories.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loadCategories.fulfilled, (state, action) => {
                state.categories=action.payload
            })
            .addCase(loadCategories.rejected, (state, action) =>{
                state.status = 'error';
                state.error = action.error;
            })
    }
})

export default categories.reducer;