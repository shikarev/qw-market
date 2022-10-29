import { createApi } from '@reduxjs/toolkit/query/react';
import api from '../utils/api';
import { FormattedListResponse } from '../types';
import { IPodcast } from '../types/Podcasts';


export const podcastsApi = createApi({
  reducerPath: 'podcasts',
  baseQuery: api.baseQueryConfig(),
  endpoints: (builder) => ({
    getPodcasts: builder.query<FormattedListResponse<IPodcast>, { vendorId?: string }>({
      query: ({ vendorId }) => ({
          url: process.env.PODCASTS_API,
          params: {
            vendor_id: vendorId
          }
        }
      ),
      transformResponse: (resp: any) => {
        return {
          total: resp.total,
          pageCount: resp[ 'page-count' ],
          data: resp.data.map((item: any) => ({
            id: item.id,
            name: item.name,
            orderBy: item.order_by,
            description: item.description,
            startDate: item.start_date,
            duration: item.duration,
            authorId: item.author_id,
            authorName: item.author_name,
            authorPicturePath: item.author_picture_path,
            viewCount: item.view_count,
            image: item.image,
            video: item.video,
          }))
        }
      }
    }),
  }),
})

export const { useGetPodcastsQuery } = podcastsApi
