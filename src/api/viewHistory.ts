import { createApi } from '@reduxjs/toolkit/query/react';
import api from '../utils/api';
import { ListResponse } from '../types';
import { ProductCardProps } from '../types/Product';
import { underlineToCamelDeep } from '../utils/caseConverter';

// Defining Section Api
export const viewHistoryApi = createApi({
  reducerPath: 'viewHistory',
  baseQuery: api.baseQueryConfig(),
  endpoints: (builder) => ({
    getViewHistory: builder.query<ListResponse<ProductCardProps>, { page?: number, limit?: number }>({
      query: ({ page, limit }) => ({
          url: process.env.VIEW_HISTORIES_API + 'products/',
          params: { page, limit },
        }
      ),
      transformResponse: (resp: any) => underlineToCamelDeep(resp),
    }),
  }),
})

export const { useGetViewHistoryQuery } = viewHistoryApi
