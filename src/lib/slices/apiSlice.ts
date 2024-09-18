import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';

// use env later
const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:8080/api/v1/',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.userInfo?.access_token;

    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
  },
});

export const apiSlice = createApi({
  baseQuery,
  endpoints: () => ({}),
});
