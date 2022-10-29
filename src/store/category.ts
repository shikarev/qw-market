import { createSlice } from '@reduxjs/toolkit'
import SecureLS from 'secure-ls';
import type { RootState } from './'

const ls = new SecureLS({encodingType: ''});
// Define a type for the slice state
interface CategoryState {
  watchCount: number
}

// Define the initial state using that type
const initialState: CategoryState = {
  watchCount: parseInt(ls.get('pvc') || '0'), //Product View Count
}

export const categorySlice = createSlice({
  name: 'category',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    increment: (state) => {
      state.watchCount += 1;
      ls.set('pvc', state.watchCount.toString()); //Product View Count
    },
  },
})

export const { increment } = categorySlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectViewCount = (state: RootState) => state.category.watchCount

export default categorySlice.reducer
