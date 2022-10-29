import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import type { RootState } from './'
import {ICreateFeedback} from "../types/Reviews";

// Define a type for the slice state
interface IProductFeedbackState {
  productFeedback: ICreateFeedback
}

const initialValues = {
  rate: 0,
  experience: '',
  advantage: '',
  disadvantage: '',
  note: '',
  product: '',
  vendor: '',
  anonymous: false,
}

// Define the initial state using that type
const initialState: IProductFeedbackState = {
  productFeedback: initialValues
}

export const productFeedbackSlice = createSlice({
  name: 'productFeedback',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setProductFeedback: (state, action:PayloadAction<ICreateFeedback>) => {
      state.productFeedback = action.payload;
    },
    clearProductFeedback: (state) => {
      state.productFeedback = initialValues;
    },
  },
})

export const { setProductFeedback,clearProductFeedback } = productFeedbackSlice.actions;
// Other code such as selectors can use the imported `RootState` type
export const getProductFeedback = (state: RootState) => state.productFeedback.productFeedback;

export default productFeedbackSlice.reducer
