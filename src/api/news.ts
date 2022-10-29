import { createApi } from '@reduxjs/toolkit/query/react'
import api from '../utils/api';
import { FormattedListResponse } from '../types';
import { INews, INewses } from '../types/Newses';
import { underlineToCamelDeep } from '../utils/caseConverter';

// Define a service using a base URL and expected endpoints
export const newsesAPI = createApi({
  reducerPath: 'newses',
  tagTypes: [ 'Newses' ],
  baseQuery: api.baseQueryConfig(),
  endpoints: (builder) => ({
    getNewses: builder.query<FormattedListResponse<INews>, INewses>({
      query: ({
                imageSize,
                vendorId,
                categoryId,
                productId,
                sectionId,
                collectionId,
                manufacturerId,
                status,
                page,
                limit
              }) => ({
        url: process.env.NEWSES_API,
        params: {
          status,
          page,
          limit,
          section_id: sectionId,
          product_id: productId,
          category_id: categoryId,
          vendor_id: vendorId,
          collection_id: collectionId,
          manufacturer_id: manufacturerId,
          image_size: imageSize
        }
      }),
      transformResponse: (resp: any) => underlineToCamelDeep(resp),
      providesTags: [ 'Newses' ],
    }),
    getNews: builder.query<INews, string>({
      query: (id) => ({
        url: process.env.NEWS_API + `${id}`,
      }),
      transformResponse: (r) => underlineToCamelDeep(r)
    }),

  }),
})

export const {
  useGetNewsesQuery,
  useGetNewsQuery,
} = newsesAPI
