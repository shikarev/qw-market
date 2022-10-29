import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {wishlistsAPI} from "../api/wishlists";
import {RootState} from "./index";
import {favoritesAPI} from "../api/favorites";

// Define a type for the slice state
interface WishlistState {
    showPopup: boolean;
    text: {
        type: 'wish' | 'favorite' | null;
        productId?: string;
    };
}

// Define the initial state using that type
const initialState: WishlistState = {
    showPopup: false,
    text: {type: null, productId: undefined}
}

// First, create the thunk
export const deleteWish = createAsyncThunk<any, any, { state: RootState }>(
    'wishesThunk/delete',
    async (data, { dispatch, getState }) => {
        dispatch(setState({type: 'wish', productId: data.productId}));
        const response = await dispatch(wishlistsAPI.endpoints.deleteWish.initiate(data.wishId))
        if ('data' in response) {
            return response.data
        }
    }
)

export const deleteFavorite = createAsyncThunk<any, any, { state: RootState }>(
    'favoritesThunk/delete',
    async (data, { dispatch, getState }) => {
        dispatch(setState({type: 'favorite', productId: data.productId}));
        const response = await dispatch(favoritesAPI.endpoints.deleteFavorite.initiate(data.favoriteId))
        if ('data' in response) {
            return response.data
        }
    }
)



export const wishlistSlice = createSlice({
    name: 'wishlist',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        closePopup: (state) => {
            state.showPopup = false;
        },
        setState: (state, action) => {
            state.text = action.payload;
        }
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addMatcher(
            wishlistsAPI.endpoints.deleteWish.matchPending,
            (state, payload) => {
                state.showPopup = false;
            }
        )
            .addMatcher(
            favoritesAPI.endpoints.deleteFavorite.matchPending,
            (state, payload) => {
                state.showPopup = false;
            }
        )
            .addMatcher(
                wishlistsAPI.endpoints.deleteWish.matchFulfilled,
                (state, {payload}) => {
                    state.showPopup = true
                }
            )
            .addMatcher(
                favoritesAPI.endpoints.deleteFavorite.matchFulfilled,
                (state, {payload}) => {
                    state.showPopup = true
                }
            )
    },
})

// Other code such as selectors can use the imported `RootState` type
export const { closePopup, setState } = wishlistSlice.actions;
export const getWishAdding = (state: RootState) => state.wishlist.showPopup;
export const getWishPayload = (state: RootState) => state.wishlist.text;

export default wishlistSlice.reducer
