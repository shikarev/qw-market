import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import type {RootState} from './'
import {productAPI} from "../api/product";

// Define a type for the slice state
interface CategoriesState {
    totalProducts: number;
}

// Define the initial state using that type
const initialState: CategoriesState = {
    totalProducts: 0
}

export const categoriesSlice = createSlice({
    name: 'categories_list',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addMatcher(
            productAPI.endpoints.getProducts.matchPending,
            (state) => {
                state.totalProducts = 0;
            })
            .addMatcher(
                productAPI.endpoints.getProducts.matchFulfilled,
                (state, data: PayloadAction<{total: number}>) => {
                    state.totalProducts = data.payload.total;
                })
    }
})

export const getTotalProductsCount = (state: RootState) => state.categories_list.totalProducts;

export default categoriesSlice.reducer