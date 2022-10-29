import classNames from 'classnames/bind';
import React, { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useGetProductsByVendorIdQuery } from '../../../api/vendors';
import { handleUrlParam } from '../../../utils/utils';
import ProductGrid from '../../common/ProductGrid';
import styles from './Products.module.scss';
import { Box } from '@mui/material';

const cx = classNames.bind(styles);

const Products = () => {

  const location = useLocation();
  let params = new URLSearchParams(location.search);
  const page = params.get("page") || '1';

  const [pagination, setPagination] = useState(page)

  function setPage (newPage: number){
    handleUrlParam('page', newPage.toString());
    setPagination(newPage.toString());
  }

  const {id} = useParams()

  const {data: products, isFetching, isLoading} = useGetProductsByVendorIdQuery({ id, page: parseInt(pagination)})

  return (
    <Box className={cx('wrapper')} sx={{p: 3}}>
      {products &&
        <ProductGrid
          loading={(isLoading || isFetching)}
          handlePagination={setPage}
          productsData={products.data}
          total={products.total}
          page={parseInt(page)}
        />
      }
    </Box>
  );
};

export default Products;
