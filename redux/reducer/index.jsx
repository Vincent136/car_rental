import { combineReducers } from '@reduxjs/toolkit';
import userSlice from './user';
import carSlice from './car';
import formSlice from './form'; 

const rootReducer = combineReducers({
    user: userSlice,
    car: carSlice, 
    form: formSlice
})

export default rootReducer;