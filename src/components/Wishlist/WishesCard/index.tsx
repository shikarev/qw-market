import React, {useState} from 'react';
import styles from './WishesCard.module.scss';
import Button from '@mui/material/Button';
import SvgIcon from '@mui/material/SvgIcon';
import RatingStars from './../../RatingStars/index';
import {toTrueWordForm} from '../../../utils/toTrueWordForm';
import {numberWithSpaces} from '../../../utils/numberWithSpaces';
import classNames from 'classnames/bind';
import placeholder from '../../../assets/placeHolders/noImagePlaceholder.svg';
import { Typography, useMediaQuery } from '@mui/material';
import {FavoritesFilled} from "../../svgComponents/Icons/filled";

const cx = classNames.bind(styles);

export interface IFavoritesData {
    id: string;
    quantity?: number;
    status?: string;
    product: {
        id?: string;
        name?: string;
        vendorId?: string;
        cost?: number;
        oldCost?: number;
        points?: number;
        rating?: number;
        feedbackCount?: number;
        picturePath:string;
    }
}

interface IFavorites extends IFavoritesData {
    handleDelete: (wishId: string, productId?: string) => void;
    handleIcon?: React.FunctionComponent;
}

function WishesCard(props:IFavorites) {
    const matches = useMediaQuery('(max-width:600px)');
    const [inactive, setInactive] = useState(false);
    const { product } = props;
    const discount = (product.cost && product.oldCost) ? product.cost < product.oldCost ? 100 - 100 * (product.cost / product.oldCost) : null : null;

    function handleClick (event:React.MouseEvent){
        event.stopPropagation();
        setInactive(true);
        if(props.id) {
            props.handleDelete(props.id, props.product.id);
        }
    }

    return (
        <div className={cx('wrapper', inactive? 'inactive':'')}>
            <div className={cx('icons')}>
                <div onClick={(event) => handleClick(event)}>
                    <SvgIcon className={cx('icon')} component={props.handleIcon || FavoritesFilled}/>
                </div>
            </div>
            {discount &&
            <div className={cx('discount')}>{`${discount.toFixed(0)} %`}</div>
            }
            <div className={cx('media')}
                 style={{backgroundImage: `url(${product.picturePath || placeholder})`}}>
                {product.points &&
                <Typography className={cx('bonus')}>{`${product.points} баллов`}</Typography>
                }
            </div>
            <Typography className={cx('name')}>{product.name}</Typography>
            <div className={cx('prices')}>
                <Typography className={cx('price')}>{`${numberWithSpaces(product.cost || 0)} ₽`}</Typography>
                {product.oldCost &&
                <Typography className={cx('oldprice')}>{`${numberWithSpaces(product.oldCost)} ₽`}</Typography>
                }
            </div>
            <RatingStars num={product.rating || 0} readOnly/>
            <Typography className={cx('feedback')}>{toTrueWordForm(product.feedbackCount || 0, ['отзыв', 'отзыва', 'отзывов'])}</Typography>
            <Button style={{margin: '1rem 0'}} size={matches ? 'small' : 'large'} variant="contained" color="primary">Открыть</Button>
        </div>
    );
}

export default WishesCard;