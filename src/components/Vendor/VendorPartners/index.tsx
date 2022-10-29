import React from 'react';
import classNames from 'classnames/bind';
import styles from './VendorPartners.module.scss';

import shopPlaceholder from '../../../assets/placeHolders/shopPlaceholder.svg';
import { Box, Grid, Typography } from '@mui/material';
import cuid from 'cuid';
import { useGetVendorPartnersByVendorIdQuery } from '../../../api/vendors';
import { useParams } from 'react-router-dom';

const cx = classNames.bind(styles);

const VendorPartners = () => {

  const {id} = useParams()

  const {data, isLoading} = useGetVendorPartnersByVendorIdQuery({ id })

  function url_domain(site:string) {
    let a = document.createElement('a');
    a.href = site;
    return a.hostname;
  }

  if(isLoading) {
    return <Typography variant="h2">Загрузка...</Typography>
  }

  function handleClick (id?: string) {
      if(id){
        window.location.href = `/marketplace/stores/${id}`
      }
  }
  return (
    <Box className={cx('wrapper')} sx={{p: 3}}>
      {data && data.length > 0 ?
        <>
          {data && data.map(data =>
            <div className={cx('pt-group')} key={data.id}>
              <Typography variant="h1">{data.name}</Typography>
              <Grid container spacing={4}>
                {data.partners.map(item =>
                  <Grid key={cuid()} item xs={12} sm={6} md={6} lg={6} xl={4}>
                    <div className={cx('partner-container')} >
                      <Box className={cx('partner-logo')}
                           onClick={() => handleClick(data.id === 'STORE' ? item.id : undefined)}
                           style={{cursor: (data.id === 'STORE') ? 'pointer' : 'unset'}}
                      >
                        <div
                          style={{backgroundImage: `url(${item.picture_path || shopPlaceholder})`}}
                          className={cx('logo')}
                        />
                        <Typography className={cx('title')}>
                          {item.name}
                        </Typography>
                      </Box>

                      <Typography className={cx('partner-info')}>
                        {item.description || 'Нет описания'}
                      </Typography>
                      {item.site ?
                          <Typography><a href={item.site} target="_blank" className={cx('website-link')}>{url_domain(item.site)}</a></Typography>
                          :
                          <Typography color='primary' style={{marginTop: 'auto'}}>Сайт не указан</Typography>
                      }
                    </div>
                  </Grid>
                )}
              </Grid>
            </div>
          )}
        </>
        :
        <Typography variant="h2">Партнеров пока нет</Typography>
      }
    </Box>
  );
};

export default VendorPartners;
