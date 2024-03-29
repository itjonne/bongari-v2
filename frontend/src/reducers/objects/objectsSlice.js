import { createSlice } from '@reduxjs/toolkit';

const initialState = null;

export const objectsSlice = createSlice({
  name: 'objects',
  initialState: initialState, // Kurkataan onko localstoragessa entiset
  reducers: {
    initialize: (state, action) => {
      return action.payload;
    },
  },
});
export const { initialize } = objectsSlice.actions;

export default objectsSlice.reducer;
