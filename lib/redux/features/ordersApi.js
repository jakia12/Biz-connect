import { apiSlice } from '../apiSlice';

export const ordersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: (role = 'buyer') => `/${role}/orders`,
      providesTags: (result) =>
        result?.orders
          ? [
              ...result.orders.map(({ _id }) => ({ type: 'Orders', id: _id })),
              { type: 'Orders', id: 'LIST' },
            ]
          : [{ type: 'Orders', id: 'LIST' }],
    }),
    getOrderById: builder.query({
      query: ({ id, role = 'buyer' }) => `/${role}/orders/${id}`,
      providesTags: (result, error, { id }) => [{ type: 'Orders', id }],
    }),
    createOrder: builder.mutation({
      query: (orderData) => ({
        url: '/orders',
        method: 'POST',
        body: orderData,
      }),
      invalidatesTags: ['Orders', 'Cart'],
    }),
    updateOrderStatus: builder.mutation({
      query: ({ id, status, role = 'seller' }) => ({
        url: `/${role}/orders/${id}`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Orders', id },
        { type: 'Orders', id: 'LIST' },
        'Notifications',
      ],
    }),
    cancelOrder: builder.mutation({
      query: ({ id, role = 'buyer' }) => ({
        url: `/${role}/orders/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Orders', id },
        { type: 'Orders', id: 'LIST' },
        'Notifications',
      ],
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useGetOrderByIdQuery,
  useCreateOrderMutation,
  useUpdateOrderStatusMutation,
  useCancelOrderMutation,
} = ordersApi;
