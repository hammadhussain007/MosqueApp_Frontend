import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  profile: null,
  token: null,
  isAuthenticated: false,
  role: 'user', // Default role
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserProfile: (state, action) => {
      state.profile = action.payload;
      // Extract role from profile if it exists
      state.role = action.payload?.role || 'user';
    },
    setToken: (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    setRole: (state, action) => {
      state.role = action.payload;
    },
    updateProfile: (state, action) => {
      state.profile = { ...state.profile, ...action.payload };
      // Update role if provided
      if (action.payload.role) {
        state.role = action.payload.role;
      }
    },
    logout: (state) => {
      state.profile = null;
      state.token = null;
      state.isAuthenticated = false;
      state.role = 'user';
    },
  },
});

export const { setUserProfile, setToken, updateProfile, logout, setRole } = userSlice.actions;
export default userSlice.reducer;

// Selectors
export const selectUser = (state) => state.user.profile;
export const selectIsAuthenticated = (state) => state.user.isAuthenticated;
export const selectToken = (state) => state.user.token;
export const selectUserRole = (state) => state.user.role;