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
    updateFavorite(state, action) {
      const data = action.payload;
      const index = state.favList.indexOf(data.mal_id);

      if (index === -1) {
        state.favList.push(data.mal_id);
        state.favorites.push(data);
      } else {
        state.favList.splice(index, 1);
        state.favorites = state.favorites.filter(
          (fav) => fav.mal_id !== data.mal_id,
        );
      }
    },
  },
});

export default userSlice.reducer;
export const userActions = userSlice.actions;
