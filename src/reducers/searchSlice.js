import { createSlice } from '@reduxjs/toolkit';

let initialState = {
  query: '',
  type: 'manga',
  page: 1,
  data: [],
  loading: true,
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    clearQuery(state) {
      state.query = '';
    },
    loadingFunc: (state, action) => {
      state.loading = action.payload;
    },
    searchFunc: (state, action) => {
      state.query = action.payload;
    },
    typeFunc: (state, action) => {
      state.type = action.payload;
    },
    dataFunc: (state, action) => {
      state.data = action.payload;
    },
    pageFunc: (state, action) => {
      state.page = action.payload;
    },
  },
});
export const searchActions = searchSlice.actions;
export default searchSlice.reducer;
