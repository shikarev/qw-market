import classNames from 'classnames/bind';
import React from 'react';
import {ISelector, ISelectorThumb} from '../../types/Selector';
import styles from './selector.module.scss';
import {SwiperSlide} from "swiper/react";
import SwiperCore, {Pagination, Navigation} from 'swiper';

import QwSwiper from "../QwSwiper";
import { Typography } from '@mui/material';

const cx = classNames.bind(styles);

SwiperCore.use([Pagination,Navigation]);

const Thumb: React.FC<ISelectorThumb> = ({selectedId, data, size, onSelect}: ISelectorThumb) => {
    const handleClick = () => {
        onSelect(data.id);
    }

    return (
        <div className={cx(size >= 90 ? 'thumb-large' : 'thumb-small')}>
            <div className={cx('thumb', selectedId === `${data.id}` && 'active')}
                 style={{
                     backgroundImage: `url(${data.url || data.picture_path})`,
                     width: `calc(${size}px - 4px)`,
                     height: `calc(${size}px - 4px)`
                 }} onClick={() => handleClick()}/>
            {data.name &&
              <Typography
                sx={{
                  marginLeft: '1rem',
                  marginTop: '0.6rem',
                  fontSize: '1.4rem',
                  lineHeight: '1.7rem',
                  fontWeight: 500,
                  textAlign: 'center',
                  width: '10.5rem',
                  marginBottom: '2rem',
                }}
                className={cx('description', selectedId === data.id && 'active')}
              >
                {data.name}
              </Typography>
            }
        </div>
    )
}

function Selector({onChange, data, size, current, title}: ISelector) {
    function handleClick(selectedId: string) {
        onChange(selectedId)
    }

    return (
        <QwSwiper
            title={title}
            className="carousel-swiper"
            slidesPerView={3}
            spaceBetween={16}
            slidesPerGroup={1}
            breakpoints={{
                "576": {
                    "slidesPerView": 4,
                    "spaceBetween": 16,
                    "slidesPerGroup": 2,
                },
                "768": {
                    "slidesPerView": 6,
                    "spaceBetween": 16,
                    "slidesPerGroup": 2,
                },
                "992": {
                    "slidesPerView": 8,
                    "spaceBetween": 16,
                    "slidesPerGroup": 3,
                },
                "1200": {
                    "slidesPerView": 9,
                    "spaceBetween": 16,
                    "slidesPerGroup": 3,
                },
                "1400": {
                    "slidesPerView": 10,
                    "spaceBetween": 16,
                    "slidesPerGroup": 3,
                }
            }}
        >
            {data && data.map((item: any) =>
                <SwiperSlide key={item.id}>
                    <Thumb size={size} selectedId={current} key={item.id} data={item}
                           onSelect={handleClick}/>
                </SwiperSlide>
            )}
        </QwSwiper>

    );
}

export default Selector;
