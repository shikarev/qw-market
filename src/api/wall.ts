import { createApi } from '@reduxjs/toolkit/query/react'
import api from '../utils/api';
import { ListResponse } from '../types';
import { underlineToCamelDeep } from '../utils/caseConverter';
import { BaseWallCard, WallTypes } from '../types/WallCard';

interface WallRequest {
  type?: WallTypes,
  page?: number,
  limit?: number,
}

export const wallAPI = createApi({
  reducerPath: 'wall/api',
  tagTypes: [ 'wall' ],
  baseQuery: api.baseQueryConfig(),
  endpoints: (builder) => ({
    getWall: builder.query<ListResponse<BaseWallCard>, WallRequest>({
      query: (params) => ({
        url: process.env.WALL_API,
        params
      }),
      transformResponse(resp: any) {
        return ({
          ...resp,
          data: resp.data.map((data: any) => ({
              ...(underlineToCamelDeep(data)),
              media: data.media ?? data.vendor_media
            }
          ))
        })
      },
      providesTags: [ 'wall' ],
    }),

  }),
})

export const {
  useGetWallQuery
} = wallAPI
