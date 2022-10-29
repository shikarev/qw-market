import { createApi } from '@reduxjs/toolkit/query/react';
import api from "../utils/api";
import {Address} from "../types/Address";

// Defining Categories Api
export const addressApi = createApi({
    reducerPath: 'address',
    baseQuery:api.baseQueryConfig(),
    tagTypes: ['address'],
    endpoints: (builder) => ({
        addLocation: builder.mutation<any, Address>({
            query: (body) => ({
                    method: 'POST',
                    url: process.env.LOCATION_API,
                    body
                }
            ),
        }),
        addUserAddress: builder.mutation<any, { id: string }>({
            query: (id) => ({
                    method: 'POST',
                    url: process.env.MARKET_USER_API + `address/`,
                    body: {address: id}
                }
            ),
            invalidatesTags: ['address']
        }),
        deleteUserAddress: builder.mutation<any,any>({
            query: (id) => ({
                url: process.env.MARKET_USER_API + `address/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['address']
        }),
        getUserAddresses: builder.query<any, any>({
            query: () => ({
                    url: process.env.MARKET_USER_API + `addresses/`,
                }
            ),
            providesTags: ['address']
        }),
    }),
})

export const { useAddLocationMutation, useAddUserAddressMutation, useDeleteUserAddressMutation, useGetUserAddressesQuery } = addressApi
