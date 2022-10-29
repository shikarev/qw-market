import { Link, Typography } from '@mui/material';
import classNames from 'classnames/bind';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LeftBtn } from '../../svgComponents/Icons';
import { RightBtn } from '../../svgComponents/Icons/filled';
import styles from './Banner.module.scss';

const cx = classNames.bind(styles);

interface IPromoBanner {
  data: any;
  isFetching: any;
  square?: boolean;
}

function Banner({ data, isFetching, square }: IPromoBanner) {
  const [ bannerPage, setBannerPage ] = useState(0)

  return (
    <>
      {isFetching ?
        <span
          className={`${cx('root', square && 'root__square')} MuiSkeleton-root MuiSkeleton-rect MuiSkeleton-pulse`} />
        :
        (data?.data && !!data.data.length && data.data[ bannerPage ])
          ?
          <div
            className={cx('root', square && 'root__square')}
            style={{ backgroundImage: `url(${data.data[ bannerPage ].image})` }}
          >
            <div className={cx('inner')}>
              <div className={cx('controls')}>
                <LeftBtn className={cx(bannerPage === 0 ? 'controls__disabled' : '')}
                         onClick={() => setBannerPage(bannerPage >= 1 ? bannerPage - 1 : 0)} />
                <div>
                  <span className={cx('controls_current')}>{bannerPage + 1}</span>
                  <span className={cx('controls_total')}>/{data.data.length}</span>
                </div>
                <RightBtn
                  className={cx(bannerPage + 1 === data.data.length ? 'controls__disabled' : '')}
                  onClick={() => setBannerPage(bannerPage < data.data.length - 1 ? bannerPage + 1 : data.data.length - 1)} />
              </div>
              {data?.data[ bannerPage ]?.vendor?.map((item: any) =>
                <Typography className={cx('manufacturer')} key={item.id}>{item.name}</Typography>
              )}

              <Typography className={cx('name')}>{data.data[ bannerPage ].name}</Typography>
              <div className={cx('description')}>
                <Typography>{data.data[ bannerPage ].description}</Typography>
              </div>
              <div className={cx('button')}>
                <NavLink to={`/promotion/${data.data[ bannerPage ].id}`}>
                  <Typography
                              sx={{
                                backgroundColor: 'primary.main',
                                color: 'white',
                                borderRadius: '4rem',
                                height: { xs: '4rem', md: '6.4rem' },
                                fontWeight: 700,
                                textDecoration: 'none',
                                fontSize: { xs: '1.6rem', md: '2rem' }
                              }}>
                    Посмотреть
                  </Typography>
                </NavLink>
              </div>
            </div>
          </div> : <Typography variant="h2">Нет акций</Typography>}
    </>
  );
}

//TODO fix filters bar
//TODO fix promotions loading and cache logics
//

export default Banner;
