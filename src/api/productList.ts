import { createApi } from '@reduxjs/toolkit/query/react';
import { Section } from '../types';
import api from '../utils/api';

// Define a service using a base URL and expected endpoints
export const sectionsApi = createApi({
  reducerPath: 'sections',
  baseQuery: api.baseQueryConfig(),
  endpoints: (builder) => ({
    getSections: builder.query<Section[], void>({
      query: () => ({
          url: process.env.SECTION_API,
          params: {
            status: 'draft'
          }
        }
      ),
    }),
  }),
})

export const { useGetSectionsQuery } = sectionsApi
