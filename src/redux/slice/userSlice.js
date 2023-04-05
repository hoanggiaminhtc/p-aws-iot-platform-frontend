import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  setTokenLocalStorage,
  deleteTokenLocalStorage,
} from '~/util/handleLocalStorage';
import { login, authentication } from '~/api/userApi';

const initialState = {
  isLoading: false,
  user: null,
};

export const handleLogin = createAsyncThunk(
  'user/login',
  async (body, { rejectWithValue }) => {
    try {
      const res = await login(body);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

export const handleAuthentication = createAsyncThunk(
  'user/authentication',
  async (body, { rejectWithValue }) => {
    try {
      const res = await authentication();

      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateProfile: (state, newUser) => {
      state.user = {
        userName: newUser.payload.fullName,
        avatarUrl: newUser.payload.avatarUrl,
      };
    },
    handleLogout: (state) => {
      state.isLoading = false;
      state.user = null;
      deleteTokenLocalStorage();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(handleLogin.fulfilled, (state, action) => {
      state.user = {
        userName: action.payload.data.userName,
        avatarUrl: action.payload.data.avatarUrl,
        role: action.payload.data.role,
      };
      setTokenLocalStorage(action.payload.data.token);
    });
    builder.addCase(handleAuthentication.fulfilled, (state, action) => {
      state.user = {
        userName: action.payload.data.name,
        avatarUrl: action.payload.data.avatarurl,
        role: action.payload.data.role,
      };
    });
    builder.addMatcher(
      (action) => action.type.endsWith('/pending'),
      (state) => {
        state.isLoading = true;
      },
    );
    builder.addMatcher(
      (action) =>
        action.type.endsWith('/fulfilled') || action.type.endsWith('/rejected'),
      (state) => {
        state.isLoading = false;
      },
    );
  },
});

export const { updateProfile, handleLogout } = userSlice.actions;
export default userSlice.reducer;
