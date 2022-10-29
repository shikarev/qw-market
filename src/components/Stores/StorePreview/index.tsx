import { Box, Typography } from '@mui/material';
import { Rating } from '@qwangy/styles';
import classNames from 'classnames/bind';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import shopPlaceholder from '../../../assets/placeHolders/shopPlaceholder.svg';
import styles from './styles.module.scss'
import { imageOnErrorHandler } from '../../../utils/imgError';

const cx = classNames.bind(styles);

export interface IStoresPreview {
    id: string,
    companyLogo: string;
    companyName: string;
    companySub: string;
    companyProduct: string;
    rating: number;
}

const StoresPreview: React.FC<IStoresPreview> = ({
        id,
        companyLogo,
        companyName,
        companySub,
        rating,
}) => {
    return (
      <Link to={`/stores/${id}`}>
        <Box className={cx('storesContainer')}>
            <div className={cx('storeHead', 'd-flex')}>
              <div className={cx('companyLogo')}>
                <div className={cx('logoContainer')}>
                  <img loading="lazy"
                       src={companyLogo || shopPlaceholder}
                       alt=""
                       className={cx('logo')}
                       onError={imageOnErrorHandler}
                  />
                </div>
              </div>
              <div className={cx('companyInfo')}>
                <div className={cx('info')}>
                  <Typography className={cx('companyName')}>
                    {companyName}
                  </Typography>
                  <Typography className={cx('companySub')}>
                    {companySub || 'Нет описания'}
                  </Typography>
                  <div className={cx('rating')}>
                    <Rating readOnly value={rating} sx={{fontSize: '1.2rem', height: '1.2rem', '.MuiRating-iconEmpty': { color: 'rgba(0, 0, 0, 0.26)' }}} />
                    <Typography className={cx('ratingText')} sx={{fontSize: '1.2rem'}}>Рейтинг магазина</Typography>
                  </div>
                </div>
              </div>
            </div>
        </Box>
      </Link>
    );
}

export default StoresPreview;
