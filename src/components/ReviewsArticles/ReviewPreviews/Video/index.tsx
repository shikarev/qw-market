import React from 'react';
import { imageOnErrorHandler } from '../../../../utils/imgError';
import { Box } from '@mui/material';

const Video = ({media}:{media: string[]}) => {
  return (
    <Box
      component="video"
      src={`${media}`}
      //alt=""
      //onError={imageOnErrorHandler}
      sx={{objectFit: 'cover', objectPosition: 'center', width: '100%', height: '100%'}}
    />
  );
};

export default Video;
