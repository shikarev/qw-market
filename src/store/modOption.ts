import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import type { RootState } from './'

// Define a type for the slice state
interface IModOptions {
    modOptions: string | null;
}

// Define the initial state using that type
const initialState: IModOptions = {
    modOptions: null
}

export const modOptionsSlice = createSlice({
    name: 'modOptions',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setModOptionsFromUrl: (state, action: PayloadAction<string | null>) => {
            state.modOptions = action.payload?.split('&').map((x: string) => x.slice(x.indexOf('=')+1)).join('|') ?? null;
        },
        setModOptions: (state, action: PayloadAction<string | null>) => {
            state.modOptions = action.payload;
        },
    },
})

export const { setModOptionsFromUrl, setModOptions } = modOptionsSlice.actions;
// Other code such as selectors can use the imported `RootState` type
export const getModOptions = (state: RootState) => state.modOptions.modOptions;

export default modOptionsSlice.reducer
