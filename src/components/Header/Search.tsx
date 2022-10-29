import { TextField } from '@mui/material';
import React from 'react';
import ProductSearch from '../Product/ProductSearch';

const Search = () => {

  return (
    <ProductSearch renderInput={(params) => (
      <TextField
        sx={{ width: '90%' }}
        InputProps={{
          ...params.InputProps, sx: {
            height: '7.5rem',
            '& fieldset': { border: 'solid 2px #F6F7FB' }, outline: 'none', fontSize: 24, backgroundColor: '#FFFFFF33',
          }
        }}
        placeholder={'Что вы хотите найти?'} type="search" />
    )} largeSize />
  )
};

export default Search;
