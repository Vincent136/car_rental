import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const setOrder = createAsyncThunk(
  'setOrder',
  async (payload, {rejectWithValue}) => {
    try {
      const res = await axios.post(
        'http://192.168.1.57:3000/api/v1/order/',
        JSON.stringify(payload.json),
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + payload.token
          },
        },
      );

      return res.data;
    } catch (e) {
        if(e.response.data){
            return rejectWithValue(e.response.data.message);
        }else{
            return rejectWithValue('Something went wrong');
        }
    }
  },
);
