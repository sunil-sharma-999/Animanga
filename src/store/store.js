import { configureStore, combineReducers } from '@reduxjs/toolkit';
import animangaReducer from './slices/animangaSlice';
import authReducer from './slices/authSlice';
import reviewsSlice from './slices/reviewsSlice';
import userReducer from './slices/userSlice';

export const appReducer = combineReducers({
  animanga: animangaReducer,
  authCheck: authReducer,
  userData: userReducer,
  reviews: reviewsSlice,
});

const rootReducer = (state, action) => {
  if (action.type === 'auth/logout') {
    state = undefined;
  }
  return appReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
});
