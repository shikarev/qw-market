import classNames from "classnames/bind";
import { useMatch } from 'react-router-dom';
import styles from "../ProductsPlaylist/styles.module.scss";
// import promotionImage from "../../assets/UI/promotionImage.svg";
import SmallCard from "../../components/Product/SmallCard";
import Collections from "../../components/Header/Collection/index";
import IconButton from "@mui/material/IconButton";
import heartButton from "../../assets/Icons/outlined/heart.svg"
import closeButton from "../../assets/Icons/outlined/Close X.svg"

import {useGetPlaylistProductsQuery} from "../../api/playlistProducts";
import { Typography } from '@mui/material';

const cx = classNames.bind(styles)

const ProductsPlaylist = () => {

    const match = useMatch('/product_playlist/:id')
    const { data, error, isLoading } = useGetPlaylistProductsQuery(match?.params?.id, {skip: !match?.params.id});

    const productTestValue = [
        {
            product_id: '1',
            picture_path: `${process.env.PUBLIC_URL}/images/products/iphone_12.png`,
            bonuses: 123,
            name: 'Iphone 12 Mini',
            cost: 66000,
            old_cost: 70000,
            rating: 4.2,
            feedback_count: 123
        },
        {
            product_id: '2',
            picture_path: `${process.env.PUBLIC_URL}/images/products/iphone_12.png`,
            bonuses: 123,
            name: 'Iphone 12 Mini',
            cost: 66000,
            old_cost: 70000,
            rating: 4.2,
            feedback_count: 123
        },
        {
            product_id: '3',
            picture_path: `${process.env.PUBLIC_URL}/images/products/iphone_12.png`,
            bonuses: 123,
            name: 'Iphone 12 Mini',
            cost: 66000,
            old_cost: 70000,
            rating: 4.2,
            feedback_count: 123
        },
        {
            product_id: '4',
            picture_path: `${process.env.PUBLIC_URL}/images/products/iphone_12.png`,
            bonuses: 123,
            name: 'Iphone 12 Mini',
            cost: 66000,
            old_cost: 7000,
            rating: 4.2,
            feedback_count: 123
        },
        {
            product_id: '5',
            picture_path: `${process.env.PUBLIC_URL}/images/products/iphone_12.png`,
            bonuses: 123,
            name: 'Iphone 12 Mini',
            cost: 66000,
            old_cost: 70000,
            rating: 4.2,
            feedback_count: 123
        },
        {
            product_id: '6',
            picture_path: `${process.env.PUBLIC_URL}/images/products/iphone_12.png`,
            bonuses: 123,
            name: 'Iphone 12 Mini',
            cost: 66000,
            old_cost: 70000,
            rating: 4.2,
            feedback_count: 123
        },
        {
            product_id: '7',
            picture_path: `${process.env.PUBLIC_URL}/images/products/iphone_12.png`,
            bonuses: 123,
            name: 'Iphone 12 Mini',
            cost: 66000,
            old_cost: 70000,
            rating: 4.2,
            feedback_count: 123
        },
        {
            product_id: '8',
            picture_path: `${process.env.PUBLIC_URL}/images/products/iphone_12.png`,
            bonuses: 123,
            name: 'Iphone 12 Mini',
            cost: 66000,
            old_cost: 70000,
            rating: 4.2,
            feedback_count: 123
        },
        {
            product_id: '9',
            picture_path: `${process.env.PUBLIC_URL}/images/products/iphone_12.png`,
            bonuses: 123,
            name: 'Iphone 12 Mini',
            cost: 66000,
            old_cost: 70000,
            rating: 4.2,
            feedback_count: 123
        },
        {
            product_id: '10',
            picture_path: `${process.env.PUBLIC_URL}/images/products/iphone_12.png`,
            bonuses: 123,
            name: 'Iphone 12 Mini',
            cost: 66000,
            old_cost: 70000,
            rating: 4.2,
            feedback_count: 123
        },
    ]


    return (
        <div className={cx('wrapper')}>
            <div className={cx('slider')}>
                <div className={cx('icons')}>
                    <div><IconButton><img className={cx('icon')} src={closeButton} title="cancel" alt=""/></IconButton></div>
                    <div><IconButton><img className={cx('icon')} src={heartButton} title="like" alt=""/></IconButton></div>
                </div>

                <div className={cx('imageBlock')}><img /*src={promotionImage}*/ alt="" className={cx('image')}/></div>
                <div className={cx('imageInfo')}>
                    <Typography variant="h1" className={cx('imageInfoTitle')}>Топ 10 новых товаров для гейминга</Typography>
                    <Typography className={cx('imageInfoDescription')}>Качественные девайсы, помогут добиться успеха во всех играх</Typography>
                </div>
            </div>
            <div className={cx('main')}>
                <div className={cx('products')}>
                    {productTestValue.map(item => <SmallCard  name={item.name} rating={item.rating} feedbackCount={item.feedback_count}
                                                             cost={item.cost} oldCost={item.old_cost} picturePath={item.picture_path}
                                                             id={item.product_id} points={200} priceId={''}/>)}
                </div>
            </div>
            <Typography className={cx('otherPlaylists')}>Другие плейлисты для вас</Typography>
            <div className={cx('collections')}><Collections/></div>
        </div>
    )
}

export default ProductsPlaylist
