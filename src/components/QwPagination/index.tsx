import React from 'react';
import {Pagination as MuiPagination, styled} from '@mui/material';

const QPagination = styled(MuiPagination)(() => ({
  borderRadius: '1.5rem',
  padding: '1.4rem 0.65rem',

  '& .MuiPaginationItem-root': {
    backgroundColor: 'rgba(235, 79, 90, 0.1)',
    height: '3.6rem',
    minWidth: '3.6rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  '& .MuiPaginationItem-ellipsis': {
    background: 'transparent',
  },

  '& li:first-of-type button': {
    backgroundColor: 'white',
  },
  '& li:last-of-type button': {
    backgroundColor: 'white',
  },
  '& .MuiPaginationItem-textPrimary': {
    //backgroundColor: 'rgba(235, 79, 90, 0.1)',
    fontSize: '1.6rem',
    fontWeight: '600',
  },
  '& .Mui-selected': {
    backgroundColor: '#EB4F5A',
  },

  '& .MuiPaginationItem-page:hover': {
    backgroundColor: '#ff545f',
    color: 'white',
  },
  '& .MuiPaginationItem-icon': {
    width: '2.4rem',
    height: '2.4rem'
  }
}))

const QwPagination = (props:any) => {

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    window.scrollTo(0, 0);
    if(props.onChange) {
      props.onChange(event, value)
    }
  }

  return (
    <QPagination color="primary" count={props.count} page={props.page} onChange={handleChange} />
  );
};

export default QwPagination;
