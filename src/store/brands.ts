import {createSlice} from '@reduxjs/toolkit'
import type {RootState} from './'
import {IPromotion} from "../types/Promotion";
import {searchApi} from "../api/search";

// Define a type for the slice state
interface BrandsState {
    brands: IPromotion[];
    loading?: boolean;
}

// Define the initial state using that type
const initialState: BrandsState = {
    brands: [],
    loading: false
}

export const brandsSlice = createSlice({
    name: 'brands',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setBrands: (state, action) => {
            state.brands = [...state.brands, ...action.payload];
        },
        clearBrands: (state) => {
            state.brands = [];
        },
        setBrandsLoading: (state, action) => {
            state.loading = action.payload;
        },
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addMatcher(
            searchApi.endpoints.searchManufacturers.matchPending,
            (state, payload) => {
                state.loading = true;
            }
        )
            .addMatcher(
                searchApi.endpoints.searchManufacturers.matchFulfilled,
                (state, payload) => {
                    state.loading = false;
                }
            )
    }
})

export const {setBrands, clearBrands, setBrandsLoading} = brandsSlice.actions
// Other code such as selectors can use the imported `RootState` type
export const getBrands = (state: RootState) => state.brands.brands;
export const getBrandsLoading = (state: RootState) => state.brands.loading;

export default brandsSlice.reducer
