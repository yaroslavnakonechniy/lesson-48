import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1',
    credentials: 'include', // критично для cookie
  }),
  tagTypes: ['Boards', 'Auth'],
  endpoints: () => ({}),
});
