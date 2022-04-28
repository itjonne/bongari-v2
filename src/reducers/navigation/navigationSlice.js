import { createSlice } from '@reduxjs/toolkit';

// Kurkataan onko localstoragessa kampetta.
const navigation = JSON.parse(localStorage.getItem('navigation'));

const initialState = {
  navigation: navigation ? navigation : '/home',
};

export const navigationSlice = createSlice({
  name: 'navigation',
  initialState: initialState,
  reducers: {
    navigate: (state, action) => {
      localStorage.setItem('navigation', action.payload);
      state.navigation = action.payload;
    },
  },
});

export default navigationSlice.reducer;
