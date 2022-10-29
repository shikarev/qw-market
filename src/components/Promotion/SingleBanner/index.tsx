import { Box, Link, Theme, Typography, useMediaQuery } from '@mui/material';
import clsx from 'clsx';
import moment from 'moment';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './SingleBanner.module.scss';

moment.locale('ru');

interface SingleBannerProps {
  description?: string
  endDate?: string
  mediaSrc?: string[]
}

const SingleBanner = ({ description, endDate, mediaSrc }: SingleBannerProps) => {
  const [ index, setIndex ] = useState(0);
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'))

  return (
    <Box className={styles.root} sx={{
      padding: { xs: 0, sm: '6rem 7rem' },
      backgroundColor: 'secondary.light',
      borderRadius: { xs: '3.2rem', sm: '6.4rem' },
      mt: {xs: 0, sm: '4rem'}
    }}>
      <Box className={clsx(styles.info, { [ styles.info_mobile ]: smDown })}
           sx={{ position: { xs: 'absolute', sm: 'relative' }, flex: { xs: '0 0 100%', sm: '0 0 50%' } }}>
        <Typography className={clsx(styles.date, { [ styles.date__mobile ]: smDown })}
                    sx={{ fontWeight: 500 }}>{`До ${endDate ? moment(endDate).format('D MMMM') : 'Бессрочно'}`}</Typography>
        <Typography className={styles.description}
                    sx={{ fontWeight: 700, fontSize: { xs: '2rem', sm: '3rem', md: '4rem' } }}
                    variant="h2">{description}</Typography>
        <NavLink to="#">
          <Typography color='primary' className={styles.link} sx={{ display: { xs: 'none', sm: 'block' } }}>
            Полные условия акции
          </Typography>
        </NavLink>
      </Box>
      <Box sx={{ display: { xs: 'none', sm: 'block' }, minWidth: '2rem' }} />
      <Box className={styles.media} sx={{ flex: { xs: '0 0 100%', sm: '0 0 50%' } }}>
        {!!mediaSrc?.length &&
          <img src={mediaSrc[ index ]} alt={'...'} />
        }
      </Box>
    </Box>
  );
};

export default SingleBanner;
