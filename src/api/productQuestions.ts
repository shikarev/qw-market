import { createApi } from '@reduxjs/toolkit/dist/query/react';
import api from '../utils/api';
import { FormatedListResponse } from '../types';
import { ICreateQuestion, IQuestionsReviews } from '../types/Questions';

export const questionsAPI = createApi({
  reducerPath: 'questions',
  tagTypes: [ 'Questions', 'Notes', 'NotesChild' ],
  baseQuery: api.baseQueryConfig(),
  endpoints: (builder) => ({
    getProductQuestionsByProductId: builder.query<FormatedListResponse<IQuestionsReviews>, { productId: string, page?: number, limit?: number }>({
      query: ({ productId, page = 1, limit = 10 }) => ({
          url: process.env.QUESTIONS_API + `${productId}`,
          params: { page, limit },
        }
      ),
      transformResponse: (resp: any) => {
        return {
          ...resp,
          pageCount: resp[ 'page-count' ] | 0,
        }
      },
      providesTags: [ 'Questions' ],
    }),

    addQuestionsLike: builder.mutation<any, any>({
      query: ({ id, ...patch }) => ({
          url: process.env.QUESTION_API + `like/${id}`,
          method: 'POST',
          body: {
            id: patch.id,
            is_like: patch.rate,

          }
        }
      ),
    }),

    removeQuestionsLike: builder.mutation<any, string>({
      query: (id) => ({
          url: process.env.QUESTION_API + `like/${id}`,
          method: 'DELETE',
        }
      ),
    }),

    createQuestions: builder.mutation<any, ICreateQuestion>({
      query: (body) => ({
          url: process.env.QUESTION_API,
          method: 'POST',
          body: {
            ...body,
            //anonymous: body.anonymous ? 1 : 0,
          }
        }
      ),
      invalidatesTags: [ { type: 'Questions' } ],
    }),

    removeQuestion: builder.mutation<string, string>({
      query: (id) => ({
          url: process.env.QUESTION_API + `${id}`,
          method: 'DELETE',
        }
      ),
      invalidatesTags: [ { type: 'Questions' } ],
    }),

    getProductQuestionsByVendorId: builder.query<FormatedListResponse<IQuestionsReviews>, { vendorId: string, page?: number, limit?: number }>({
      query: ({ vendorId, page = 1, limit = 10 }) => ({
          url: process.env.QUESTIONS_API + `by-vendor/${vendorId}`,
          params: { page, limit },
        }
      ),
      transformResponse: (resp: any) => {
        return {
          ...resp,
          pageCount: resp[ 'page-count' ] | 0,
        }
      },
      providesTags: [ 'Questions' ],
    }),

  }),
})

export const {
  useGetProductQuestionsByProductIdQuery,
  useAddQuestionsLikeMutation,
  useRemoveQuestionsLikeMutation,
  useCreateQuestionsMutation,
  useRemoveQuestionMutation,
  useGetProductQuestionsByVendorIdQuery,
} = questionsAPI
