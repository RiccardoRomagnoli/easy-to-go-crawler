import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 0,
};

export const crawlHistorySlice = createSlice({
  name: 'crawlHistory',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {

  },
});

export default crawlHistorySlice.reducer;
