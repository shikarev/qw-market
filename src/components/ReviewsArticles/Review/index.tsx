import React from 'react';
import { Box, Typography } from '@mui/material';
import BreadCrumbs from '../../common/BreadCrumbs';
import { useMatch } from 'react-router-dom';
import { useGetReviewQuery } from '../../../api/reviewsArticles';
import { imageOnErrorHandler } from '../../../utils/imgError';
import Media from '../ReviewPreviews/Media';

const Review = () => {

  const match = useMatch('/reviews_articles/:id')

  const {data} = useGetReviewQuery({ id: match?.params.id })

  return (
    <Box sx={{pb: '13rem'}}>
      <Box>
        <BreadCrumbs />
      </Box>

      <Box sx={{pb: '4rem'}}>
        <Typography variant="h1" sx={{pb: '1.6rem'}}>{data?.description}</Typography>

        <Box sx={{display: 'flex', pb: '3.5rem'}}>
          <Box
            component="img"
            src={`${data?.authorPicturePath}`}
            alt=""
            onError={imageOnErrorHandler}
            sx={{
              objectFit: 'cover',
              objectPosition: 'center',
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              mr: '0.8rem',
              backgroundColor: 'white'
            }}
          />
          <Typography sx={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', width: {xs: '12rem'} }}>
            {data?.authorName}
          </Typography>
        </Box>

        <Box
          sx={{
            overflow: 'hidden',
            borderRadius: '2.4rem',
            height: '48rem',
            background: '#EAEEF9',
            minWidth: '26rem',
          }}
        >
          <Media
            media={data?.image}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Review;
