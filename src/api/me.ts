import { createApi } from '@reduxjs/toolkit/query/react'
import { underlineToCamelDeep } from '../utils/caseConverter';
import api from '../utils/api';

export const meAPI = createApi({
  reducerPath: 'me',
  baseQuery: api.baseQueryConfig(),
  tagTypes: [ 'me' ],
  endpoints: (builder) => ({
    me: builder.query<any, void>({
      query: () => {
        return {
          url: process.env.USER_PROFILE_API + 'me',
          method: 'GET'
        };
      },
      transformResponse: (r: any) => underlineToCamelDeep(r)
    }),
  })
})

export const { useMeQuery } = meAPI
