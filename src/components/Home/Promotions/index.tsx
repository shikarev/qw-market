import { Grid, Typography } from '@mui/material';

import classNames from 'classnames/bind';
import React from 'react';
import { useGetActionsQuery } from '../../../api/promotion';
import Banner from '../../Promotion/Banner';
import GridBanner from '../../Promotion/GridBanner';
import styles from './Promotions.module.scss';

const cx = classNames.bind(styles);

const Promotions = () => {

  const { data: dataBanner, isFetching } = useGetActionsQuery({ page: '1', limit: '5' });

  return (
    <>{dataBanner &&
      <>
        <Typography variant="h1" className={cx('title')}>Акции и другие выгодные предложения</Typography>
        <Grid container spacing={6}>
          <Grid item className={cx('banner')}>
            <Banner square data={dataBanner} isFetching={isFetching} />
          </Grid>
          <Grid item className={cx('grid')}>
            <GridBanner square data={dataBanner} isFetching={isFetching} actions={dataBanner?.data ?? []} />
          </Grid>
        </Grid>
      </>
    }</>
  );
};

export default Promotions;
