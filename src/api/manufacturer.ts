import { createApi } from '@reduxjs/toolkit/query/react';
import api from '../utils/api';
import { IManufacturer } from './../types/Manufacturer';
import { ListResponse } from '../types';
import { IProductData } from '../types/Product';
import placeholder from '../assets/placeHolders/noImagePlaceholder.svg';

// Defining manufacturers Api
export const manufacturersAPI = createApi({
  reducerPath: 'manufacturer',
  baseQuery: api.baseQueryConfig(),
  endpoints: (builder) => ({
    getManufacturerById: builder.query<IManufacturer, { query: string }>({
      query: ({ query }) => ({
        url: process.env.MANUFACTURER_API + `${query}`
      }),
    }),
    getManufacturerCategories: builder.query<ListResponse<IManufacturer>,
      { id: string, page?: number, limit?: number }>({
      query: ({ id, page = 1, limit = 12 }) => ({
        url: process.env.MANUFACTURER_API + `${id}/categories`,
        params: { page, limit }
      }),
      transformResponse: (resp: any) => {
        return {
          ...resp,
          data: resp.data.map((data: any) => ({
            id: data.id || '0',
            description: data.description || ' ',
            name: data.name || 'без имени',
            picturePath: data.picture_path || placeholder,
          }))
        };
      }
    }),
  }),
})

export const { useGetManufacturerByIdQuery, useGetManufacturerCategoriesQuery } = manufacturersAPI
