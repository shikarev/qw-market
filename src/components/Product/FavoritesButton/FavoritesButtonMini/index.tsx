import React, {SyntheticEvent, useState} from "react";
import {CircularProgress, Fab} from "@mui/material";
import {ReactComponent as FavoritesFilled} from "../../../../assets/Icons/filled/favorites-filled.svg?svgr";
import {ReactComponent as FavoriteIcon} from "../../../../assets/Icons/outlined/favorites-icon.svg?svgr";
import {useAddFavoriteMutation, useDeleteFavoriteByproductIdMutation} from "../../../../api/favorites";
import {useAppDispatch} from "../../../../store/hooks";
import {deleteFavorite} from "../../../../store/wishlist";

const FavoritesButtonMini = ({productId, inFavorite, favoriteId}: {favoriteId?: string, productId?: string, inFavorite?: number }) => {
    const dispatch = useAppDispatch();
    const [inFavorites, setInFavorites] = useState(!!inFavorite)
    const [favoriteAdd, {isLoading: addLoading}] = useAddFavoriteMutation();
    const [favoriteDelete, {isLoading: deleteLoading}] = useDeleteFavoriteByproductIdMutation();

    function handleDeleteFavorite(e:SyntheticEvent) {
        e.stopPropagation();
        if(!!favoriteId) {
            dispatch(deleteFavorite({favoriteId: favoriteId, productId: productId}))
                .then((r: any) => {
                    if ('error' in r) {
                        // handle error
                    } else {
                        setInFavorites(false);
                    }
                })
        } else if(!!productId){
            favoriteDelete(productId).then((r: any) => {
                if ('error' in r) {
                    // handle error
                } else {
                    setInFavorites(false);
                }
            })
        }
    }

    function handleAddFavorite(e:SyntheticEvent) {
        e.stopPropagation();
        if(!!productId) {
            favoriteAdd(productId).then((r: any) => {
                if ('error' in r) {
                    // handle error
                } else {
                    setInFavorites(true);
                }
            })
        }
    }

    return (
        <Fab size='small' sx={{'svg': {width: '1.6rem', height: '1.6rem', color: 'primary.main'}, zIndex: 10}}
             disabled={addLoading || deleteLoading}
             onClick={(e) => inFavorites
                 ? handleDeleteFavorite(e)
                 : handleAddFavorite(e)}
        >
            {(addLoading || deleteLoading)
                ? <CircularProgress size={16}/>
                : inFavorites
                    ? <FavoritesFilled/>
                    : <FavoriteIcon/>}
        </Fab>
    )
}

export default FavoritesButtonMini;
