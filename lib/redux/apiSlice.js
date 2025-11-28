import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ 
    baseUrl: '/api',
    credentials: 'include',
  }),
  tagTypes: [
    'Cart',
    'Wishlist',
    'Products',
    'Orders',
    'Notifications',
    'Messages',
    'Services',
    'Sellers',
    'Admin',
    'User',
    'Reviews',
  ],
  endpoints: () => ({}),
});
