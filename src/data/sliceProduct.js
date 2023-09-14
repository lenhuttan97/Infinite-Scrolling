import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProductCategory, getProductSearch } from "./getAPI";


const initialState = {
    loading : '',
    search: '',
    hasMore: '',
    products: [],
    category: '',
    error: ''
}

var search = '';
var category = false;

export const loadProducts = createAsyncThunk(
    'product/search',
    async (props) => {
        let limit = props && props.limit ? props.limit : 20;
        let skip =  props && props.limit ? props.skip : 0;
        let q =  props ? props.q : '';
        search = q;
        let products;
        if( props.category ){
            let categorySearch = props.category;
            category = true;
             products = await getProductCategory({category: categorySearch})
          
        } else {
             products = await getProductSearch({limit, skip, q })
        }

       
        return products.data;
    }
) 

const useProductSearch = createSlice({
    name : 'categories',
    initialState,
    extraReducers: (builder) => {
        builder
        .addCase(loadProducts.pending, (state, action) => {
            state.loading = true;
            state.products = action.payload;
        })
            .addCase(loadProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.search = search;
                let datas = action.payload.products;

                let total = action.payload.total;

                if (datas.length === total){
                    state.hasMore = false
                } else {
                    state.hasMore = true
                }
                
                if(category) {state.category = true} else {state.category = false}

                state.products = datas;

            })
            .addCase(loadProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            })
    }
})

export default useProductSearch.reducer;