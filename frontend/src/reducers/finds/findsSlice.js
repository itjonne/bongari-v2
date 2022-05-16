import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import findsService from '../../services/finds';

const initialState = [];

export const getFinds = createAsyncThunk('finds/getFinds', async (user, thunkAPI) => {
  try {
    return await findsService.getFinds(user);
  } catch (error) {
    const message = 'Problems with fetching finds';
    // Palautttaa payloadina messagen.
    return thunkAPI.rejectWithValue(message);
  }
});

export const addFind = createAsyncThunk(
  'finds/addFind',
  async ({ user, object, body }, thunkAPI) => {
    try {
      return await findsService.addFind({ user, object, body });
    } catch (error) {
      const message = 'Problems with adding find';
      // Palautttaa payloadina messagen.
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const removeFind = createAsyncThunk('finds/removeFind', async ({ user, find }, thunkAPI) => {
  try {
    return await findsService.removeFind({ user, find });
  } catch (error) {
    const message = 'Problems with adding find';
    // Palautttaa payloadina messagen.
    return thunkAPI.rejectWithValue(message);
  }
});

export const findsSlice = createSlice({
  name: 'finds',
  initialState: initialState, // Kurkataan onko localstoragessa entiset
  reducers: {
    initializeFinds: (state, action) => {
      return action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // CASES FOR GETFINDS
      .addCase(getFinds.fulfilled, (state, action) => {
        return action.payload;
      })
      // CASES FOR ADDFIND
      .addCase(addFind.pending, (state) => {
        return state;
      })
      .addCase(addFind.fulfilled, (state, action) => {
        if (action.payload === null) return state; // TODO: Onko tyhmä tarkistaa tässä?
        return [...state, action.payload];
      })
      .addCase(removeFind.fulfilled, (state, action) => {
        if (action.payload === null) return state;
        return state.filter((find) => find.id !== action.payload.id);
      });
  },
});
export const { initializeFinds } = findsSlice.actions;

export default findsSlice.reducer;
