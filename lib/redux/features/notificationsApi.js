import { apiSlice } from '../apiSlice';

export const notificationsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query({
      query: () => '/notifications',
      providesTags: ['Notifications'],
      transformResponse: (response) => response.notifications || [],
    }),
    markAsRead: builder.mutation({
      query: (notificationId) => ({
        url: '/notifications',
        method: 'PATCH',
        body: { notificationId },
      }),
      invalidatesTags: ['Notifications'],
      async onQueryStarted(notificationId, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          notificationsApi.util.updateQueryData('getNotifications', undefined, (draft) => {
            const notification = draft.find(n => n._id === notificationId);
            if (notification) {
              notification.read = true;
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
    markAllAsRead: builder.mutation({
      query: () => ({
        url: '/notifications',
        method: 'PATCH',
        body: { markAll: true },
      }),
      invalidatesTags: ['Notifications'],
    }),
  }),
});

export const {
  useGetNotificationsQuery,
  useMarkAsReadMutation,
  useMarkAllAsReadMutation,
} = notificationsApi;
