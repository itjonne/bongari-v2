import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../../services/auth';
// import { DEFAULT_SLICE } from '../default';

// Kurkataan onko localstoragessa kampetta.
const user = JSON.parse(localStorage.getItem('user'));

const initialState = user ? user : null;

// https://www.youtube.com/watch?v=mvfsC66xqj0&t=3666s
export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
  try {
    return await authService.register(user);
  } catch (error) {
    const message = 'Problems with registering';
    // Palautttaa payloadina messagen.
    return thunkAPI.rejectWithValue(message);
  }
});

export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (error) {
    const message = 'Problems with logging in';
    // Palautttaa payloadina messagen.
    return thunkAPI.rejectWithValue(message);
  }
});

export const logout = createAsyncThunk('auth/logout', async () => {
  console.log('logging out');
  return await authService.logout();
});

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
    addPoints: (state, action) => {
      console.log('adding points');
      if (state.points) state.points = state.points += action.payload;
      localStorage.setItem('user', JSON.stringify(state));
    },
  },
  extraReducers: (builder) => {
    builder
      // CASES FOR REGISTER
      .addCase(register.pending, (state) => {
        return state;
        // state.isLoading = true;
      })
      .addCase(register.fulfilled, (state) => {
        return state;
        // state.isLoading = false;
        // state.isSuccess = true;
      })
      .addCase(register.rejected, (state) => {
        // state.isLoading = false;
        // state.isError = true;
        // state.message = action.payload;
        return state;
      })
      // CASES FOR LOGIN
      .addCase(login.pending, (state) => {
        return state;
        // state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log('payload', action.payload);
        // state.isLoading = false;
        // state.isSuccess = true;
        // state.user = action.payload;
        return action.payload;
      })
      .addCase(login.rejected, (state) => {
        // state.isLoading = false;
        // state.isError = true;
        // state.message = action.payload;
        // state.user = null;
        return state;
      })
      // CASES FOR LOGOUT
      .addCase(logout.fulfilled, (state) => {
        console.log(state);
        return null;
      });
  },
});

export const { reset, addPoints } = userSlice.actions;

export default userSlice.reducer;
