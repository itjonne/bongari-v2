import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../../services/auth';

// Kurkataan onko localstoragessa kampetta.
const token = JSON.parse(localStorage.getItem('token'));
const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
  user: user ? user : null,
  token: token ? token : null,
  isLoading: false,
  isError: false,
  isSuccess: false,
};

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

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    // eslint-disable-next-line no-unused-vars
    logout: (state, action) => {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      state.user = action.payload;
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // CASES FOR REGISTER
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
        state.token = null;
      })
      // CASES FOR LOGIN
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
        state.token = null;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
