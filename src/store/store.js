import { configureStore } from '@reduxjs/toolkit';
import searchReducer from '../reducers/searchSlice';

export const store = configureStore({
  reducer: {
    animanga: searchReducer,
  },
});
