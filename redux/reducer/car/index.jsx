import { createSlice } from '@reduxjs/toolkit';
import { getCars, getCarsDetails } from './api';

const initialState = {
    data: [],
    message: null,
    details: {},
    status: "idle",
}

export const carSlice = createSlice({
    name: 'car',
    initialState,
    reducers: {
        // Add any other reducer functions here 
    },
    extraReducers:(builder) => {
        builder.addCase(getCars.fulfilled, (state, action) => {
            state.data = action.payload.data;
            state.message = action.payload.message;
            state.status = "success";
        });

        builder.addCase(getCarsDetails.fulfilled, (state, action) => {
            state.details = action.payload.data;
            state.message = action.payload.message;
            state.status = "success";
        });
    }
})

export const selectCar = (state) => state.car; // selector untuk mengambil state user
export { getCars, getCarsDetails }; // action untuk panggil api postLogin dan get Profile
export default carSlice.reducer; // user reducer untuk di tambahkan ke store
