import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from './'
import {IPromotion} from "../types/Promotion";

// Define a type for the slice state
interface ActionsState {
  promotions: IPromotion[];
}

// Define the initial state using that type
const initialState: ActionsState = {
  promotions: []
}

export const promotionSlice = createSlice({
  name: 'promotions',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setPromotions: (state, action) => {
      state.promotions = [...state.promotions, ...action.payload];
    },
    clearPromotions: (state) => {
      state.promotions = [];
    },
  },
})

export const { setPromotions,clearPromotions } = promotionSlice.actions;
export const promotions = (state: RootState) => state.promotions.promotions;

export default promotionSlice.reducer
