import { Box, Grid, Skeleton, Typography } from '@mui/material';
import { ProductCard } from '@qwangy/styles';
import classNames from 'classnames/bind';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IProductData } from '../../../types/Product';
import FavoritesButtonMini from '../../Product/FavoritesButton/FavoritesButtonMini';
import WishesButtonMini from '../../Product/WishesButton/WishesButtonMini';
import QwPagination from '../../QwPagination';
import styles from './productGrid.module.scss';

const cx = classNames.bind(styles);

const ProductSkeleton = () => {
    return (
        <div className={cx('product')}>
            <Skeleton height={210} width={210} variant='rectangular' animation='wave'/>
            <br/>
            <Skeleton height={50} animation='wave' variant='rectangular'/>
            <br/><br/><br/><br/>
            <Skeleton height={50} animation='wave' variant='rectangular'/>
        </div>
    );
};

export interface ProductGridParams {
    handlePagination: (pageNumber: number) => void;
    productsData: Array<IProductData>;
    loading: boolean;
    total: number;
    page?: number;
    limit?: number;
}

function ProductGrid({productsData, loading, total, handlePagination, page = 1, limit = 12}: ProductGridParams) {

  const [pageNumber, setPageNumber] = React.useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        setPageNumber(page);
    }, [page]);

    function handleClick(id: string) {
      navigate(`/product/${id}`);
    }

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        handlePagination(value);
        setPageNumber(value);
    };

    return (
        <Box className={cx('wrapper')} sx={{minWidth: {xs: 'unset', xl: '96rem'}}}>
            <div className={cx('content')}>
                {(loading) ?
                    <Grid container spacing={4}>
                        {[...Array(12)].map((skeleton, index) =>
                            <Grid key={index} item xs={6} sm={6} md={6} lg={4} xl={3}>
                                <ProductSkeleton/>
                            </Grid>)}
                    </Grid>
                    :
                    (productsData?.length > 0)
                        ?
                        <Grid container spacing={10} justifyContent="flex-start" direction="row" >
                            {productsData.map((product) =>
                                <Grid key={product.id} item>
                                    <ProductCard
                                        id={product.id}
                                        name={product.name}
                                        cost={product.cost}
                                        oldCost={product.oldCost}
                                        picturePath={product.picturePath || ''}
                                        currencyName={product.currencyName}
                                        rating={product.rating}
                                        feedbackCount={product.feedbackCount || 0}
                                        points={product.points}
                                        inCart={product.inCart}
                                        inFavorite={product.inFavorite}
                                        FavoritesToggle={<FavoritesButtonMini productId={product.id}
                                                                              inFavorite={product.inFavorite}/>}
                                        WishesToggle={<WishesButtonMini productId={product.id}
                                                                        inWish={product.inWish}/>}
                                        // CartButton={<CartButton productId={product.id} priceId={product.price_id}/>}
                                        onClick={handleClick}
                                    />
                                </Grid>)
                            }
                        </Grid>
                        :

                        <Typography variant="h4" className={cx('empty')}>Товаров нет...</Typography>
                }
            </div>
            <hr/>
            <div className={cx('pagination')}>
                {total > limit ?
                    <QwPagination color='primary' count={Math.ceil(total / limit)} page={pageNumber}
                                  onChange={handleChange}/>
                    : null}
            </div>
        </Box>
    );
}

export default ProductGrid;
