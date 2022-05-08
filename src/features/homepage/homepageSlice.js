import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 0,
};

export const homepageSlice = createSlice({
  name: 'homepage',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {

  },
});

export default homepageSlice.reducer;