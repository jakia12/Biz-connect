import { apiSlice } from '../apiSlice';

export const servicesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getServices: builder.query({
      query: (params = {}) => {
        const searchParams = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            searchParams.append(key, value);
          }
        });
        return `/services?${searchParams.toString()}`;
      },
      providesTags: (result) =>
        result?.services
          ? [
              ...result.services.map(({ _id }) => ({ type: 'Services', id: _id })),
              { type: 'Services', id: 'LIST' },
            ]
          : [{ type: 'Services', id: 'LIST' }],
    }),
    getServiceById: builder.query({
      query: (id) => `/services/${id}`,
      providesTags: (result, error, id) => [{ type: 'Services', id }],
    }),
    getServiceReviews: builder.query({
      query: ({ id, page = 1, limit = 5 }) => `/services/${id}/reviews?page=${page}&limit=${limit}`,
      providesTags: (result, error, { id }) => [{ type: 'Reviews', id }],
    }),
    getSellerServices: builder.query({
      query: () => '/seller/services',
      providesTags: (result) =>
        result?.services
          ? [
              ...result.services.map(({ _id }) => ({ type: 'Services', id: _id })),
              { type: 'Services', id: 'SELLER_LIST' },
            ]
          : [{ type: 'Services', id: 'SELLER_LIST' }],
    }),
    createService: builder.mutation({
      query: (serviceData) => ({
        url: '/seller/services',
        method: 'POST',
        body: serviceData,
      }),
      invalidatesTags: [{ type: 'Services', id: 'LIST' }, { type: 'Services', id: 'SELLER_LIST' }],
    }),
    updateService: builder.mutation({
      query: ({ id, ...serviceData }) => ({
        url: `/seller/services/${id}`,
        method: 'PATCH',
        body: serviceData,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Services', id },
        { type: 'Services', id: 'LIST' },
        { type: 'Services', id: 'SELLER_LIST' },
      ],
    }),
    deleteService: builder.mutation({
      query: (id) => ({
        url: `/seller/services/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Services', id: 'LIST' }, { type: 'Services', id: 'SELLER_LIST' }],
    }),
  }),
});

export const {
  useGetServicesQuery,
  useGetServiceByIdQuery,
  useGetServiceReviewsQuery,
  useGetSellerServicesQuery,
  useCreateServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
} = servicesApi;
