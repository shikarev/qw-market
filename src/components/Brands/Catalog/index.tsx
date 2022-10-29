import { Skeleton, Typography } from '@mui/material';
import classNames from 'classnames/bind';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useSearchManufacturersQuery } from '../../../api/search';
import { clearBrands, getBrands, getBrandsLoading, setBrands } from '../../../store/brands';
import { useAppSelector } from '../../../store/hooks';
import { toTrueWordForm } from '../../../utils/toTrueWordForm';
import LetterSelector from '../LettersSelector';
import Table from '../Table';
import styles from './catalog.module.scss';

export const DEFAULT_LIMIT = 19;
export const MAX_LIMIT = 100;

const cx = classNames.bind(styles)

const BrandsCatalog = ({ category, brandId, catData, catFetching }: any) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let params = new URLSearchParams(location.search);
  const query = params.get('query')?.toLowerCase()[ 0 ];
  const categoryId = params.get('id') || undefined;
  const cashedBrands = useAppSelector(getBrands);
  const [ page, setPage ] = useState(1);
  const [ limit, setLimit ] = React.useState<number>(DEFAULT_LIMIT);
  const brandsLoading = useAppSelector(getBrandsLoading);
  const { isLoading, isFetching, error, data: brands } = useSearchManufacturersQuery({
    query,
    limit,
    page,
    categoryId: categoryId,
    status: 'active'
  })

  function setQuery(query: string) {
    params.set('query', query);
    dispatch(clearBrands());
    navigate(location.pathname + '?' + params.toString());
  }

  function checkFirstPage() {
    if (page === 1) {
      dispatch(clearBrands());
    }
  }

  function setNextPage() {
    setPage(page + 1);
  }

  function handleLimit(newLimit: number) {
    checkFirstPage();
    setLimit(newLimit);
  }

  const handleSelect = (event: React.MouseEvent<HTMLElement>, newQuery: string | null) => {
    //dispatch(setBrandsLoading(true));
    if (newQuery !== null) {
      setQuery(newQuery !== '0-9' ? newQuery : '#');
      setLimit(DEFAULT_LIMIT);
    }
  }

  useEffect(() => {
    if (brands) {
      dispatch(setBrands(brands.data));
    }
  }, [ brands, dispatch ])

  if (!query) {
    params.set('query', 'a');
    return <Navigate to={location.pathname + '?' + params.toString()} replace={true} />
  }

  return (
    <div>
      <nav>
        <h1 className={cx('title')}>{catData?.name ?? (catFetching ? '' : 'Все категории')}</h1>
      </nav>
      {isLoading ? <Skeleton width={100} /> :
        <span className={cx('counter')}>{`${brands && brands.total
          ?
          toTrueWordForm(brands.total, [ 'бренд', 'бренда', 'брендов' ])
          :
          '0 брендов'}`}
        </span>
      }
      <LetterSelector key="letter_selector" loading={brandsLoading} handleSelect={handleSelect} query={query}
                      setQuery={setQuery} setLimit={handleLimit} />
      {error ? <Typography className={cx('empty')}>ошибка</Typography> : brands ?
        <>
          <Typography variant="h1">
            {query === '#' ? '0-9' : query}
          </Typography>
          {(brands.data && brands.data.length > 0)
            ?
            <Table data={cashedBrands} totalCount={brands.total} page={page} query={query}
                   setLimit={handleLimit} limit={limit} setPage={setNextPage} />
            :
            <Typography className={cx('empty')}>Бренды не найдены</Typography>
          }
        </>
        :
        <Typography className={cx('empty')}>Бренды не найдены</Typography>
      }

    </div>
  );
}

export default BrandsCatalog;
