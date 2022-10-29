import React from 'react';
import { Box, CircularProgress, Grid, Typography } from '@mui/material';
import BreadCrumbs from '../../common/BreadCrumbs';
import { toTrueWordForm } from '../../../utils/toTrueWordForm';
import ReviewPreviews from '../ReviewPreviews';
import { IReviewsArticles } from '../../../types/ReviewsArticles';
import QwSwiper from '../../QwSwiper';
import { SwiperSlide } from 'swiper/react';
import { useGetReviewsArticlesListQuery } from '../../../api/reviewsArticles';
import { useNavigate } from 'react-router-dom';

const ReviewsArticlesPage = () => {

  const { data, isLoading } = useGetReviewsArticlesListQuery();

  const navigate = useNavigate()

  function toReviewsVideos () {
    navigate('/reviews_videos/')
  }

  return (
    <>
      {isLoading ?
          <Box sx={{display: 'flex', justifyContent: 'center', minHeight: '400px', alignItems: 'center'}}>
            <CircularProgress size={40}/>
          </Box>
          :
          <Box sx={{pb: '13rem'}}>
            <Box>
              <BreadCrumbs/>
            </Box>

            <Box sx={{pb: '4rem'}}>
              <Typography variant="h1">Обзоры</Typography>
              <Typography variant="h6" sx={{fontSize: '1.6rem', fontWeight: 500, color: 'text.secondary'}}>{toTrueWordForm(data?.total, ['статья', 'статьи', 'статей'])}</Typography>
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

            <QwSwiper
              title="Видео"
              className="reviews-articles-swiper"
              slidesPerView={1}
              spaceBetween={34}
              slidesPerGroup={1}
              buttonCallback={toReviewsVideos}
              breakpoints={{
                "576": {
                  "slidesPerView": 1,
                  "spaceBetween": 16,
                  "slidesPerGroup": 1,
                },
                "768": {
                  "slidesPerView": 1,
                  "spaceBetween": 32,
                  "slidesPerGroup": 1,
                },
                "992": {
                  "slidesPerView": 2,
                  "spaceBetween": 32,
                  "slidesPerGroup": 2,
                },
                "1200": {
                  "slidesPerView": 2,
                  "spaceBetween": 40,
                  "slidesPerGroup": 2,
                },
                "1400": {
                  "slidesPerView": 2,
                  "spaceBetween": 40,
                  "slidesPerGroup": 2,
                }
              }}
            >
              {data?.data.map(item =>
                <SwiperSlide key={item.id}>
                  <ReviewPreviews {...item} video />
                </SwiperSlide>
              )}
            </QwSwiper>
          </Box>
      }
    </>
  );
};

export default ReviewsArticlesPage;
