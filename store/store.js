import { configureStore } from '@reduxjs/toolkit';
import animangaReducer from './slices/animangaSlice';

export const store = configureStore({
  reducer: {
    animanga: animangaReducer,
  },
});
