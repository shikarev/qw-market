import { Box, CircularProgress } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetPromotionQuery } from '../../api/promotion';
import BreadCrumbs from '../../components/common/BreadCrumbs';
import Empty from '../../components/Promotion/Empty';
import Products from '../../components/Promotion/Products';
import SingleBanner from '../../components/Promotion/SingleBanner';
import ProductFilter from '../../components/SubCategory/ProductFilter';
import styles from './Promotion.module.scss';

const Promotion = () => {
  const { id } = useParams();
  const {data, isLoading, isError} = useGetPromotionQuery(id)

  return (
    <div className={styles.root}>{isLoading
    ? <CircularProgress/>
    : isError
      ? <Empty/>
        : data &&
        <>
          <BreadCrumbs links={[{name: data.name, url: '/marketplace/promotion/' + id}]}/>
          <SingleBanner description={data.description} endDate={data.endDate} mediaSrc={data.image || data.video}/>
          <Box className={styles.products}>
            <ProductFilter categoryId={id}/>
            <Products id={id} />
          </Box>
        </>
    }
    </div>
  );
};

export default Promotion;
