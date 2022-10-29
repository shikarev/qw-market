import { createApi } from '@reduxjs/toolkit/query/react';
import { CollectionProducts } from '../types/CollectionItem';
import api from '../utils/api';

// Define a service using a base URL and expected endpoints
export const playlistProductsApi = createApi({
  reducerPath: 'playlistProducts',
  baseQuery: api.baseQueryConfig(),
  endpoints: (builder) => ({
    getPlaylistProducts: builder.query<CollectionProducts[], string>({
      query: (id) => ({
          url: process.env.COLLECTION_API + `${id}/products`,
        }
      ),
    }),
  }),
})

export const { useGetPlaylistProductsQuery } = playlistProductsApi
