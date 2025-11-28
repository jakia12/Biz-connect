import { apiSlice } from '../apiSlice';

export const cartApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query({
      query: () => '/cart',
      providesTags: ['Cart'],
    }),
    addToCart: builder.mutation({
      query: ({ productId, quantity = 1 }) => ({
        url: '/cart',
        method: 'POST',
        body: { productId, quantity },
      }),
      invalidatesTags: ['Cart'],
      async onQueryStarted({ productId, quantity, productData }, { dispatch, queryFulfilled }) {
        if (productData) {
          const patchResult = dispatch(
            cartApi.util.updateQueryData('getCart', undefined, (draft) => {
              if (draft.cart) {
                const existingItem = draft.cart.items?.find(
                  item => item.productId._id === productId || item.productId === productId
                );
                if (!existingItem) {
                  draft.cart.items = draft.cart.items || [];
                  draft.cart.items.push({
                    productId: { _id: productId, ...productData },
                    quantity,
                    price: productData.price,
                  });
                  draft.cart.itemCount = (draft.cart.itemCount || 0) + quantity;
                  draft.cart.total = (draft.cart.total || 0) + (productData.price * quantity);
                }
              }
            })
          );
          try {
            await queryFulfilled;
          } catch {
            patchResult.undo();
          }
        }
      },
    }),
    updateCartQuantity: builder.mutation({
      query: ({ productId, quantity }) => ({
        url: '/cart',
        method: 'PATCH',
        body: { productId, quantity },
      }),
      invalidatesTags: ['Cart'],
      async onQueryStarted({ productId, quantity }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          cartApi.util.updateQueryData('getCart', undefined, (draft) => {
            if (draft.cart?.items) {
              const item = draft.cart.items.find(
                i => i.productId._id === productId || i.productId === productId
              );
              if (item) {
                const oldQuantity = item.quantity;
                item.quantity = quantity;
                draft.cart.itemCount = (draft.cart.itemCount || 0) - oldQuantity + quantity;
                draft.cart.total = draft.cart.items.reduce(
                  (sum, item) => sum + (item.price * item.quantity), 0
                );
              }
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
    removeFromCart: builder.mutation({
      query: (productId) => ({
        url: `/cart?productId=${productId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Cart'],
      async onQueryStarted(productId, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          cartApi.util.updateQueryData('getCart', undefined, (draft) => {
            if (draft.cart?.items) {
              const itemIndex = draft.cart.items.findIndex(
                i => i.productId._id === productId || i.productId === productId
              );
              if (itemIndex !== -1) {
                const item = draft.cart.items[itemIndex];
                draft.cart.itemCount = (draft.cart.itemCount || 0) - item.quantity;
                draft.cart.total = (draft.cart.total || 0) - (item.price * item.quantity);
                draft.cart.items.splice(itemIndex, 1);
              }
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
    clearCart: builder.mutation({
      query: () => ({
        url: '/cart',
        method: 'DELETE',
      }),
      invalidatesTags: ['Cart'],
    }),
  }),
});

export const {
  useGetCartQuery,
  useAddToCartMutation,
  useUpdateCartQuantityMutation,
  useRemoveFromCartMutation,
  useClearCartMutation,
} = cartApi;
