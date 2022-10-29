import { Skeleton, Typography, Grid } from '@mui/material';
import classNames from 'classnames/bind';
import React from 'react';
import styles from './WishesGrid.module.scss';
import { ReactComponent as EmptyPlaceholder } from '../../../assets/placeHolders/emptyListPlaceholder.svg?svgr';
import { WishesOutline } from '../../svgComponents/Icons/outlined';

import QwPagination from '../../QwPagination';
import { ProductCard } from '@qwangy/styles';
import WishesButtonMini from '../../Product/WishesButton/WishesButtonMini';
import CartButton from '../../Cart/CartButton';
import { ProductCardProps } from '../../../types/Product';

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
  productsData: Array<ProductCardProps>;
  loading: boolean;
  total: number;
  page?: number;
  limit?: number;
  handleIcon?: React.FunctionComponent;
}

const EmptyPage = () => {
  return (
    <div className={cx('empty')}>
      <EmptyPlaceholder />
      <div className={cx('empty_description')}>
        <span>Нажимайте на кнопку:</span>
        <span><WishesOutline />В желаемое</span>
        <Typography> чтобы добавить</Typography>
      </div>
    </div>
  )
}

function WishesGrid({ productsData, loading, total, handlePagination, handleClick, page = 1, limit = 12 }:
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
          :
          (productsData && productsData.length > 0)
            ?
            <Grid container spacing={10}>
              {productsData.map((item) =>
                <Grid key={item.id} item>
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
                    WishesToggle={<WishesButtonMini wishId={item.id} productId={item.productId} inWish={item.inWish} />}
                    onClick={() => handleClick(item.productId)}
                    CartButton={<CartButton key={item.id + '_cart'} productId={item.id} priceId={item.priceId} />} />
                </Grid>)
              }
            </Grid>
            :
            <EmptyPage />
        }
      </div>
      <div className={cx('pagination')}>
        {total > limit ?
          <QwPagination color="primary" count={Math.ceil(total / limit)} page={page} onChange={handleChange} />
          : null}
      </div>
    </div>
  );
}

export default WishesGrid;
