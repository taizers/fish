import { apiSlice } from '../api/apiSlice';

export const fishPlacesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addFishPlace: builder.mutation({
      query: (credentials) => ({
        url: '/user/create/place',
        method: 'POST',
        body: { ...credentials },
      }),
      invalidatesTags: ['Place'],
    }),
    deletePlace: builder.mutation({
      query: (id) => ({
        url: `/place/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Place'],
    }),
    getPlacesList: builder.query({
      query: ({ page, limit }) => ({
        url: `/user/place?page=${page}&size=${limit}`,
      }),
      providesTags: ['Place'],
    }),
    getPlace: builder.query({
      query: (id) => ({
        url: `/user/place/${id}`,
      }),
      providesTags: ['Place'],
    }),
    getAdminPlacesList: builder.query({
      query: ({ page, limit }) => ({
        url: `/admin/redactor/places?page=${page}&size=${limit}`,
      }),
      providesTags: ['Place'],
    }),
    getAdminPlace: builder.query({
      query: (id) => ({
        url: `/admin/redactor/place/${id}`,
      }),
      providesTags: ['Place'],
    }),
    updatePlaceStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/admin/redactor/place/${id}/status`,
        method: 'PUT',
        body: { status },
      }),
      invalidatesTags: ['Place'],
    }),
  }),
});
