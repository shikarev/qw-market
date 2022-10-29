import React from 'react';
import { Rating } from '@mui/material';
import { StarsFilledIcon } from '../svgComponents/Icons/filled';
import { StarsOutlinedIcon } from '../svgComponents/Icons/outlined';

const RatingStars = ({num, readOnly = false , size, onChange, id, name='defaultname'}:{num:number, readOnly?:boolean, size?: 'small' | 'medium' | 'large', onChange?: any, id?: string, name?: string }) => {
    return <Rating
    value={num}
    icon={<StarsFilledIcon />}
    emptyIcon={<StarsOutlinedIcon />}
    size={size}
    //precision={0.5}
    id={id}
    name={name}
    readOnly={readOnly}
    onChange={onChange}
    />
}

export default RatingStars;
