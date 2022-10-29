import React from 'react';
import { Box, IconButton } from '@mui/material';
import { IReviewsArticles } from '../../../types/ReviewsArticles';
import Label from './Label';
import Title from './Title';
import Media from './Media';
import { useNavigate } from 'react-router-dom';
import { PlayButton } from '../../svgComponents/Icons';

interface ReviewPreviews extends IReviewsArticles {
  large?: boolean,
  video?: boolean,
}

const ReviewPreviews = (props: ReviewPreviews) => {

  const navigate = useNavigate();

  function handleClick (id?: string) {
    navigate('/reviews_articles/' + id)
  }

  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '2.4rem',
        height: props.large ? '48rem' : '31rem',
        background: '#EAEEF9',
        minWidth: '26rem',
        cursor: 'pointer',
      }}
      key={props.id}
      onClick={() => handleClick(props.id)}
    >
      {!props.video &&
        <Label
          title="Обзор"
        />
      }

      {props.video &&
        <IconButton sx={{position: 'absolute', top: '35%', left: '50%', transform: 'translate(-50%, -35%)'}}>
          <PlayButton />
        </IconButton>
      }

      <Media
        media={props.image}
      />

      <Title
        authorName={props.authorName}
        authorPicturePath={props.authorPicturePath}
        description={props.description}
        viewCount={props.viewCount}
        large={props.large}
      />

    </Box>
  );
};

export default ReviewPreviews;
