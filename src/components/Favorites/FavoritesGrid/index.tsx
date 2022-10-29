import { Grid, Skeleton } from '@mui/material';
import { ProductCard } from '@qwangy/styles';
import classNames from 'classnames/bind';
import React from 'react';
import emptyPlaceholder from '../../../assets/placeHolders/emptyListPlaceholder.svg';
import { IFavoriteProduct } from '../../../types/Favorites';
import CartButton from '../../Cart/CartButton';
import FavoritesButtonMini from '../../Product/FavoritesButton/FavoritesButtonMini';
import QwPagination from '../../QwPagination';
//import {Bookmark, Favorites} from "../../svgComponents/Icons/outlined";
import { FavoritesOutline } from '../../svgComponents/Icons/outlined';
import styles from './FavoritesGrid.module.scss';

const cx = classNames.bind(styles)

const ProductSkeleton = () => {
  return (
    <div className={cx('product')}>
      <Skeleton height={210} width={210} variant="rectangular" animation="wave" />
      <br />
      <Skeleton height={50} animation="wave" variant="rectangular" />
      <br /><br /><br /><br />
      <Skeleton height={50} animation="wave" variant="rectangular" />
    </div>
  )
}

export interface ProductGridParams {
  handlePagination: (pageNumber: number) => void;
  handleClick: (id?: string) => void;
  productsData: Array<IFavoriteProduct>
  loading: boolean;
  total: number;
  page?: number;
  limit?: number;
}

const EmptyPage = () => {
  return (
    <div className={cx('empty')}>
      <img src={emptyPlaceholder} />
      <div className={cx('empty_description')}>
        <span>Нажимайте на кнопку:</span>
        <span><FavoritesOutline />В избранное</span>
        <p> чтобы добавить</p>
      </div>

    </div>
  )
}

function FavoritesGrid({ productsData, loading, total, handlePagination, handleClick, page = 1, limit = 12 }:
                         ProductGridParams) {

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    handlePagination(value);
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('content')}>
        {(loading) ?
          <Grid container spacing={4}>
            {[ ...Array(4) ].map((skeleton, index) =>
              <Grid key={index} item sm={4} md={3} xs={6} lg={2} xl={2}>
                <ProductSkeleton />
              </Grid>)}
          </Grid>
          : productsData?.length
            ? <Grid container spacing={10} justifyContent="flex-start" direction="row">
              {productsData.map(({id, product: item}) =>
                <Grid key={id} item>
                  <ProductCard
                    id={item.id}
                    name={item.name}
                    cost={item.cost}
                    priceId={item.priceId}
                    oldCost={item.oldCost}
                    points={item.points}
                    rating={item.rating}
                    feedbackCount={item.feedbackCount}
                    picturePath={item.picturePath}
                    currencyId={item.currencyId}
                    currencyName={item.currencyName}
                    inCart={item.inCart}
                    inFavorite={item.inFavorite}
                    inWish={item.inWish}
                    FavoritesToggle={<FavoritesButtonMini favoriteId={id} productId={item.id}
                                                          inFavorite={item.inFavorite} />}
                    onClick={() => handleClick(item.id)}
                    CartButton={<CartButton key={item.id + '_cart'} productId={item.id} priceId={item.priceId} />} />
                </Grid>)}
            </Grid>
            : <EmptyPage />
        }
      </div>
      <div className={cx('pagination')}>
        {total > limit ?
          <QwPagination count={Math.ceil(total / limit)} page={page} onChange={handleChange} />
          : null}
      </div>
    </div>
  );
}

export default FavoritesGrid;
