import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import * as React from 'react';

export function NoMatch() {
  return (
    <Box
      sx={{
        minHeight: '40rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Typography variant="h2">Здесь ничего нет!</Typography>
      <Typography sx={{'& a': {textDecoration: 'none'}}}>
        <Link to="/">Вернуться на главную страницу</Link>
      </Typography>
    </Box>
  );
}
