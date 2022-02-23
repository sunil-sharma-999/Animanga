import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: null,
  favorites: [],
  favList: [],
};

const userSlice = createSlice({
  name: 'userdata',
  initialState,
  reducers: {
    setData(state, action) {
      return action.payload;
    },
  },
});

export default userSlice.reducer;
export const userActions = userSlice.actions;
