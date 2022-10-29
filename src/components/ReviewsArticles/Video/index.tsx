import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import BreadCrumbs from '../../common/BreadCrumbs';
import { toTrueWordForm } from '../../../utils/toTrueWordForm';
import ReviewPreviews from '../ReviewPreviews';
import { IReviewsArticles } from '../../../types/ReviewsArticles';
import { useGetReviewsArticlesListQuery } from '../../../api/reviewsArticles';

const Video = () => {

  const { data } = useGetReviewsArticlesListQuery();

  return (
    <Box sx={{pb: '13rem'}}>
      <Box>
        <BreadCrumbs/>
      </Box>

      <Box sx={{pb: '4rem'}}>
        <Typography variant="h1">Видео обзоры</Typography>
        <Typography variant="h6" sx={{fontSize: '1.6rem', fontWeight: 500, color: 'text.secondary'}}>{toTrueWordForm(data?.total, ['обзор', 'обзора', 'обзоров'])}</Typography>
      </Box>

      <Grid container sx={{pb: '6rem'}}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <ReviewPreviews {...data?.data[0]} large />
        </Grid>
      </Grid>

      <Grid container spacing={7} sx={{pb: '8rem'}}>
        {data?.data.map((item: IReviewsArticles) =>
          <Grid key={item.id} item xs={12} sm={6} md={6} lg={4}>
            <ReviewPreviews {...item} />
          </Grid>).slice(1)
        }
      </Grid>
    </Box>
  );
};

export default Video;
