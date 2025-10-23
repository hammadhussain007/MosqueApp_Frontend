import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  profile: null,
  token: null,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserProfile: (state, action) => {
      state.profile = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    updateProfile: (state, action) => {
      state.profile = { ...state.profile, ...action.payload };
    },
    logout: (state) => {
      state.profile = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUserProfile, setToken, updateProfile, logout } = userSlice.actions;
export default userSlice.reducer;

// Selectors
export const selectUser = (state) => state.user.profile;
export const selectIsAuthenticated = (state) => state.user.isAuthenticated;
export const selectToken = (state) => state.user.token;