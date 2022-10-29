import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query/react'
import { sectionsApi } from '../api/sections';
import { collectionsApi } from '../api/collections';
import { categoriesApi } from '../api/categories';
import { productAPI } from '../api/product';
import { vendorsApi } from '../api/vendors';
import { authSlice } from './auth';
import { categorySlice } from './category';
import { searchApi } from '../api/search';
import { favoritesAPI } from '../api/favorites';
import { manufacturersAPI } from '../api/manufacturer';
import { searchFilterSlice } from './searchFilter';
import { playlistProductsApi } from '../api/playlistProducts';
import { viewHistoryApi } from '../api/viewHistory';
import { remoteCartApi } from '../api/remoteCart';
import cartSlice from './сart';
import { reviewsAPI } from '../api/productReviews';
import { userAPI } from '../api/user';
import { promotionAPI } from '../api/promotion';
import { promotionSlice } from './actions';
import { brandsSlice } from './brands';
import { wishlistsAPI } from '../api/wishlists';
import { wishlistSlice } from './wishlist';
import { currencySlice } from './currency';
import { storiesApi } from '../api/stories';
import { ordersApi } from '../api/orders';
import { storiesSlice } from './stories';
import { productSlice } from './product';
import { productFeedbackSlice } from './productFeedback';
import { questionsAPI } from '../api/productQuestions';
import { orderSlice } from './order';
import { searchHistoryApi } from '../api/searchHistory';
import { categoriesSlice } from './categories';
import { podcastsApi } from '../api/podcasts';
import { modOptionsSlice } from './modOption';
import { newsesAPI } from '../api/news';
import { addressApi } from '../api/address';
import { wallAPI } from '../api/wall';
import { meAPI } from '../api/me';
import { reviewsArticlesApi } from '../api/reviewsArticles'

export const store = configureStore({
  reducer: {
    [ viewHistoryApi.reducerPath ]: viewHistoryApi.reducer,
    [ collectionsApi.reducerPath ]: collectionsApi.reducer,
    [ playlistProductsApi.reducerPath ]: playlistProductsApi.reducer,
    [ sectionsApi.reducerPath ]: sectionsApi.reducer,
    [ categoriesApi.reducerPath ]: categoriesApi.reducer,
    [ productAPI.reducerPath ]: productAPI.reducer,
    [ vendorsApi.reducerPath ]: vendorsApi.reducer,
    [ searchApi.reducerPath ]: searchApi.reducer,
    [ favoritesAPI.reducerPath ]: favoritesAPI.reducer,
    [ manufacturersAPI.reducerPath ]: manufacturersAPI.reducer,
    [ categorySlice.name ]: categorySlice.reducer,
    [ promotionSlice.name ]: promotionSlice.reducer,
    [ searchFilterSlice.name ]: searchFilterSlice.reducer,
    [ authSlice.name ]: authSlice.reducer,
    [ brandsSlice.name ]: brandsSlice.reducer,
    [ reviewsAPI.reducerPath ]: reviewsAPI.reducer,
    [ questionsAPI.reducerPath ]: questionsAPI.reducer,
    [ userAPI.reducerPath ]: userAPI.reducer,
    [ wishlistSlice.name ]: wishlistSlice.reducer,
    [ productFeedbackSlice.name ]: productFeedbackSlice.reducer,
    [ promotionAPI.reducerPath ]: promotionAPI.reducer,
    [ newsesAPI.reducerPath ]: newsesAPI.reducer,
    [ searchHistoryApi.reducerPath ]: searchHistoryApi.reducer,
    [ remoteCartApi.reducerPath ]: remoteCartApi.reducer,
    [ cartSlice.name ]: cartSlice.reducer,
    [ wishlistsAPI.reducerPath ]: wishlistsAPI.reducer,
    [ currencySlice.name ]: currencySlice.reducer,
    [ storiesApi.reducerPath ]: storiesApi.reducer,
    [ ordersApi.reducerPath ]: ordersApi.reducer,
    [ storiesSlice.name ]: storiesSlice.reducer,
    [ productSlice.name ]: productSlice.reducer,
    [ orderSlice.name ]: orderSlice.reducer,
    [ categoriesSlice.name ]: categoriesSlice.reducer,
    [ podcastsApi.reducerPath ]: podcastsApi.reducer,
    [ addressApi.reducerPath ]: addressApi.reducer,
    [ wallAPI.reducerPath ]: wallAPI.reducer,
    [ modOptionsSlice.name ]: modOptionsSlice.reducer,
    [ meAPI.reducerPath ]: meAPI.reducer,
    [ reviewsArticlesApi.reducerPath ]: reviewsArticlesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      sectionsApi.middleware,
      collectionsApi.middleware,
      playlistProductsApi.middleware,
      categoriesApi.middleware,
      productAPI.middleware,
      vendorsApi.middleware,
      searchApi.middleware,
      favoritesAPI.middleware,
      viewHistoryApi.middleware,
      manufacturersAPI.middleware,
      reviewsAPI.middleware,
      questionsAPI.middleware,
      userAPI.middleware,
      remoteCartApi.middleware,
      promotionAPI.middleware,
      newsesAPI.middleware,
      wishlistsAPI.middleware,
      storiesApi.middleware,
      ordersApi.middleware,
      searchHistoryApi.middleware,
      podcastsApi.middleware,
      addressApi.middleware,
      wallAPI.middleware,
      meAPI.middleware,
      reviewsArticlesApi.middleware,
    )
})

setupListeners(store.dispatch)
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
