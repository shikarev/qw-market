import { createSlice } from '@reduxjs/toolkit'
import { userAPI } from '../api/user';
import type { RootState } from './'

// Define a type for the slice state
interface AuthState {
  tokens: {
    access?: string;
    refresh?: string;
  }
  isAuth: boolean;
  isAuthChecking: boolean;
}

// Define the initial state using that type
const initialState: AuthState = {
  tokens: {
    access: undefined,
    refresh: undefined
  },
  isAuth: false,
  isAuthChecking: true
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setTokens: (state, action) => {
      state.tokens = action.payload;
    },
    setAuthChecking: (state, action) => {
      state.isAuthChecking = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addMatcher(
      userAPI.endpoints.getUserActivity.matchFulfilled,
      (state, payload) => {
        state.isAuth = true;
      }
    )
      .addMatcher(
        userAPI.endpoints.getUserActivity.matchRejected,
        (state, payload) => {
          state.isAuth = false;
        }
      )
  }
})

export const { setTokens, setAuthChecking } = authSlice.actions
// Other code such as selectors can use the imported `RootState` type
export const getTokens = (state: RootState) => state.auth.tokens;
export const getIsAuth = (state: RootState) => state.auth.isAuth;
export const getAuthChecking = (state: RootState) => state.auth.isAuthChecking;

export default authSlice.reducer
