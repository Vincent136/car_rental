import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    bank: null,
    promo_id: null
}

export const formSlice = createSlice({
    name: "form",
    initialState,
    reducers: {
        setBank: (state, action) => {
            state.bank = action.payload;
        },
        setPromo: (state, action) => {
            state.promo_id = action.payload;
        },
        resetState: (state) => {
            state.bank = null;
            state.promo_id = null;
        }
    },
})

export const selectForm = (state) => state.form;
export const {setBank, setPromo, resetState} = formSlice.actions;
export default formSlice.reducer;