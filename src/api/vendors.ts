import { createApi } from '@reduxjs/toolkit/query/react';
import { IVendorData, IVendorPartners, IVendors } from '../types/Vendor';
import api from '../utils/api';
import { underlineToCamelDeep } from '../utils/caseConverter';

// Defining Vendors Api
export const vendorsApi = createApi({
  reducerPath: 'vendors',
  baseQuery: api.baseQueryConfig(),
  endpoints: (builder) => ({

    getVendors: builder.query<IVendors, { query: string, limit: number }>({
      query: ({ query, limit }) => ({
          url: process.env.VENDORS_API + `?query=${query}${limit > 0 ? `&limit=${limit}` : ''}`
        }
      )
    }),

    getAllVendors: builder.query<IVendors, { page: number, limit: number }>({
      query: ({ page = 1, limit = 12 }) => ({
          url: process.env.VENDORS_API,
          params: { page, limit }
        }
      )
    }),

    getVendorData: builder.query<IVendorData, string>({
      query: (id) => ({
          url: process.env.VENDOR_API + `${id}`
        }
      )
    }),

    getProductsByVendorId: builder.query<any, { id: string, page?: number, limit?: number }>({
      query: ({ id, page = 1, limit = 12 }) => ({
          url: process.env.VENDOR_API + `products/${id}`,
          params: { page, limit }
        }
      ),
      transformResponse: r => underlineToCamelDeep(r),
    }),

    getVendorPartnersByVendorId: builder.query<IVendorPartners[], { id: string, page?: number, limit?: number }>({
      query: ({ id, page = 1, limit = 12 }) => ({
          url: process.env.VENDOR_API + `vendor-partners/${id}/grouped`,
          params: { page, limit },
        }
      ),
    }),
  })
});

export const {
  useGetVendorsQuery,
  useGetVendorDataQuery,
  useGetAllVendorsQuery,
  useGetProductsByVendorIdQuery,
  useGetVendorPartnersByVendorIdQuery,
} = vendorsApi;
