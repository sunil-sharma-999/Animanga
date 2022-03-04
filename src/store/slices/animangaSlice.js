import { createSlice } from '@reduxjs/toolkit';

let initialState = {
  query: '',
};

export const animangaSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    clearQuery(state) {
      state.query = '';
    },
    search(state, action) {
      state.query = action.payload;
    },
  },
});
export const animangaActions = animangaSlice.actions;
export default animangaSlice.reducer;
