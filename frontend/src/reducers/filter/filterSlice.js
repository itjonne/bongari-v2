import { createSlice } from '@reduxjs/toolkit';

// Kurkataan onko localstoragessa kampetta.
const filter = JSON.parse(localStorage.getItem('filter'));

const initialState = {
  sort: 1,
  direction: '',
  category: 'Kaikki',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState: filter ? filter : initialState, // Kurkataan onko localstoragessa entiset
  reducers: {
    setSort: (state, action) => {
      // localStorage.setItem('filter', JSON.stringify({ ...state, sort: action.payload }));
      state.sort = action.payload;
    },
    setCategory: (state, action) => {
      // localStorage.setItem('filter', JSON.stringify({ ...state, category: action.payload }));
      state.category = action.payload;
    },
    /* eslint-disable-next-line */
    setDirection: (state, action) => {
      state.direction === '' ? (state.direction = '-') : (state.direction = '');
    },
    reset: (state) => {
      localStorage.removeItem('filter');
      state.sort = initialState.sort;
      state.category = initialState.category;
    },
  },
});
export const { setSort, setCategory, reset, setDirection } = filterSlice.actions;

export default filterSlice.reducer;
