import { IProductData } from '../types/Product';
import { IOptions } from '../types/Filters';
import { createApi } from '@reduxjs/toolkit/dist/query/react';
import api from '../utils/api';
import { IManufacturer, ISearchManufacturersQuery } from '../types/Manufacturer';
import { ISearchQuery, ListResponse } from '../types';
import { underlineToCamelDeep } from '../utils/caseConverter';

// Defining Vendors Api
export const searchApi = createApi({
  reducerPath: 'search',
  baseQuery: api.baseQueryConfig(),
  endpoints: (builder) => ({
    getOptions: builder.query<IOptions, {
      query?: string;
      limit?: number;
      categoryId?: string;
    }>({
      query: ({ query, limit, categoryId }) => ({
          url: process.env.MARKET_SEARCH_API + `options/${categoryId}`,
          params: { query, limit }
        }
      ),
      transformResponse: (resp: any) => {
        return {
          ...resp,
          options: resp.options.map((data: any) => ({
            id: data.id,
            name: data.name,
            description: data.description,
            type: data.type,
            designType: data.design_type,
            optionValues: data.option_values,
          }))
        };
      }
    }),
    productSearch: builder.query<ListResponse<IProductData>, ISearchQuery>({
      query: ({ query, limit = 12, page = 1 }) => ({
          url: process.env.MARKET_SEARCH_API + `product/`,
          params: { query, limit, page }
        }
      ),
      transformResponse: (resp: ListResponse<IProductData>) => underlineToCamelDeep(resp)
    }),
    searchManufacturers: builder.query<ListResponse<IManufacturer>, ISearchManufacturersQuery>({
      query: ({ query, limit, page, categoryId, status }) => ({
          url: process.env.MARKET_SEARCH_API + `manufacturer/`,
          params: { query, limit, page, category_id: categoryId, status }
        }
      ),
      transformResponse: (resp: any) => {
        return {
          ...resp,
          data: resp.data.map((data: any) => ({
            id: data.id,
            name: data.name,
            picturePath: data.picture_path || '',
            description: data.description,
            site: data.site
          }))
        }
      }
    }),
  }),
})

export const {
  useGetOptionsQuery,
  useProductSearchQuery,
  useSearchManufacturersQuery,
  useLazyProductSearchQuery
} = searchApi
