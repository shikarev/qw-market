import { createApi } from '@reduxjs/toolkit/dist/query/react';
import api from '../utils/api';
import {
  AddProductToCartArgs,
  UpdateCartProductArgs,
  CartProductStatus,
  CalculateResult,
  ProductPriceList,
  ICartItem
} from '../types/Cart';
import { underlineToCamelDeep } from '../utils/caseConverter';

export const remoteCartApi = createApi({
  reducerPath: 'remoteCart',
  baseQuery: api.baseQueryConfig(),
  tagTypes: [ 'Cart', 'Product' ],
  endpoints: (builder) => ({
    getCartDetails: builder.query<ICartItem[], void>({
      query: () => ({
        url: process.env.CART_API,
      }),
      transformResponse: (resp: any) => underlineToCamelDeep(resp),
      providesTags: [ 'Cart' ]
    }),
    getProductPrices: builder.query<ProductPriceList, string[]>({
      query: (ids: string[]) => ({
        url: process.env.PRODUCT_PRICES_API + `by-ids?ids=${JSON.stringify(ids)}`
      }),
      providesTags: [ 'Cart' ]
    }),
    addProduct: builder.mutation<ICartItem, AddProductToCartArgs>({
      query: (body) => ({
        method: 'POST',
        url: process.env.CART_API,
        body,
      }),
      invalidatesTags: [ { type: 'Cart' } ],
    }),
    migrate: builder.mutation<any, AddProductToCartArgs[]>({
      query: (body) => ({
        method: 'POST',
        url: process.env.CART_API + 'migrate',
        body: { carts: body },
      }),
      invalidatesTags: [ { type: 'Cart' } ]
    }),
    update: builder.mutation<ICartItem, UpdateCartProductArgs>({
      query: ({ id, ...body }) => ({
        url: process.env.CART_API + `${id}`,
        method: 'PUT',
        body
      }),
      invalidatesTags: [ { type: 'Cart' } ]
    }),
    updateStatuses: builder.mutation<void, { [ id: string ]: CartProductStatus }>({
      query: ({ id, ...body }) => ({
        url: process.env.CART_API + `multiple`,
        method: 'PUT',
        body
      }),
      invalidatesTags: [ { type: 'Cart' } ]
    }),
    deleteProduct: builder.mutation<void, string>({
      query: (id) => ({
        method: 'DELETE',
        url: process.env.CART_API + `${id}`
      }),
      invalidatesTags: [ { type: 'Cart' } ]
    }),
    multipleDeleteProduct: builder.mutation<void, string[]>({
      query: (ids) => ({
        method: 'DELETE',
        url: process.env.CART_API + `multiple?ids=${JSON.stringify(ids)}`
      }),
      invalidatesTags: [ { type: 'Cart' } ]
    }),
    deleteAllProducts: builder.mutation<void, void>({
      query: () => ({
        method: 'DELETE',
        url: `cart/all`
      }),
      invalidatesTags: [ { type: 'Cart' } ]
    }),
    calculator: builder.mutation<CalculateResult, { currency: string; data: { [ id: string ]: number } }>({
      query: ({ currency, data: body }) => ({
        url: process.env.CALCULATOR_API + `cart/${currency.toLowerCase()}`,
        method: 'POST',
        body
      })
    }),
  })
});

export const { useCalculatorMutation } = remoteCartApi;
