import { createApi } from '@reduxjs/toolkit/query/react';
import { Section } from '../types';
import api from '../utils/api';

// Defining Section Api
export const sectionsApi = createApi({
  reducerPath: 'sections',
  baseQuery: api.baseQueryConfig(),
  endpoints: (builder) => ({
    getSections: builder.query<Section[], void>({
      query: () => ({
          url: process.env.SECTION_API,
        }
      ),
    }),
  }),
})

export const { useGetSectionsQuery } = sectionsApi
