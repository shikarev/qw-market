import {useGetProductWishesStatusQuery} from "../../../../api/product";
import {useAppDispatch} from "../../../../store/hooks";
import {favoritesAPI} from "../../../../api/favorites";
import React, {useEffect} from "react";
import {WishesOutline} from "../../../svgComponents/Icons/outlined";
import WishesIconLink from "./WishesIconLink";
import {useLazyGetUserActivityQuery} from "../../../../api/user";
import {useAddWishMutation, useDeleteWishesByproductIdMutation} from "../../../../api/wishlists";

const WishesButtonDefault = ({productId}:{productId: string}) => {

    const {
        data: productWishes,
        refetch: productWishesRefetch,
    } = useGetProductWishesStatusQuery(productId, {skip: !productId});

    const [trigger, {data: userActivityData}] = useLazyGetUserActivityQuery();

    const dispatch = useAppDispatch();
    const [deleteWish] = useDeleteWishesByproductIdMutation()
    const [addWish] = useAddWishMutation()

    const AddDelFavorites = (id: string, e:React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        if(productWishes.is_added === 1) {
            deleteWish(id)
                .then(() => {
                        productWishesRefetch()
                        trigger()
                    }
                )
        } else if (productWishes.is_added === 0) {
            addWish(productId)
                .then(() => {
                        productWishesRefetch()
                        trigger()
                    }
                )
        }
    }

    useEffect(() => {
        productWishesRefetch()
    }, [])

    return (
        <>
            {productWishes ?
                <WishesIconLink
                    icon={WishesOutline}
                    text={productWishes.is_added === 1 ? 'В желаемом' : 'В желаемое'}
                    active={productWishes.is_added === 1}
                    callback={(e) => AddDelFavorites(productId, e)}
                />
                :
                <WishesIconLink
                    icon={WishesOutline}
                    text="В желаемое"
                />
            }
        </>
    )
}

export default WishesButtonDefault;
