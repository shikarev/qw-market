import {lazy} from "react";
import {Route} from "../types";
import Home from "../pages/Home";

// @ts-ignore
export const routes:Route[] = [
    {
        path: "/",
        exact: true,
        component: Home,
    },
    {
        path: "/catalog/*",
        exact: false,
        component: lazy(() =>
            import("../pages/Catalog"),
        ),
    },
    {
        path: "/wall/*",
        exact: false,
        component: lazy(() =>
            import("../pages/Wall"),
        ),
    },
    {
        path: "/brands/*",
        exact: false,
        component: lazy(() =>
            import("../pages/Brands"),
        ),
    },
    {
        path: "/orders/*",
        exact: false,
        component: lazy(() =>
            import("../pages/Orders"),
        ),
    },
    {
        path: "/product/:id/*",
        exact: false,
        component: lazy(() =>
            import("../pages/Product"),
        ),
    },
    {
        path: "/profile/*",
        exact: false,
        component: lazy(() =>
            import("../pages/Profile"),
        ),
    },
    {
        path: "/favorites/*",
        exact: false,
        component: lazy(() =>
            import("../pages/Favorites"),
        ),
    },
    {
        path: "/order/*",
        exact: false,
        component: lazy(() =>
            import("../pages/Order/index"),
        ),
    },
    {
        path: "/wishlist/*",
        exact: false,
        component: lazy(() =>
            import("../pages/WishList"),
        ),
    },
    {
        path: "/category/:id/*",
        exact: false,
        component: lazy(() =>
            import("../pages/Category"),
        ),
    },
    // {
    //     path: "/subcategory/:id?/:manufacturer?/:page?/*",
    //     exact: false,
    //     component: lazy(() =>
    //         import("../pages/SubCategory"),
    //     ),
    // },
    {
        path: "/promotion/*",
        exact: false,
        component: lazy(() =>
            import("../pages/Promotions"),
        ),
    },
    {
        path: "/section/:id/*",
        component: lazy(() =>
            import("../pages/Section"),
        ),
        routes: [
            {
                path: "/category/:id/*",
                exact: false,
                component: lazy(() =>
                    import("../pages/Category"),
                ),
            }
        ]
    },
    {
        path: "stores",
        exact: false,
        component: lazy(() =>
            import("../components/Stores"),
        ),
    },
    {
      path: "stores/:id/*",
      exact: false,
      component: lazy(() =>
        import("../pages/Shops"),
      ),
    },
    {
        path: "/subcategory/:id/*",
        exact: false,
        component: lazy(() =>
            import("../pages/SubCategory"),
        ),
    },

    {
        path: "/products_playlist/:id/*",
        exact: false,
        component: lazy(() =>
            import("../pages/ProductsPlaylist"),
        ),
    },
    {
        path: "/search/*",
        exact: false,
        component: lazy(() =>
            import("../pages/Search"),
        ),
    },
    {
        path: "/add/*",
        exact: false,
        component: lazy(() =>
            import("../components/Product/ReviewAdd"),
        ),
    },
    {
        path: "/cart/*",
        exact: false,
        component: lazy(() =>
            import("../pages/Cart"),
        ),
    },
    {
        path: "/reviews_articles/*",
        exact: false,
        component: lazy(() =>
            import("../pages/ReviewsArticles"),
        ),
    },
    {
        path: "/reviews_videos/*",
        exact: false,
        component: lazy(() =>
            import("../components/ReviewsArticles/Video"),
        ),
    },
];
