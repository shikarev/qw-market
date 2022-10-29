import React from 'react';
import BreadCrumbs from '../common/BreadCrumbs';
import { Box, Typography } from '@mui/material';
import { BackArrow } from '../svgComponents/Icons';
import StoresGrid from './StoresGrid';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGetAllVendorsQuery } from '../../api/vendors';
import classNames from 'classnames/bind';
import styles from '../../pages/Shops/styles.module.scss';

const cx = classNames.bind(styles);

const Stores = () => {

  const location = useLocation();
  const navigate = useNavigate();

  let params = new URLSearchParams(location.search);

  const page = params.get("page") || '1';

  const {data: stores, isLoading, error} = useGetAllVendorsQuery({page: Number(page), limit: 24})

  function handlePagination(num: number){
    params.set('page', num.toString());
    navigate("?" + params.toString());
  }

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    handlePagination(value);
  };

  return (
    <Box className={cx('container')}>
      <Box className={cx('nav')}>
        <BreadCrumbs />
        <Box className={cx('section')}>
          <Typography className={cx('sectionName')}><BackArrow className={cx('backArrow')} />Магазины</Typography>
          <Typography className={cx('sectionSub')}>{isLoading ? 'Нет магазинов' : `${stores && stores.total } магазинов`}</Typography>
        </Box>
      </Box>
      <StoresGrid
        stores={stores}
        isLoading={isLoading}
        error={error}
        page={page}
        pagination={handleChange}
      />
    </Box>
  );
};

export default Stores;
