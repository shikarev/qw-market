import { createApi } from '@reduxjs/toolkit/query/react';
import api from '../utils/api';

export const userAddressesAPI = createApi({
  reducerPath: 'userAddresses',
  baseQuery: api.baseQueryConfig(),
  endpoints: (builder) => ({
    getUserAddresses: builder.query<any, void>({
      query: () => ({
          url: process.env.MARKET_USER_API + `addresses/`,
        }
      ),
    }),
  })
})

export const { useGetUserAddressesQuery } = userAddressesAPI
