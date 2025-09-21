import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define auth state type
type AuthState = {
  token: string | null;
  user: any | null;
};

// Initial state
const initialState: AuthState = {
  token: null,
  user: null,
};

// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ token: string | null; user: any | null }>
    ) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export { authSlice };
