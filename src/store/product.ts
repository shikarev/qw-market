import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "./";
import { IProductData } from "../types/Product";
//import {IStory} from "../api/product";

// Define a type for the slice state
interface ProductState {
  product: IProductData;
  productReviews?: any;
  productPrices?: any;
}

// Define the initial state using that type
const initialState: ProductState = {
  product: undefined,
  productReviews: {
    total: 0,
    pageCount: undefined,
  },
  productPrices: {
    total: 0,
  },
};

export const productSlice = createSlice({
  name: "productState",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setProduct: (state, action) => {
      state.product = action.payload;
    },
    setProductReviews: (state, action) => {
      state.productReviews = {
        total: action.payload.total,
        pageCount: action.payload.pageCount,
      };
    },
    setProductPrices: (state, action) => {
      state.productPrices = {
        total: action.payload.total,
      };
    },
  },
});

export const { setProduct, setProductReviews, setProductPrices } =
  productSlice.actions;
// Other code such as selectors can use the imported `RootState` type
export const getProductCard = (state: RootState) => state.productState;

export default productSlice.reducer;
