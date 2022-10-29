import React from 'react';
import { Box, Typography } from '@mui/material';
import { imageOnErrorHandler } from '../../../../utils/imgError';
import { ViewIcon } from '../../../svgComponents/Icons';
import { abbreviateNumber } from '../../../Product/OrderDetails';

interface IReviewsPreviewsTitle {
  description: string,
  authorPicturePath: string,
  authorName: string,
  viewCount: number,
  large?: boolean,
}

const Title = (props:IReviewsPreviewsTitle) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        width: '100%',
        borderRadius: '2.4rem 2.4rem 0 0',
        background: 'linear-gradient(180deg, #FFFFFF 7.5%, rgb(255 255 255 / 45%) 133%)',
        bottom: 0,
        left: 0,
        height: '11rem',
        overflow: 'hidden',
        padding: '1.2rem 1.6rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Typography
        sx={{
          fontWeight: 700,
          overflow: 'hidden',
          WebkitLineClamp: '2',
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          maxWidth: props.large && '80rem',
        }}
        variant="h4"
      >
        {props.description}
      </Typography>

      <Box sx={{display: 'flex', justifyContent: props.large ? 'flex-start' : 'space-between'}}>
        <Box sx={{display: 'flex'}}>
          <Box
            component="img"
            src={`${props.authorPicturePath}`}
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
            {props.authorName}
          </Typography>
        </Box>

        {props.viewCount &&
          <Typography sx={{display: 'flex', '& svg':{mr: '0.8rem'}, color: 'text.secondary', fontWeight: 500 }}>
            <ViewIcon/> {abbreviateNumber(props.viewCount)}
          </Typography>
        }
      </Box>
    </Box>
  );
};

export default Title;
