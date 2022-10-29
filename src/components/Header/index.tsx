import React from 'react';
import Collections from './Collection';
import styles from './styles.module.scss';
import User from './User';
import { Box } from '@mui/material';

const Header = () => {

  //const { data: wishesData } = useGetWishesQuery({ page: 1, limit: 3 }, { skip: !isAuth });

  return (
    <Box className={styles.header}>
      <Box className={styles.header_bg} />
      <User />
      <Box className={styles.collections}>
        <Collections />
      </Box>
    </Box>
  )
}

export default Header;
