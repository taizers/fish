import { apiSlice } from '../api/apiSlice';

export const commentsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createComment: builder.mutation({
      query: ({ text, placeId }) => ({
        url: `/user/place/${placeId}/comment`,
        method: 'POST',
        body: { text },
      }),
      invalidatesTags: ['Comment'],
    }),
    deleteComment: builder.mutation({
      query: (id) => ({
        url: `/comments/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Comment'],
    }),
    getComments: builder.query({
      query: ({ page, limit }) => ({
        url: `/comments?page=${page}&size=${limit}`,
      }),
      providesTags: ['Comment'],
    }),
    getComment: builder.query({
      query: (id) => ({
        url: `/comments/${id}`,
      }),
      providesTags: ['Comment'],
    }),
    getAdminComments: builder.query({
      query: ({ page, limit }) => ({
        url: `/admin/redactor/comments?page=${page}&size=${limit}`,
      }),
      providesTags: ['Comment'],
    }),
    updateCommentStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/admin/redactor/comments/${id}/status`,
        method: 'PUT',
        body: { status },
      }),
      invalidatesTags: ['Comment'],
    }),
  }),
});
