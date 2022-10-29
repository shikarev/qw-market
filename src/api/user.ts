import { createApi } from '@reduxjs/toolkit/query/react'
import api from '../utils/api';
import { IUser, IUserActivity } from '../types/User';

// Define a service using a base URL and expected endpoints
export const userAPI = createApi({
  reducerPath: 'user',
  baseQuery: api.baseQueryConfig(),
  tagTypes: [ 'UserActivities' ],
  endpoints: (builder) => ({
    getUserInfo: builder.query<IUser, string | void>({
      query: () => ({
          url: process.env.MARKET_USER_API + `info`,
        }
      ),
    }),
    getUserActivity: builder.query<IUserActivity, void>({
      query: () => ({
          url: process.env.MARKET_USER_API + `shop/activity`,
        }
      ),
      //keepUnusedDataFor: 1,
      providesTags: [ 'UserActivities' ],
      transformResponse: ((resp: any) => ({
          orders: resp.orders || 0,
          favorites: resp.favorites || 0,
          wishes: resp.wishes || 0,
          cart: resp.carts || 0,
        })
      ),
    }),
  })
})

export const { useGetUserInfoQuery, useGetUserActivityQuery, useLazyGetUserActivityQuery } = userAPI
