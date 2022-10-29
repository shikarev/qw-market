import classNames from 'classnames/bind';
import React from 'react';
import { ISelector, ISelectorThumb } from '../../../types/Selector';
import styles from './productSelector.module.scss';
import { Typography } from '@mui/material';

const cx = classNames.bind(styles);

const Thumb: React.FC<ISelectorThumb> = ({selectedId, data, size, onSelect }: ISelectorThumb) => {
    const handleClick = () => {
        onSelect(data.id);
    }

    return (
        <div className={cx(size >= 90 ? 'thumb-large' : 'thumb-small')}>
            <div className={cx('thumb', selectedId === `${data.id}` && 'active')}
                style={{ backgroundImage: `url(${data.url || data.picture_path})`,width: `calc(${size}px - 4px)`, height:`calc(${size}px - 4px)` }} onClick={() => handleClick()} />
            {data.name &&
            <Typography className={cx('description', selectedId === data.id && 'active')}>{data.name}</Typography>}
        </div>
    )
}

function ProductSelector({ onChange, data, size, current }: ISelector) {
    function handleClick(selectedId: string) {
        onChange(selectedId)
    }

    return (
        <div className={cx('selector')}>
            {data && data.map((item: any) => <Thumb size={size} selectedId={current} key={item.id} data={item} onSelect={handleClick} />)}
        </div>
    );
}

export default ProductSelector;
