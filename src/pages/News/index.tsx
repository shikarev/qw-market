import { Box, Typography } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetNewsQuery } from '../../api/news';
import BreadCrumbs from '../../components/common/BreadCrumbs';
import Media from '../../components/ReviewsArticles/ReviewPreviews/Media';
import { CommentsIcon, FavoritesOutline, Heart, ShareArrow } from '../../components/svgComponents/Icons/outlined';
import { ViewIcon } from '../../components/svgComponents/Icons';

const News = () => {

  const {id} = useParams()

  const {data} = useGetNewsQuery(id)

  return (
    <Box sx={{pb: '13rem'}}>
      <Box>
        <BreadCrumbs />
      </Box>

      <Box sx={{pb: '4rem'}}>
        <Typography variant="h1" sx={{pb: '1.6rem'}}>{data?.description}</Typography>

        <Box
          sx={{
            overflow: 'hidden',
            borderRadius: '6.4rem',
            height: '48rem',
            background: '#EAEEF9',
            minWidth: '26rem',
            position: 'relative'
          }}
        >
          <Media
            media={data?.media?.[0]?.path}
          />

          <Box sx={{position: 'absolute', top: '3.2rem', left: '3.2rem', display: 'flex'}}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                background: '#FFFFFF',
                borderRadius: '50px',
                mr: '1.6rem',
              }}
            >
              <Typography sx={{p: '0.8rem 1.4rem'}}>
                Новости магазина
              </Typography>
            </Box>

            {data?.viewCount &&
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  background: '#FFFFFF',
                  borderRadius: '50px',
                  mr: '1.6rem',
                }}
              >
                <Typography sx={{p: '0.8rem 1.4rem', '& svg':{mr: '1rem'}, display: 'flex', alignItems: 'center', alignContent: 'center' }}>
                  <ViewIcon /> {data.viewCount}
                </Typography>
              </Box>
            }
          </Box>
        </Box>
      </Box>

      <Box sx={{height: '72px', backgroundColor: '#F6F7FB', borderRadius: '100px', p: '2.6rem'}}>
        <Box sx={{display: 'flex', alignItems: 'center', alignContent: 'center'}}>
          <Box sx={{'& svg':{mr: '1rem'}, mr: '5.2rem', display: 'flex', alignItems: 'center', alignContent: 'center', cursor: 'pointer'}}>
            <Heart /> {data?.likeCount}
          </Box>
          <Box sx={{'& svg':{mr: '1rem'}, mr: '5.2rem', display: 'flex', alignItems: 'center', alignContent: 'center', cursor: 'pointer'}}>
            <CommentsIcon /> {data?.commentsCount}
          </Box>
          <Box sx={{'& svg':{mr: '1rem'}, mr: '5.2rem', display: 'flex', alignItems: 'center', alignContent: 'center', cursor: 'pointer'}}>
            <FavoritesOutline />
          </Box>
          <Box sx={{'& svg':{color: '#EB4F5A', mr: '1rem', display: 'flex', alignItems: 'center', alignContent: 'center', cursor: 'pointer'}}}>
            <ShareArrow />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default News;
