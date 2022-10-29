import { createApi } from '@reduxjs/toolkit/query/react';
import api from '../utils/api';
import { underlineToCamelDeep } from '../utils/caseConverter';
import { FormattedListResponse } from '../types';
import { IReviewsArticles } from '../types/ReviewsArticles';

export const reviewsArticlesApi = createApi({
  reducerPath: 'reviewsArticles',
  baseQuery: api.baseQueryConfig(),
  endpoints: (builder) => ({
    getReviewsArticlesList: builder.query<FormattedListResponse<IReviewsArticles>, void>({
      query: () => ({
          url: process.env.REVIEWS_API,
        }
      ),
      transformResponse: (resp: any) => ({
        pageCount: resp['page-count'],
        total: resp.total,
        data: resp.data.map((item:any) => underlineToCamelDeep(item))
      }),
    }),
    getReview: builder.query<IReviewsArticles, any>({
      query: ({ id }) => ({
          url: process.env.REVIEW_API + `${id}`,
        }
      ),
      transformResponse: (resp: any) => underlineToCamelDeep(resp),
    }),
  }),
})

export const {
  useGetReviewsArticlesListQuery,
  useGetReviewQuery,
} = reviewsArticlesApi;
