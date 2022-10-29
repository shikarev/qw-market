import { createApi } from '@reduxjs/toolkit/query/react';
import { Section } from '../types';
import api from '../utils/api';

// Define a service using a base URL and expected endpoints
export const collectionsApi = createApi({
  reducerPath: 'collections',
  baseQuery: api.baseQueryConfig(),
  endpoints: (builder) => ({
    getCollections: builder.query<Section[], void>({
      query: () => ({
          url: process.env.COLLECTIONS_API,
        }
      ),
    }),
  }),
})

export const { useGetCollectionsQuery } = collectionsApi
