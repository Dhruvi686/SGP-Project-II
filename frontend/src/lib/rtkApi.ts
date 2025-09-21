// "use client";

// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const baseApi = createApi({
//   reducerPath: "api",
//   // baseQuery won't actually be used by the mocked endpoints, but keep it.
//   baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
//   endpoints: () => ({}),
// });

// export type RegisterPayload = {
//   name: string;
//   email: string;
//   password: string;
//   role?: string;
//   businessName?: string;
//   contactNumber?: string;
//   address?: string;
// };

// export const authApi = baseApi.injectEndpoints({
//   endpoints: (builder) => ({
//     // ✅ MOCKED register – always succeeds after a short delay
//     register: builder.mutation<any, RegisterPayload>({
//       async queryFn(body) {
//         await new Promise((r) => setTimeout(r, 400)); // simulate latency
//         // You can add simple validations here if you want
//         return { data: { message: "User registered", user: { id: Date.now(), ...body } } };
//       },
//     }),

//     // ✅ MOCKED login
//     login: builder.mutation<any, { email: string; password: string }>({
//       async queryFn({ email, password }) {
//         await new Promise((r) => setTimeout(r, 300));
//         if (!email || !password) {
//           return { error: { status: 400, data: { message: "Email and password are required" } } as any };
//         }
//         return { data: { token: "fake-jwt-token" } };
//       },
//     }),

//     // ✅ MOCKED me
//     me: builder.query<any, void>({
//       async queryFn() {
//         await new Promise((r) => setTimeout(r, 200));
//         return { data: { id: 1, name: "Demo User", email: "demo@gmail.com" } };
//       },
//     }),
//   }),
// });

// export const { useRegisterMutation, useLoginMutation, useMeQuery } = authApi;

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
  role?: string;
  businessName?: string;
  contactNumber?: string;
  address?: string;
};

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api',
    prepareHeaders: (headers) => {
      // Add any common headers if needed
      return headers;
    },
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: ({ email, password }) => ({
        url: '/auth/login',
        method: 'POST',
        body: { email, password },
      }),
    }),
    registerUser: builder.mutation({
      query: (userData) => ({
        url: '/auth/register',
        method: 'POST',
        body: userData,
      }),
    }),
  }),
});

export const { useLoginUserMutation, useRegisterUserMutation } = baseApi;
