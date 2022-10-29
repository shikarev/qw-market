import { createApi } from '@reduxjs/toolkit/query/react'
import { FormattedListResponse } from '../types';
import { IFavoriteProduct } from '../types/Favorites';
import api from '../utils/api';
import { camelToUnderline, underlineToCamelDeep } from '../utils/caseConverter';

interface IFavoritesReq {
  page?: string;
  limit?: string;
  id?: string;
  status?: string;
}

// Define a service using a base URL and expected endpoints
export const favoritesAPI = createApi({
  reducerPath: 'favorites',
  tagTypes: [ 'Favorites', 'FavoritesCats' ],
  baseQuery: api.baseQueryConfig(),
  endpoints: (builder) => ({
    deleteFavoriteGroup: builder.mutation<any, string>({
      query: (id) => {
        return {
          url: process.env.FAVORITES_CATEGORY_API + `${id}`,
          method: 'DELETE',
        }
      },
      invalidatesTags: [ { type: 'FavoritesCats' }, { type: 'Favorites' } ],
    }),
    getFavorites: builder.query<FormattedListResponse<IFavoriteProduct>, IFavoritesReq>({
      query: (params) => ({
        url: process.env.FAVORITES_API,
        params: camelToUnderline(params)
      }),
      transformResponse: (resp: any) => underlineToCamelDeep(resp),
      providesTags: [ 'Favorites' ],
    }),
    addFavorite: builder.mutation<any, string>({
      query: (productId) => {
        return {
          url: process.env.FAVORITES_API,
          method: 'POST',
          body: { product: productId },
        }
      },
      invalidatesTags: [ { type: 'Favorites' } ],
    }),
    deleteFavorite: builder.mutation<IFavoriteProduct, string>({
      query: (favoriteId) => {
        return {
          url: process.env.FAVORITES_API + `${favoriteId}`,
          method: 'DELETE',
        }
      },
      invalidatesTags: [ { type: 'Favorites' } ],
    }),
    deleteFavoriteByproductId: builder.mutation<any, any>({
      query: (id) => {
        return {
          url: process.env.FAVORITES_API + `by-product/${id}`,
          method: 'DELETE',
        }
      },
      invalidatesTags: [ { type: 'Favorites' } ],
    }),
  }),
})

export const {
  useDeleteFavoriteGroupMutation,
  useAddFavoriteMutation,
  useDeleteFavoriteMutation,
  useGetFavoritesQuery,
  useDeleteFavoriteByproductIdMutation,
} = favoritesAPI
