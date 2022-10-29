import { Typography } from '@mui/material';
import classNames from 'classnames/bind';
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useGetWishesQuery } from '../../api/wishlists';
import BreadCrumbs from '../../components/common/BreadCrumbs';
import { WishesFilled } from '../../components/svgComponents/Icons/filled';
import WishesGrid from '../../components/Wishlist/WishesGrid';
import styles from './Wishlist.module.scss';

const QUERY_LIMIT = 12;
const cx = classNames.bind(styles);

function Wishlist() {

  const navigate = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams()
  const [page, setPage] = useState(searchParams.get('page') ?? '1')
  const { data: wishes, isLoading: wishesLoading, error } = useGetWishesQuery({ page, limit: QUERY_LIMIT.toString() });

  function handlePagination(num: number) {
    // setSearchParams(`page=${num}`)
    setPage(num.toString())
  }

  useEffect(() => {
    //check current page num
    if(parseInt(page) > wishes?.pageCount ){
      handlePagination(wishes.pageCount)
    }
  },[wishes])

  useEffect(() => {
    if(error && page !== '1'){
      handlePagination(1)
    }
  }, [error])

  function handleClick(id?: string) {
    if (!id) {
      return null;
    }
    navigate(`/product/${id}`);
  }

  return (
    <div className={cx('wrapper')}>
      <BreadCrumbs links={[ { url: '', name: 'Список желаний' } ]} />
      {wishes?.data?.length ?
        <Typography variant="h1">Желаемое</Typography> :
        <Typography variant="h1">{!wishesLoading && 'В желаемом пока у вас ничего нет'}</Typography>
      }
      {/* FAVORITE PRODUCTS */}
      <div className={cx('content')}>
        {wishes &&
          <WishesGrid
            productsData={wishes.data}
            page={parseInt(page)}
            loading={wishesLoading}
            total={wishes?.total || 1}
            handleClick={handleClick}
            handlePagination={handlePagination}
            handleIcon={WishesFilled}
            limit={QUERY_LIMIT}
          />
        }
      </div>
    </div>
  );
}

export default Wishlist;
