import React, {SyntheticEvent, useState} from "react";
import {useAddWishMutation, useDeleteWishesByproductIdMutation} from "../../../../api/wishlists";
import {CircularProgress, Fab} from "@mui/material";
import {WishesOutline} from "../../../svgComponents/Icons/outlined";
import {ReactComponent as WishesFilled} from "../../../../assets/Icons/filled/wishes-filled.svg?svgr";
import {useAppDispatch} from "../../../../store/hooks";
import {deleteWish} from "../../../../store/wishlist";

const WishesButtonMini = ({productId, inWish, wishId}:{productId?: string, wishId?: string, inWish?: number}) => {

    const dispatch = useAppDispatch();

    const [inWishes, setInWishes] = useState(!!inWish)
    const [deleteWishByProduct, {isLoading: deleteLoading}] = useDeleteWishesByproductIdMutation()
    const [addWish, {isLoading: addLoading}] = useAddWishMutation()

    function handleDeleteWish(e:SyntheticEvent) {
        e.stopPropagation();
        if(!!wishId){
            dispatch(deleteWish({wishId: wishId, productId: productId})).then((r:any) => {
                if ('error' in r) {
                    // handle error
                } else {
                    setInWishes(false);
                }
            })
        } else if(!!productId){
            deleteWishByProduct(productId).then((r: any) => {
                if ('error' in r) {
                    // handle error
                } else {
                    setInWishes(false);
                }
            })
        }
    }

    function handleAddWish(e:SyntheticEvent) {
        e.stopPropagation();
        if(!!productId) {
            addWish(productId).then((r: any) => {
                if ('error' in r) {
                    // handle error
                } else {
                    setInWishes(true);
                }
            })
        }
    }

    return (
        <Fab size='small' sx={{'svg': {width: '1.6rem', height: '1.6rem', color: 'primary.main'}, zIndex: 10}}
             disabled={addLoading || deleteLoading}
             onClick={(e) => inWishes ? handleDeleteWish(e) : handleAddWish(e)}>
            {addLoading || deleteLoading
                ? <CircularProgress size={16}/>
                : inWishes
                    ? <WishesFilled />
                    : <WishesOutline/>}
        </Fab>
    )
}

export default WishesButtonMini;
