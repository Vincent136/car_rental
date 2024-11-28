import { createSlice } from '@reduxjs/toolkit';
import { setOrder } from './api';

const initialState = {
    bank: null,
    order: null,
    promo_id: null,
    order_message: "",
    status: "",
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
    extraReducers: (builder) => {
        builder.addCase(setOrder.fulfilled, (state, action) => {
            state.order = action.payload.data;
            state.order_message = action.payload.message;
            state.status = "success";
        }),
        builder.addCase(setOrder.rejected, (state, action) => {
            state.order_message = action.payload;
            state.status = "failed";
        })
    }
})

export const selectForm = (state) => state.form;
export const {setBank, setPromo, resetState} = formSlice.actions;
export {setOrder}
export default formSlice.reducer;