import { Box, Typography } from '@mui/material';
import React from 'react';
import { ReactComponent as EmptyPic } from '../../../assets/placeHolders/emptyListPlaceholder.svg?svgr';

const Empty = () => {
  return (
    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <Typography variant="h5" sx={{m: '2rem'}}></Typography>
      <EmptyPic />
      <Typography variant="h5" sx={{mt: '2rem'}}>Акции не существует или произошла ошибка</Typography>
    </Box>
  );
};

export default Empty;
