import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from './'
import {IStory} from "../api/stories";

// Define a type for the slice state
interface StoriesState {
  stories: IStory[];
}

// Define the initial state using that type
const initialState: StoriesState = {
  stories: []
}

export const storiesSlice = createSlice({
  name: 'storiesState',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setStories: (state, action) => {
      state.stories = [...state.stories, ...action.payload];
    },
    clearStories: (state) => {
      state.stories = [];
    },
  },
})

export const { setStories,clearStories } = storiesSlice.actions;
// Other code such as selectors can use the imported `RootState` type
export const getStories = (state: RootState) => state.storiesState.stories;

export default storiesSlice.reducer
