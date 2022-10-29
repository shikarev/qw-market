import {useGetProductFavoritesStatusQuery} from "../../../../api/product";
import {useAppDispatch} from "../../../../store/hooks";
import {favoritesAPI, useDeleteFavoriteByproductIdMutation} from "../../../../api/favorites";
import React, {useEffect} from "react";
import {FavoritesOutline} from "../../../svgComponents/Icons/outlined";
import FavoritesIconLink from "./FavoritesIconLink";
import {useLazyGetUserActivityQuery} from "../../../../api/user";

const FavoritesButtonDefault = ({productId}:{productId: string}) => {

    const {
        data: productFavorites,
        refetch: productFavoritesRefetch,
    } = useGetProductFavoritesStatusQuery(productId, {skip: !productId});

    const [trigger, {data: userActivityData}] = useLazyGetUserActivityQuery();

    const dispatch = useAppDispatch();
    const [deleteFavorite] = useDeleteFavoriteByproductIdMutation()

    const AddDelFavorites = (id: string, e:React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        if(productFavorites.is_added === 1) {
            deleteFavorite(id)
                .then(() => {
                        productFavoritesRefetch()
                        trigger()
                    }
                )
        } else if (productFavorites.is_added === 0) {
            dispatch(favoritesAPI.endpoints.addFavorite.initiate(productId))
                .then(() => {
                        productFavoritesRefetch()
                        trigger()
                    }
                )
        }
    }

    useEffect(() => {
        productFavoritesRefetch()
    }, [])

    return (
        <>
            {productFavorites ?
                <FavoritesIconLink
                    icon={FavoritesOutline}
                    text={productFavorites.is_added === 1 ? 'В избранном' : 'В избранное'}
                    active={productFavorites.is_added === 1}
                    callback={(e) => AddDelFavorites(productId, e)}
                />
                :
                <FavoritesIconLink
                    icon={FavoritesOutline}
                    text="В избранное"
                />
            }
        </>
    )
}

export default FavoritesButtonDefault;
