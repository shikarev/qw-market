import { createApi } from '@reduxjs/toolkit/query/react';
import { ICatalogCategory } from '../types/Catalog';
import api from '../utils/api';


// Defining Categories Api
export const categoriesApi = createApi({
  reducerPath: 'categories',
  baseQuery: api.baseQueryConfig(),
  endpoints: (builder) => ({
    getCategories: builder.query<ICatalogCategory[], void>({
      query: () => ({
          url: process.env.CATEGORIES_API + '?status=active',
        }
      ),
    }),
    getRootCategories: builder.query<ICatalogCategory[], void>({
      query: () => ({
          url: process.env.CATEGORIES_API + 'roots',
        }
      ),
    }),
    getCategoryBySectionId: builder.query<ICatalogCategory[], string>({
      query: (id) => ({
          url: process.env.CATEGORIES_API + `?section_id=${id}`,
        }
      ),
    }),
    getCategory: builder.query<ICatalogCategory, { categoryId?: string, manufacturer?: string }>({
      query: ({ categoryId, manufacturer }) => ({
          url: process.env.CATEGORIES_API,
          params: { category_id: categoryId, manufacturer_id: manufacturer }
        }
      ),
    }),
    getCategoryOptions: builder.query<any, any>({
      query: (id) => ({
          url: process.env.OPTIONS_API + `${id}`,
        }
      ),
    }),
  }),
})

export const {
  useGetCategoriesQuery,
  useGetCategoryOptionsQuery,
  useGetCategoryBySectionIdQuery,
  useGetCategoryQuery,
  useGetRootCategoriesQuery
} = categoriesApi
