import { Typography } from '@mui/material';
import classNames from 'classnames/bind';
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useGetFavoritesQuery } from '../../api/favorites';
import BreadCrumbs from '../../components/common/BreadCrumbs';
import FavoritesGrid from '../../components/Favorites/FavoritesGrid';
import styles from './favorites.module.scss';

const QUERY_LIMIT = 12;
const cx = classNames.bind(styles);

function Favorites() {
  const navigate = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams()
  const [page, setPage] = useState(searchParams.get('page') ?? '1')

    const {data: favorites, isLoading: favoritesLoading, error} = useGetFavoritesQuery({page, limit: QUERY_LIMIT.toString(), status: 'active'}, {skip: !page});

    function handlePagination(num: number) {
      // setSearchParams(`page=${num}`) this make back loop if total pages were decremented
      setPage(`${num}`)
    }

    useEffect(() => {
      //check current page num
      if(parseInt(page) > favorites?.pageCount ){
        handlePagination(favorites.pageCount)
      }
    },[favorites])

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
            <BreadCrumbs links={[{url: '', name: 'Избранное'}]}/>
            {favorites?.data?.length
              ? <Typography variant="h1">Избранное</Typography>
              : <Typography variant="h1">{!favoritesLoading && 'В избранном пока у вас ничего нет'}</Typography>
            }
            {/* FAVORITE PRODUCTS */}
            <div className={cx('content')}>
                {favorites?.data &&
                <FavoritesGrid productsData={favorites.data}
                               page={parseInt(page)}
                               loading={favoritesLoading}
                               total={favorites?.total || 1}
                               handleClick={handleClick}
                               handlePagination={handlePagination}
                               limit={QUERY_LIMIT}/>
                }
            </div>
        </div>
    );
}

export default Favorites;
