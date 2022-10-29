import { createApi } from '@reduxjs/toolkit/query/react'
import api from '../utils/api';
import { FormatedListResponse, ListResponse } from '../types';
import { ICreateFeedback, ICreateNote, IFeedbackNotes, IFeedbacksMedia, IProductReviews } from '../types/Reviews';

export interface IFeedbackSort {
  sort: 'created' | 'id' | 'rate' | 'like_count' | 'dislike_count' | string,
  sortType?: 'ASC' | 'DESC' | string,
}

export interface IFeedbackQuery extends IFeedbackSort {
  productId: string,
  page?: number,
  limit?: number,
  rates: number[]
}

// Define a service using a base URL and expected endpoints
export const reviewsAPI = createApi({
  reducerPath: 'reviews',
  tagTypes: [ 'Feedbacks', 'Notes', 'NotesChild', 'Rates', 'VendorFeedbacks' ],
  baseQuery: api.baseQueryConfig(),
  endpoints: (builder) => ({
    getProductReviewsByProductId: builder.query<FormatedListResponse<IProductReviews>, IFeedbackQuery>({
      query: ({ productId, page = 1, limit = 10, rates, sort, sortType }) => ({
          url: process.env.FEEDBACKS_API + `${productId}`,
          params: { page, limit, rates: `[${rates}]`, sort, sort_type: sortType }
        }
      ),
      transformResponse: (resp: any) => {
        return {
          ...resp,
          pageCount: resp[ 'page-count' ] | 0,
        }
      },
      providesTags: [ 'Feedbacks' ],
    }),

    getVendorReviewsByVendorId: builder.query<FormatedListResponse<IProductReviews>, { vendorId: string, page?: number, limit?: number }>({
      query: ({ vendorId, page = 1, limit = 10 }) => ({
          url: process.env.FEEDBACKS_API + `by-vendor/${vendorId}`,
          params: { page, limit },
        }
      ),
      transformResponse: (resp: any) => {
        return {
          ...resp,
          pageCount: resp[ 'page-count' ] | 0,
        }
      },
      providesTags: [ 'VendorFeedbacks' ],
    }),

    returnFeedback: builder.mutation<string, string>({
      query: (id) => ({
          url: process.env.FEEDBACK_API + `${id}`,
        }
      ),
      //providesTags: ['Feedback'],
    }),

    createFeedback: builder.mutation<any, ICreateFeedback>({
      query: (body) => ({
          url: process.env.FEEDBACK_API,
          method: 'POST',
          body: {
            ...body,
            anonymous: body.anonymous ? 1 : 0,
          }
        }
      ),
      invalidatesTags: [ { type: 'Feedbacks' }, { type: 'Rates' }, { type: 'VendorFeedbacks' } ],
    }),

    removeFeedback: builder.mutation<string, string>({
      query: (id) => ({
          url: process.env.FEEDBACK_API + `${id}`,
          method: 'DELETE',
        }
      ),
      invalidatesTags: [ { type: 'Feedbacks' }, { type: 'Rates' }, { type: 'VendorFeedbacks' } ],
    }),


    addFeedbackLike: builder.mutation<any, any>({
      query: ({ id, ...patch }) => ({
          url: process.env.FEEDBACK_API + `like/${id}`,
          method: 'POST',
          body: patch,
        }
      ),
    }),

    removeFeedbackLike: builder.mutation<any, string>({
      query: (id) => ({
          url: process.env.FEEDBACK_API + `like/${id}`,
          method: 'DELETE',
        }
      ),
    }),

    ///////////////////////////////////

    getFeedbackNotesByFeedbackId: builder.query<ListResponse<IFeedbackNotes>, { feedbackId: string, page?: number, limit?: number }>({
      query: ({ feedbackId, page, limit }) => ({
          url: process.env.FEEDBACK_NOTES_API + `${feedbackId}`,
          params: { page, limit }
        }
      ),
      providesTags: [ 'Notes' ],
    }),

    getFeedbackNotesParentId: builder.query<ListResponse<IFeedbackNotes>, any>({
      query: ({ feedbackId, id }: any) => ({
          url: process.env.FEEDBACK_NOTES_API + `${feedbackId}?parent_id=${id}`,
        }
      ),
      providesTags: [ 'NotesChild' ],
    }),

    CreateFeedbackNote: builder.mutation<any, ICreateNote>({
      query: (body) => ({
          url: process.env.FEEDBACK_NOTE_API,
          method: 'POST',
          body,
        }
      ),
      invalidatesTags: [ { type: 'Notes' } ],
    }),

    createNote: builder.mutation<any, ICreateNote>({
      query: (body) => ({
          url: process.env.FEEDBACK_NOTE_API,
          method: 'POST',
          body,
        }
      ),
      invalidatesTags: [ { type: 'NotesChild' } ],
    }),

    removeNote: builder.mutation<any, string>({
      query: (id) => ({
          url: process.env.FEEDBACK_NOTE_API + `${id}`,
          method: 'DELETE',
        }
      ),
      invalidatesTags: [ { type: 'Notes' } ],
    }),

    updateFeedback: builder.mutation<any, { id: any, body: any }>({
      query: ({ id, body }) => ({
          url: process.env.FEEDBACK_API + `${id}`,
          method: 'PUT',
          body: {
            ...body,
            anonymous: body.anonymous ? 1 : 0,
          },
        }
      ),
      invalidatesTags: [ { type: 'Feedbacks' }, { type: 'VendorFeedbacks' } ],
    }),

    updateNote: builder.mutation<any, { id: string, body?: { note: string } }>({
      query: ({ id, body }) => ({
          url: process.env.FEEDBACK_NOTE_API + `${id}`,
          method: 'PUT',
          body,
        }
      ),
    }),

    updateNoteNote: builder.mutation<any, { id: string, body?: { note: string } }>({
      query: ({ id, body }) => ({
          url: process.env.FEEDBACK_NOTE_API + `${id}`,
          method: 'PUT',
          body,
        }
      ),
      //invalidatesTags: [{ type: 'NotesChild' }],
    }),

    removeNoteNote: builder.mutation<any, string>({
      query: (id) => ({
          url: process.env.FEEDBACK_NOTE_API + `${id}`,
          method: 'DELETE',
        }
      ),
      invalidatesTags: [ { type: 'NotesChild' } ],
    }),

    addNoteLike: builder.mutation<any, any>({
      query: ({ id, ...patch }) => ({
          url: process.env.FEEDBACK_NOTE_API + `like/${id}`,
          method: 'POST',
          body: patch,
        }
      ),
    }),

    removeNoteLike: builder.mutation<any, any>({
      query: (id) => ({
          url: process.env.FEEDBACK_NOTE_API + `like/${id}`,
          method: 'DELETE',
        }
      ),
    }),

    getAverageRateByProductId: builder.query<any, any>({
      query: (id) => ({
          url: process.env.PRODUCT_RATE_API + `average/${id}`,
        }
      ),
    }),

    getFeedbackRateCountByProductId: builder.query<any, any>({
      query: (id) => ({
          url: process.env.FEEDBACK_API + `${id}/rates`,
        }
      ),
      providesTags: [ 'Rates' ],
    }),

    getFeedbackMediaByProductId: builder.query<ListResponse<IFeedbacksMedia>, { productId: string, page?: number, limit?: number, image_size?: string }>({
      query: ({ productId, page, limit, image_size }) => ({
          url: process.env.MARKET_MEDIA_API + `feedback/by-product/${productId}`,
          params: { page, limit, image_size }
        }
      ),
    })

  }),
})

export const {
  useGetProductReviewsByProductIdQuery,
  useGetFeedbackNotesByFeedbackIdQuery,
  useCreateFeedbackMutation,
  useRemoveFeedbackMutation,
  useAddFeedbackLikeMutation,
  useRemoveFeedbackLikeMutation,
  useCreateNoteMutation,
  useCreateFeedbackNoteMutation,
  useRemoveNoteMutation,
  useAddNoteLikeMutation,
  useRemoveNoteLikeMutation,
  useGetFeedbackNotesParentIdQuery,
  useRemoveNoteNoteMutation,
  useUpdateNoteMutation,
  useUpdateNoteNoteMutation,
  useReturnFeedbackMutation,
  useGetAverageRateByProductIdQuery,
  useUpdateFeedbackMutation,
  useGetVendorReviewsByVendorIdQuery,
  useGetFeedbackRateCountByProductIdQuery,
  useGetFeedbackMediaByProductIdQuery,
} = reviewsAPI
