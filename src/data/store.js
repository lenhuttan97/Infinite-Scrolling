import { configureStore } from "@reduxjs/toolkit";
import  useProductSearch from "./sliceProduct";
import useCategories from "./sliceCategories";


export const store = configureStore({
    reducer: {
        products: useProductSearch,
        categories: useCategories,
    }
})