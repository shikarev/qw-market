import React from 'react';
import styles from './smallCard.module.scss';
import RatingStars from './../../RatingStars/index';
import {toTrueWordForm} from '../../../utils/toTrueWordForm';
import {numberWithSpaces} from '../../../utils/numberWithSpaces';
import classNames from 'classnames/bind';
import {IProductData} from '../../../types/Product';
import placeholder from '../../../assets/placeHolders/noImagePlaceholder.svg';
import {styled, useMediaQuery} from "@mui/material";
import CartButton from "../../Cart/CartButton";
import FavoritesButtonMini from "../FavoritesButton/FavoritesButtonMini";
import WishesButtonMini from "../WishesButton/WishesButtonMini";
const cx = classNames.bind(styles);

const MyCartButton = styled(CartButton)(() => ({
    root: {
        '& .app-counter-component, & .app-cart-button': {
            width: '100%',
            maxWidth: '18.258rem',
        }
    }
}))

function SmallCard(props: IProductData & {onOpenProduct?: (productId: string) => void}) {
    const discount = props.cost < props.oldCost ? 100 - 100 * (props.cost / props.oldCost) : null;
    const matches = useMediaQuery('(max-width:300px)');

    //const {data: modOptions} = useGetProductModOptionByProductIdQuery(props.id)

    function openProductHandler() {
        if (props.onOpenProduct) {
            props.onOpenProduct(props.id);
        }
    }

    /*const dispatch = useAppDispatch()

    useEffect(() => {
        if(modOptions && modOptions.length > 0) {
            dispatch(setModOptions(modOptions))
        }
    },[modOptions])*/

    return (
        <div className={cx('wrapper')}>
            {discount &&
            <div className={cx('discount')}>{`${discount.toFixed(0)} %`}</div>
            }

            <div className={cx('icons')}>
                {/*<Bookmark/>*/}
                {/*<FavoritesButton productId={props.id} inFavorite={props.in_favorite} mini />*/}
                <FavoritesButtonMini productId={props.id} inFavorite={props.inFavorite} />
                <WishesButtonMini productId={props.id} inWish={props.inWish} />
            </div>

            {/*<div className={cx('favorites')}>
                <FavoritesButton productId={props.id} />
            </div>*/}
            <div className={cx('media')} onClick={openProductHandler}
                 style={{backgroundImage: `url(${props.picturePath || placeholder})`}}>
                {props.points > 0 &&
                <p className={cx('bonus')}>{`${props.points} баллов`}</p>
                }
            </div>
            <p className={cx('name')} onClick={openProductHandler}>{props.name}</p>
            <div className={cx('prices')}>
                <p className={cx('price')}>{`${numberWithSpaces(props.cost || 0)} ₽`}</p>
                {props.oldCost > 0 &&
                <p className={cx(props.oldCost === 0 ? 'oldprice_hide':'oldprice')}>{`${numberWithSpaces(props.oldCost)} ₽`}</p>
                }
            </div>
            <RatingStars num={props.rating || 0} readOnly />
            <p className={cx('feedback')}>{toTrueWordForm(props.feedbackCount || 0, ['отзыв', 'отзыва', 'отзывов'])}</p>

            {/*<div style={{minHeight: '4.8rem', color: 'gray', fontSize: '1.4rem'}}>
                {modOptions && modOptions.slice(0, 2).map((data: any) =>
                    <div className={cx('mod')} key={data.id}>
                        <span className={cx('mod_title')}>{data.name}</span>
                        {data.values && data.values.map((data:any) =>
                            <span className={cx('color_mod')} style={{background: `#${data.description}`}} key={data.id}/>
                        )}
                    </div>
                )}
            </div>*/}

            <MyCartButton productId={props.id} priceId={props.priceId} style={{margin: '1rem 0'}} size={matches ? 'small' : 'large'}>{props.priceId? 'В корзину': 'Нет в наличии'}</MyCartButton>
        </div>
    );
}

export default SmallCard;
