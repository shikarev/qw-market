import * as React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Home";
import { NoMatch } from "../NoMatch";

const Brands = React.lazy(() => import("../Brands"));
const Cart = React.lazy(() => import("../Cart"));
const Catalog = React.lazy(() => import("../Catalog"));
const Category = React.lazy(() => import("../Category"));
const Favorites = React.lazy(() => import("../Favorites"));
const Order = React.lazy(() => import("../Order"));
const Orders = React.lazy(() => import("../Orders"));
const OrderDetails = React.lazy(
  () => import("../../components/Orders/OrderDetails")
);
const Product = React.lazy(() => import("../Product"));
const ProductsPlaylist = React.lazy(() => import("../ProductsPlaylist"));
//const Profile = React.lazy(() => import("../Profile"))
const Promotions = React.lazy(() => import("../Promotions"));
const ReviewsArticles = React.lazy(() => import("../ReviewsArticles"));
const Search = React.lazy(() => import("../Search"));
const Section = React.lazy(() => import("../Section"));
const Shops = React.lazy(() => import("../Shops"));
const Stores = React.lazy(() => import("../../components/Stores"));
const SubCategory = React.lazy(() => import("../SubCategory"));
const Video = React.lazy(
  () => import("../../components/ReviewsArticles/Video")
);
const Wall = React.lazy(() => import("../Wall"));
const Wishlist = React.lazy(() => import("../WishList"));
const News = React.lazy(() => import("../News"));

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="catalog/*" element={<Catalog />} />
      <Route path="wall/*" element={<Wall />} />
      <Route path="brands/*" element={<Brands />} />
      <Route path="orders/*" element={<Orders />} />
      <Route path="orders/:id/" element={<OrderDetails />} />
      <Route path="product/:id/*" element={<Product />} />
      {/*<Route path="profile/*" element={<Profile />} />*/}
      <Route path="favorites/*" element={<Favorites />} />
      <Route path="order/*" element={<Order />} />
      <Route path="wishlist/*" element={<Wishlist />} />
      <Route path="category/:id/*" element={<Category />} />
      <Route path="subcategory/:id/*" element={<SubCategory />} />
      <Route path="promotion/*" element={<Promotions />} />
      <Route path="section/:id/*" element={<Section />} />
      <Route path="stores" element={<Stores />} />
      <Route path="stores/:id/*" element={<Shops />} />
      <Route path="products_playlist/:id/*" element={<ProductsPlaylist />} />
      <Route path="search/*" element={<Search />} />
      <Route path="cart/*" element={<Cart />} />
      <Route path="reviews_articles/*" element={<ReviewsArticles />} />
      <Route path="/reviews_videos/*" element={<Video />} />
      <Route path="news/:id" element={<News />} />
      <Route path="*" element={<NoMatch />} />
    </Routes>
  );
};

export default MainRoutes;
