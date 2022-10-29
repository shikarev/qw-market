import {createApi} from '@reduxjs/toolkit/query/react'
import api from "../utils/api";
import {ListResponse} from "../types";
import {camelToUnderline, underlineToCamelDeep} from '../utils/caseConverter';

interface StoryMedia {
    id: string,
    path: string,
    type: "picture" | "video",
    created: string
}

interface IStoriesReq {
    imageSize?: number;
    vendorId?: string;
    categoryId?: string;
    productId?: string;
    sectionId?: string;
    page?: number;
    limit?: number;
}

export interface IStory {
    id: string,
    name?: string,
    type?: string,
    description?: string,
    viewCount?: number;
    productId?: string;
    categoryId?: string;
    sectionId?: string;
    collectionId?: string;
    manufacturerId?: string;
    vendor?: {
        id?: string,
        name?: string,
        picturePath?: string,
        site?: string,
    }
    media?: StoryMedia
}

// Define a service using a base URL and expected endpoints
export const storiesApi = createApi({
    reducerPath: 'stories',
    baseQuery: api.baseQueryConfig(),
    endpoints: (builder) => ({

        getStories: builder.query<ListResponse<IStory>, IStoriesReq>({
            query: ({page, limit, sectionId, productId, categoryId, vendorId, imageSize}) => ({
                url: process.env.STORIES_API,
                params: {page, limit, sectionId, productId, category_id: categoryId, vendorId, imageSize}
            }),
            transformResponse: (resp: any) => underlineToCamelDeep(resp),
        }),

        getStory: builder.query<any, { id: string, imageSize?: number }>({
            query: ({id, imageSize}) => ({
                url: process.env.STORY_API + `${id}`,
                params: camelToUnderline({imageSize})
            }),
            transformResponse: (resp: any) => underlineToCamelDeep(resp),
        }),

    }),
})

export const {
    useGetStoriesQuery,
    useGetStoryQuery
} = storiesApi
