import classNames from "classnames/bind";
import styles from "./vendorProfile.module.scss";
import {SiteHome} from "../../svgComponents/Icons/outlined";
import { Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useGetVendorDataQuery } from '../../../api/vendors';

const cx = classNames.bind(styles);

const VendorProfile = () => {

  const {id} = useParams()
  const {data: vendorData} = useGetVendorDataQuery(id, {skip: !id});

  return (
      <Box className={cx('container')} sx={{p: 3}}>
          <div className={cx('content')}>
              <Typography variant="h2" sx={{fontWeight: 600}} className={cx('title')}>
                  {vendorData?.name}
              </Typography>

              <div className={cx('addressContainer')}>
                  <div className={cx('vendorAddress')}>
                      <SiteHome />
                      <Typography className={cx('addressField')}>{vendorData?.address?.name}</Typography>
                  </div>
              </div>

              {vendorData?.inn &&
                  <Typography className={cx('inn')}>
                      ИНН-{vendorData?.inn}
                  </Typography>
              }

              <Typography className={cx('siteLink')}>
                  <a href={vendorData?.site}>{vendorData?.site}</a>
              </Typography>
          </div>
          <div className={cx('content')}>
              <Typography variant="h2" className={cx('title')}>
                  Доставка вовремя
              </Typography>
              <Typography className={cx('completed_order')}>
                  99% <span className={cx('lightgray')}>выполненных заказов</span>
              </Typography>
          </div>
          <div className={cx('content')}>
              <Typography variant="h2" className={cx('title')}>
                  Количество заказов
              </Typography>
              <Typography>
                  {vendorData?.order_count}
              </Typography>
          </div>
      </Box>
  )
}

export default VendorProfile;
