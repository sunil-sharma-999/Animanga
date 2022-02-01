import { createSlice } from '@reduxjs/toolkit';

let initialState = {
  query: '',
  type: 'manga',
  page: 1,
  data: [],
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
    typeSet(state, action) {
      state.type = action.payload;
    },
    dataSet(state, action) {
      state.data = action.payload;
    },
    pageSet(state, action) {
      state.page = action.payload;
    },
  },
});
export const animangaActions = animangaSlice.actions;
export default animangaSlice.reducer;
