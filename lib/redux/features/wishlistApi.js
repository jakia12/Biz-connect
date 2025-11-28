import { apiSlice } from '../apiSlice';

export const wishlistApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getWishlist: builder.query({
      query: () => '/wishlist',
      providesTags: ['Wishlist'],
      transformResponse: (response) => response.wishlist || [],
    }),
    addToWishlist: builder.mutation({
      query: (productId) => ({
        url: '/wishlist',
        method: 'POST',
        body: { productId },
      }),
      invalidatesTags: ['Wishlist'],
      async onQueryStarted(productId, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          wishlistApi.util.updateQueryData('getWishlist', undefined, (draft) => {
            const exists = draft.some(
              item => item.productId?._id === productId || item.productId === productId
            );
            if (!exists) {
              draft.push({ productId, addedAt: new Date().toISOString() });
            }
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    removeFromWishlist: builder.mutation({
      query: (productId) => ({
        url: `/wishlist?productId=${productId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Wishlist'],
      async onQueryStarted(productId, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          wishlistApi.util.updateQueryData('getWishlist', undefined, (draft) => {
            const index = draft.findIndex(
              item => item.productId?._id === productId || item.productId === productId
            );
            if (index !== -1) {
              draft.splice(index, 1);
            }
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useGetWishlistQuery,
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
} = wishlistApi;
