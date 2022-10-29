import { Typography } from '@mui/material';
import React from 'react';
import { toTrueWordForm, toTrueWordFormLong } from '../../../../utils/toTrueWordForm';

interface HeadingWithCounterProps {
  title: string;
  count: number;
  countNames: string[];
  startNames?: string[];
}

const HeadingWithCounter = ({title, count, countNames, startNames}:HeadingWithCounterProps) => {
  return (
    <>
      <Typography variant="h1">{title}</Typography>
      <Typography sx={{ color: 'text.secondary', fontWeight: 500, mt: 3 }}>
        {!!startNames
          ? toTrueWordFormLong(startNames, count, countNames)
          : toTrueWordForm(count, countNames)
        }
      </Typography>
    </>
  );
};

export default HeadingWithCounter;
