import { combineReducers } from '@reduxjs/toolkit';
import userSlice from '.';

const rootReducer = combineReducers({
    user: userSlice,
})

export default rootReducer;