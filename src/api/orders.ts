import { createApi } from '@reduxjs/toolkit/query/react'
import api from '../utils/api';
import {
  ICardBody,
  IDeliveryWays,
  IOrderData,
  IPlaceOrder,
  IRecipientForm,
  IRecipientUpdate, OrderInfo
} from '../types/Order';
import { FormattedListResponse, ListResponse } from '../types';
import { camelToUnderline, underlineToCamelDeep } from '../utils/caseConverter';

// Define a service using a base URL and expected endpoints
export const ordersApi = createApi({
  reducerPath: 'orders',
  baseQuery: api.baseQueryConfig(),
  tagTypes: [ 'Cards', 'Recipients', 'UserActivities' ],
  endpoints: (builder) => ({
    getDeliveryWays: builder.query<ListResponse<IDeliveryWays>, void>({
      query: () => ({
          url: process.env.DELIVERY_WAYS_API,
        }
      ),
      transformResponse: (resp: any) => {
        return {
          ...resp,
          data: resp.data.map((item: any) => ({
            id: item.id,
            name: item.name,
            created: item.created,
            image: item.picture_path
          }))
        };
      },
    }),
    getRecipients: builder.query<any, void>({
      query: () => ({
          url: process.env.ORDER_API + `recipients`,
        }
      ),
      providesTags: [ 'Recipients' ]
    }),
    getCards: builder.query<any, void>({
      query: () => ({
          url: process.env.ORDER_API + `bank-cards/`,
        }
      ),
      providesTags: [ 'Cards' ]
    }),
    getOrder: builder.query<IOrderData, { orderId?: string }>({
      query: ({ orderId }) => ({
          url: process.env.ORDER_API + `${orderId}`,
        }
      ),
      transformResponse: (resp: any) => {
        return {
          id: resp.id,
          recipientName: resp.recipient_name,
          recipientEmail: resp.recipient_email,
          recipientPhone: resp.recipient_phone,
          created: resp.created,
          deliveryType: resp.delivery_type,
          orderStatus: resp.order_status,
          paymentStatus: resp.payment_status,
          deliveryWayId: resp.delivery_way_id,
          deliveryWayName: resp.delivery_way_name,
          paymentMethodId: resp.payment_method_id,
          paymentMethodName: resp.payment_method_name,
          orderProducts: resp.order_products.map((item: any) => (
            {
              id: item.id,
              cost: item.cost,
              quantity: item.quantity,
              created: item.created,
              productId: item.product_id,
              name: item.name,
              rating: item.rating,
              feedbackCount: item.feedback_count,
              image: item.picture_path,
              currencyId: item.currency_id,
              currencyName: item.currency_name,
              vendorId: item.vendor_id,
              vendorName: item.vendor_name,
            }))
        }
      }
    }),
    deleteCard: builder.mutation<any, string>({
      query: (id) => {
        return {
          url: process.env.ORDER_API + `bank-card/${id}`,
          method: 'DELETE',
        }
      },
      invalidatesTags: [ 'Cards' ]
    }),
    addRecipient: builder.mutation<any, IRecipientForm>({
      query: (body) => {
        return {
          url: process.env.ORDER_API + `recipient/`,
          method: 'POST',
          body,
        }
      },
      invalidatesTags: [ 'Recipients' ]
    }),
    updateRecipient: builder.mutation<any, IRecipientUpdate>({
      query: ({ id, body }) => {
        return {
          url: process.env.ORDER_API + `recipient/${id}`,
          method: 'PUT',
          body: {
            name: body.name,
            email: body.email,
            phone: body.phone
          },
        }
      },
      invalidatesTags: [ 'Recipients' ]
    }),
    updateCard: builder.mutation<any, { id: string, body: ICardBody }>({
      query: ({ id, body }) => {
        return {
          url: process.env.ORDER_API + `bank-card/${id}`,
          method: 'PUT',
          body: {
            name: body.name,
            number: body.number
          },
        }
      },
      invalidatesTags: [ 'Cards' ]
    }),
    deleteRecipient: builder.mutation<any, string>({
      query: (id) => {
        return {
          url: process.env.ORDER_API + `recipient/${id}`,
          method: 'DELETE',
        }
      },
      invalidatesTags: [ 'Recipients' ]
    }),
    addCard: builder.mutation<any, ICardBody>({
      query: (body) => {
        return {
          url: process.env.ORDER_API + `bank-card/`,
          method: 'POST',
          body
        }
      },
      invalidatesTags: [ 'Cards' ]
    }),
    addOrder: builder.mutation<any, IPlaceOrder>({
      query: (body) => {
        return {
          url: process.env.ORDER_API,
          method: 'POST',
          body: camelToUnderline(body),
        }
      },
      invalidatesTags: [ { type: 'UserActivities' } ]
    }),
    getOrders: builder.query<FormattedListResponse<OrderInfo>, { page?: string, limit?: string }>({
      query: (params) => {
        return {
          url: process.env.ORDERS_API,
          method: 'GET',
          params
        }
      },
      transformResponse: (resp: any) => ({
        pageCount: resp[ 'page-count' ],
        total: resp.total,
        data: resp.data.map((item: any) => underlineToCamelDeep(item))
      }),
    }),
  }),
})

export const {
  useGetRecipientsQuery,
  useGetCardsQuery, useAddRecipientMutation, useAddCardMutation,
  useAddOrderMutation, useDeleteCardMutation, useDeleteRecipientMutation,
  useGetDeliveryWaysQuery, useGetOrderQuery, useUpdateRecipientMutation,
  useUpdateCardMutation, useGetOrdersQuery
} = ordersApi
