import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';

const Progress = ({ index, length }) => {

  const [ progress, setProgress ] = useState(0);

  useEffect(() => {
    window.addEventListener('story-progress', (e: CustomEvent) => {
      setProgress(e.detail?.progress)
    });
    return () => window.removeEventListener('story-progress', () => {
    })
  }, [])

  return (
    <Box sx={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      maxWidth: '100%',
      p: '3rem 1.6rem',
      display: 'flex',
      alignItems: 'center',
      '& > div:not(fist-of-type)': {
        ml: '4px'
      }
    }}>
      {[ ...Array(length) ].map((item, i) => (
        <Box key={i} sx={{
          position: 'relative',
          backgroundColor: 'secondary.main',
          height: '2px',
          width: '100%'
        }}
        >
          <Box sx={{
            position: 'absolute',
            height: '2px',
            top: 0,
            left: 0,
            backgroundColor: 'white',
            width: i < index ? '100%' : (i === index ? `${progress}%` ?? '100%' : 0)
          }} />
        </Box>
      ))}
    </Box>
  );
};

export default Progress;
