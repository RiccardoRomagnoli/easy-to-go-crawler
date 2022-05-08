import { configureStore } from '@reduxjs/toolkit';
import homepageReducer from '../features/homepage/homepageSlice.js'
import crawlHistoryReducer from '../features/crawlhistory/crawlHistorySlice.js'

export const store = configureStore({
  reducer: {
    homepage: homepageReducer,
    crawlHistory: crawlHistoryReducer,
  },
});