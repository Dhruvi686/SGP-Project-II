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
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
    prepareHeaders: (headers) => {
      // You can add auth headers here if needed
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // Register User
    registerUser: builder.mutation({
      query: (userData: RegisterPayload) => ({
        url: '/auth/register',
        method: 'POST',
        body: userData,
      }),
    }),

    // Send OTP
    sendOtp: builder.mutation({
      query: (email: string) => ({
        url: '/auth/send-otp',
        method: 'POST',
        body: { email },
      }),
    }),
    
    // Verify OTP
    verifyOtp: builder.mutation({
      query: (data: { email: string; otp: string }) => ({
        url: '/auth/verify-otp',
        method: 'POST',
        body: data,
      }),
    }),
    
    // Login User
    loginUser: builder.mutation({
      query: (credentials: { email: string; password: string }) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),

    // Get current user
    getMe: builder.query({
      query: () => '/auth/me',
    }),

    // Update user profile
    updateProfile: builder.mutation({
      query: (userData) => ({
        url: '/auth/me',
        method: 'PUT',
        body: userData,
      }),
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useRegisterUserMutation,
  useSendOtpMutation,
  useVerifyOtpMutation,
  useLoginUserMutation,
  useGetMeQuery,
  useUpdateProfileMutation,
} = baseApi;