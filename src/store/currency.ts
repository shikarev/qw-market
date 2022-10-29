import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./index";

interface Currency {
    code: string;
    name: string;
    shortName: string;
}

interface CurrencyState {
    currency: Currency
}

// Define the initial state using that type
const initialState: CurrencyState = {
    currency: {
        code: 'rub',
        name: 'Рубль',
        shortName: '₽'
    }
}

export const currencySlice = createSlice({
    name: 'currency',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        changeCurrency: (state, action: PayloadAction<Currency>) => {
            state.currency = action.payload;
        },
    },
});

export const { changeCurrency } = currencySlice.actions;
export const currency = (state: RootState) => state.currency.currency;
export default currencySlice.reducer;
