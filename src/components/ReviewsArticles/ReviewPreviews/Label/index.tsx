import React from 'react';
import { Box, Typography } from '@mui/material';

const Label = ({title}:{title: string}) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: '1.6rem',
        left: '1.6rem',
        display: 'flex',
        alignItems: 'center',
        background: '#FFFFFF',
        borderRadius: '50px',
      }}
    >
      <Typography sx={{p: '0.8rem 1.4rem'}}>
        {title}
      </Typography>
    </Box>
  );
};

export default Label;
