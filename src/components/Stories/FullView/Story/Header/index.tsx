import { Box, Fab, Typography } from '@mui/material';
import React from 'react';
import { ColoredAvatar } from '@qwangy/styles';

import { CloseIcon } from '../../../../svgComponents/Icons/outlined';

interface StoryHeaderProps {
  profileImage: string,
  heading: string,
  subheading: string,
  setOpen: (arg0: boolean) => void,
  setIndex: (rate: number) => void
}

const Header = (props: StoryHeaderProps) => {
  return (
    <Box sx={{
      position: 'absolute',
      top: '3rem',
      left: 0,
      width: '100%',
      maxWidth: '100%',
      p: '1.6rem',
      display: 'flex',
      alignItems: 'center',
      whiteSpace: 'nowrap',
      zIndex: 10,
    }}>
      <ColoredAvatar size={30} picture={props.profileImage} name={props.heading} />
      <Typography variant="h4" sx={{
        fontSize: '1.6rem',
        fontWeight: 600,
        width: '100%',
        ml: '.8rem',
        color: 'white',
        textOverflow: 'ellipsis',
        overflow: 'hidden'
      }}>{props.heading}</Typography>
      <Typography variant="h4" sx={{
        fontSize: '1.6rem',
        fontWeight: 400,
        ml: '.8rem',
        color: 'white',
      }}>{props.subheading}</Typography>
      <Fab
        color='primary'
        size="small"
        onClick={() => props.setOpen(false)}
        sx={{ flex: '0 0 3rem',width: '3rem', height: '3rem', ml: '1rem', '& svg':{ width: '2.4rem', height: '2.4rem'}, minHeight: '2.4rem', color: 'secondary.light', backgroundColor: 'transparent' }}
      ><CloseIcon /></Fab>
      <Box onClick={() => props.setIndex(-1)}
           sx={{ position: 'absolute', top: 50, bottom: 0, left: 0, height: '700px', width: '33%' }} />
      <Box onClick={() => props.setIndex(1)}
           sx={{ position: 'absolute', top: 50, bottom: 0, right: 0, height: '700px', width: '33%' }} />
    </Box>
  );
};

export default Header;
