// "use client";

// import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { baseApi } from "./rtkApi";

// // Define auth state type
// type AuthState = {
//   token: string | null;
//   user: any | null;
// };

// // Initial state
// const initialState: AuthState = {
//   token: null,
//   user: null,
// };

// // Auth slice
// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     setCredentials: (
//       state,
//       action: PayloadAction<{ token: string | null; user: any | null }>
//     ) => {
//       state.token = action.payload.token;
//       state.user = action.payload.user;
//     },
//     logout: (state) => {
//       state.token = null;
//       state.user = null;
//     },
//   },
// });

// export const { setCredentials, logout } = authSlice.actions;

// // Configure store
// export const store = configureStore({
//   reducer: {
//     [baseApi.reducerPath]: baseApi.reducer,
//     auth: authSlice.reducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(baseApi.middleware),
// });

// // Types
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from './rtkApi';
import { authSlice } from './auth';

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: authSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
