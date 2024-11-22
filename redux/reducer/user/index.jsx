import { createSlice } from '@reduxjs/toolkit';
import { postRegister, postLogin, getProfile } from './api';

const initialState = {
    data: null, // variable untuk menyimpan data user
    token: null,
    isLogin: false,
    status: 'idle', // 'idle' | 'loading' | 'success' | 'failed'
    message: null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: { // kumpulan method untuk mengubah initial state secara synchronous
        logout: (state, action) => {
            state.data = null;
            state.isLogin = false;
            state.message = null;
            state.token = null;
        },
        setStateByName: (state, action) => {
            state[action.payload.name] = action.payload.value;
        },
        resetState: (state) => initialState,
    },
    extraReducers: (builder) => {
        //Post Login Reducer
        builder.addCase(postLogin.pending, (state, action) => {
            state.status = 'loading';
        });
        builder.addCase(postLogin.fulfilled, (state, action) => {// action = { type: '', payload: data, meta: {}}
            state.status = 'success';
            state.data = action.payload.data.user;
            state.token = action.payload.data.token;
            state.message = action.payload.message;
            state.isLogin = true;
        });
        builder.addCase(postLogin.rejected, (state, action) => {
            state.status = 'failed';
            console.log(action);
            state.message = action.payload;
        });

        //Get Profile Reducers
        builder.addCase(getProfile.pending, (state, action) => {
            state.status = 'loading';
        });
        builder.addCase(getProfile.fulfilled, (state, action) => {
            state.status = 'success';
            state.data = action.payload.data.user;
            state.message = action.payload.message;
        });
        builder.addCase(getProfile.rejected, (state, action) => {
            console.log(action);
            state.message = action.payload;
        });

        //Post Register Reducers
        builder.addCase(postRegister.pending, (state, action) => {
            state.message = action.payload.message;
        });
        builder.addCase(postRegister.fulfilled, (state, action) => {
            state.status = 'success';
            state.data = action.payload.data
            state.message = action.payload.message;
        });
        builder.addCase(postRegister.rejected, (state, action) => {
            state.status = 'failed';
            console.log(action);
            state.message = action.payload;
        });
    }
});

export const selectUser = (state) => state.user; // selector untuk mengambil state user
export const { logout, setStateByName ,resetState } = userSlice.actions; // action untuk logout
export { postLogin, getProfile, postRegister }; // action untuk panggil api postLogin dan get Profile
export default userSlice.reducer; // user reducer untuk di tambahkan ke store