// Need to use the React-specific entry point to import createApi
import { createApi } from '@reduxjs/toolkit/query/react'
import { ICategoryPath, IProductData, IProductMedia, IProductModOptions, IProductSpecs } from '../types/Product';
import api from '../utils/api';
import { ISearchFilterField } from '../types/Filters';
import { IProductPrices } from '../types/Prices';
import { FormatedListResponse } from '../types';
import { underlineToCamelDeep } from '../utils/caseConverter';

// Define a service using a base URL and expected endpoints
export const productAPI = createApi({
  reducerPath: 'product',
  baseQuery: api.baseQueryConfig(),
  endpoints: (builder) => ({
    fetchProductById: builder.query<IProductData, string | void>({
      query: (id) => ({
          url: process.env.PRODUCT_API + `${id}`,
        }
      ),
      transformResponse: r => underlineToCamelDeep(r)
    }),
    getProducts: builder.query<any, { query?: string, limit?: number, catId?: string, page?: number, sort?: string, sortType?: string, manufacturer?: string, filter_option?: ISearchFilterField[] }>({
      query: ({ limit = 12, page, query, catId, filter_option, manufacturer, sort, sortType }) => ({
          url: process.env.PRODUCTS_API,
          params: {
            category_id: catId,
            manufacturer_id: manufacturer,
            sort,
            sort_type: sortType,
            query: query,
            limit,
            page,
            filter_option: filter_option ? `[${filter_option?.reduce((acc, curr, index) => {
              let filter;
              let comma = (index + 1) !== filter_option.length ? ',' : '';
              if (curr.value_id && !curr.from && !curr.to && !curr.value) {
                filter = curr.value_id.map((val, index) => `{"id":"${curr.id}","value_id":"${val}"}${curr?.value_id?.length === index + 1 ? ',' : ''}`).join();
              } else {
                filter = `{"id":"${curr.id}"${curr.value ? `,"value":"${curr.value}"` : ''}${
                  curr.from ? `,"from":"${curr.from}` : ''}"${curr.to ? `,"to":"${curr.to}"` : ''}${curr.operation ?
                  `,"operation":"${curr.operation}"` : ''}}${comma}`;
              }

              return acc + filter
            }, '').slice(0, -1)}]` : undefined
          }
        }
      ),
      transformResponse: r => underlineToCamelDeep(r)
    }),

    getProductMedia: builder.query<FormatedListResponse<IProductMedia>, any | void>({
      query: ({ id, modStr }) => ({
          url: process.env.MARKET_MEDIA_API + `product/${id}`,
          params: {
            mod_str: modStr,
          }
        }
      ),
      transformResponse: (resp: any) => {
        return {
          ...resp,
          pageCount: resp[ 'page-count' ] | 0,
        }
      }
    }),

    getCategoryPathByCategoryId: builder.query<ICategoryPath, string>({
      query: (id) => ({
          url: process.env.CATEGORY_API + `${id}/roots`,
        }
      ),
    }),

    getProductPricesByProductId: builder.query<IProductPrices, any | void>({
      query: ({ id, modStr }) => ({
          url: process.env.PRODUCT_PRICES_API + `${id}`,
          params: {
            mod_str: modStr,
          }
        }
      ),
    }),

    getProductModOptionByProductId: builder.query<IProductModOptions[], string | void>({
      query: (id) => ({
          url: process.env.PRODUCT_API + `modification/options/${id}`,
        }
      ),
    }),

    getProductOptionsByProductId: builder.query<IProductSpecs[], string | void>({
      query: (id) => ({
          url: process.env.PRODUCT_OPTIONS_API + `${id}`,
        }
      ),
    }),

    getProductFavoritesStatus: builder.query<any, string | void>({
      query: (id) => ({
          url: process.env.PRODUCT_API + `${id}/check/in-favorite`,
        }
      ),
    }),

    getProductWishesStatus: builder.query<any, string | void>({
      query: (id) => ({
          url: process.env.PRODUCT_API + `${id}/check/in-wish`,
        }
      ),
    }),
  }),
})

export const {
  useFetchProductByIdQuery,
  useGetProductsQuery,
  useGetCategoryPathByCategoryIdQuery,
  useGetProductPricesByProductIdQuery,
  useGetProductOptionsByProductIdQuery,
  useGetProductMediaQuery,
  useGetProductFavoritesStatusQuery,
  useGetProductWishesStatusQuery,
  useGetProductModOptionByProductIdQuery
} = productAPI
