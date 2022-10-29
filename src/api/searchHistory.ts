import { createApi } from '@reduxjs/toolkit/query/react';
import api from '../utils/api';
import { ListResponse } from '../types';
import { SearchHistoryItem, SearchHistoryRequest } from '../types/SearchHistory';

export const searchHistoryApi = createApi({
  reducerPath: 'searchHistory',
  baseQuery: api.baseQueryConfig(),
  tagTypes: [ 'search' ],
  endpoints: (builder) => ({
    getSearchHistory: builder.query<ListResponse<SearchHistoryItem>, SearchHistoryRequest>({
      query: (args) => ({
          url: process.env.SEARCH_HISTORIES_API,
          params: { ...args },
        }
      ),
      providesTags: [ 'search' ]
    }),
    deleteSearchHistory: builder.mutation<void, void>({
      query: () => ({
          url: process.env.SEARCH_HISTORIES_API,
          method: 'DELETE'
        }
      ),
      invalidatesTags: [ 'search' ]
    }),
  }),
})

export const { useGetSearchHistoryQuery, useDeleteSearchHistoryMutation } = searchHistoryApi
