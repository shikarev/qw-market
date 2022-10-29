import { createApi } from '@reduxjs/toolkit/query/react'
import { FormattedListResponse } from '../types';
import { ProductCardProps } from '../types/Product';
import api from '../utils/api';
import { camelToUnderline, underlineToCamelDeep } from '../utils/caseConverter';

interface IWishlistReq {
  page?: string;
  limit?: string;
  sort?: string;
  sortType?: string;
}

// Define a service using a base URL and expected endpoints
export const wishlistsAPI = createApi({
  reducerPath: 'wishlist/api',
  tagTypes: [ 'Wishlist' ],
  baseQuery: api.baseQueryConfig(),
  endpoints: (builder) => ({
    getWishes: builder.query<FormattedListResponse<ProductCardProps>, IWishlistReq>({
      query: (params) => ({
        url: process.env.WISHLISTS_API,
        params: camelToUnderline(params)
      }),
      transformResponse: (resp: any) => underlineToCamelDeep(resp),
      providesTags: [ 'Wishlist' ],
    }),
    addWish: builder.mutation<any, string>({
      query: (productId) => {
        return {
          url: process.env.WISHLIST_API,
          method: 'POST',
          body: { product: productId },
        }
      },
      invalidatesTags: [ { type: 'Wishlist' } ],
    }),
    deleteWish: builder.mutation<any, string>({
      query: (wishId) => {
        return {
          url: process.env.WISHLIST_API + `${wishId}`,
          method: 'DELETE',
        }
      },
      invalidatesTags: [ { type: 'Wishlist' } ],
    }),

    deleteWishesByproductId: builder.mutation<any, string>({
      query: (id) => {
        return {
          url: process.env.WISHLIST_API + `by-product/${id}`,
          method: 'DELETE',
        }
      },
      invalidatesTags: [ { type: 'Wishlist' } ],
    }),
  }),
})

export const {
  useGetWishesQuery,
  useAddWishMutation,
  useDeleteWishMutation,
  useDeleteWishesByproductIdMutation,
} = wishlistsAPI
