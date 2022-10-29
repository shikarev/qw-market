import { createApi } from '@reduxjs/toolkit/query/react'
import { IProductData } from '../types/Product';
import api from '../utils/api';
import { ListResponse } from '../types';
import { IPromotion, PromotionResponse } from '../types/Promotion';
import { underlineToCamelDeep } from '../utils/caseConverter';

interface IPromotionReq {
  imageSize?: number;
  vendorId?: string;
  categoryId?: string;
  productId?: string;
  sectionId?: string;
  page?: string;
  limit?: string;
}

// Define a service using a base URL and expected endpoints
export const promotionAPI = createApi({
  reducerPath: 'promotion',
  tagTypes: [ 'Promotions' ],
  baseQuery: api.baseQueryConfig(),
  endpoints: (builder) => ({

    getActions: builder.query<ListResponse<IPromotion>, IPromotionReq>({
      query: ({ page, limit, sectionId, productId, categoryId, vendorId, imageSize }) => ({
        url: process.env.PROMOTIONS_API,
        params: { page, limit, sectionId, productId, category_id: categoryId, vendor_id: vendorId, imageSize }
      }),
      transformResponse(resp: any) {
        return ({
          ...resp,
          data: resp.data.map((data: any) => ({
            id: data.id,
            name: data.name,
            type: data.type,
            image: data.image,
            description: data.description,
            vendor: data.vendor,
          }))
        })
      },
      providesTags: [ 'Promotions' ],
    }),

    getPromotion: builder.query<PromotionResponse, string>({
      query: (id) => ({
        url: process.env.PROMOTION_API + `${id}`,
      }),
      transformResponse: (r) => underlineToCamelDeep(r)
    }),

    getPromotionProducts: builder.query<IProductData[], string>({
      query: (id) => ({
        url: process.env.PROMOTION_API + `${id}/products`,
      }),
      transformResponse: (r) => underlineToCamelDeep(r)
    })
  })
})

export const {
  useGetActionsQuery,
  useGetPromotionQuery,
  useGetPromotionProductsQuery
} = promotionAPI
