import React from 'react';
import { Badge, Box, Typography } from '@mui/material';
import { IUserActivity } from '../../../../types/User';
import { ReactComponent as OrderOutlinedIcon } from '../../../../assets/Icons/outlined/order.svg?svgr';
import { ReactComponent as BookmarkIcon } from '../../../../assets/Icons/outlined/favorite.svg?svgr';
import { NavLink } from 'react-router-dom';

const ActivityButtons = ({ userActivity }:{userActivity: IUserActivity}) => {

  return (
    <Box sx={{display: 'flex'}}>

      <NavLink to="/orders">
        <Box sx={{mr: '3rem', textAlign: 'center', cursor: 'pointer'}}>
          <Badge badgeContent={userActivity?.orders} color="primary" sx={{'& .MuiBadge-badge': { fontSize: '1.2rem' }}}>
            <OrderOutlinedIcon />
          </Badge>
          <Typography sx={{fontSize: 20, fontWeight: 700, mt: '0.4rem', textDecoration: 'none'}}>Заказы</Typography>
        </Box>
      </NavLink>

      <NavLink to="/favorites">
        <Box sx={{textAlign: 'center', cursor: 'pointer'}}>
          <Badge badgeContent={userActivity?.favorites} color="primary" sx={{'& .MuiBadge-badge': { fontSize: '1.2rem' }}}>
            <BookmarkIcon />
          </Badge>
          <Typography sx={{fontSize: 20, fontWeight: 700, mt: '0.4rem', textDecoration: 'none'}}>Избранное</Typography>
        </Box>
      </NavLink>

    </Box>
  );
};

export default ActivityButtons;
