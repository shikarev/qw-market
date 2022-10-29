import React from 'react';
import { Box, Button, Grid, Typography, Skeleton } from '@mui/material';
import cuid from 'cuid';
import classNames from 'classnames/bind';
import { NavLink } from 'react-router-dom';
import styles from './GridBanner.module.scss';
import { sxUtils } from '@qwangy/styles';

const cx = classNames.bind(styles);

interface IGridBanner {
  data: any;
  isFetching: any;
  page?: number;
  setPage?: any;
  actions: any;
  square?: boolean;
}

const GridBanner = (props: IGridBanner) => {

  function loadMore() {
    if (props.page && props.setPage) {
      props.setPage(props.page + 1);
    }
  }

  return (
    <div className={cx('actions')}>
      {props.isFetching ?
        <Grid container spacing={5}>
          {props.square
            ?
            [ ...Array(4) ].map(() =>
              <Grid key={cuid()} item xs={6}>
                <Skeleton variant="rectangular" height={285} sx={{ borderRadius: '2rem' }} />
              </Grid>
            )
            :
            [ ...Array(props.actions.length || 8) ].map(() =>
              <Grid key={cuid()} item xs={6} md={4} lg={3} xl={3}>
                <Skeleton variant="rectangular" height={285} sx={{ borderRadius: '2rem' }} />
              </Grid>
            )}
        </Grid>
        :
        props.actions.length > 0 ?
          <Grid container spacing={4} className={cx(props.square && 'grid-small')}>
            {props.square
              ?
              props.actions.slice(0, 4).map((item: any) => (

                <Grid key={'grid' + item.id} item xs={6} className={cx('padding-small')} sx={{ '& a': { color: 'text.primary' } }}>
                  <NavLink key={item.id} to={`/promotion/${item.id}`}>
                    <div className={cx('action')}
                         style={{ backgroundImage: `url(${item.image})` }}>
                      <Box className={cx('title', 'title__small')} sx={{ p: '1.6rem' }}>
                        <Typography
                          sx={{
                            fontSize: '1.6rem',
                            lineHeight: '2rem',
                            fontWeight: 700, ...sxUtils.fixedLines(2)
                          }}
                        >
                          {item.name}
                        </Typography>
                      </Box>
                    </div>
                  </NavLink>
                </Grid>))
              :
              props.actions.map((item: any) => (

                <Grid key={'grid' + item.id} item xs={3} className={cx('padding-default')}
                      sx={{ '& a': { color: 'text.primary' } }}>
                  <NavLink to={`/promotion/${item.id}`}>
                    <div className={cx('action')}
                         style={{ backgroundImage: `url(${item.image})` }}>
                      <Box className={cx('title')} sx={{ p: '1.6rem' }}>
                        <Typography sx={{
                          fontSize: '2rem',
                          lineHeight: '2.4rem',
                          fontWeight: 700, ...sxUtils.fixedLines(2)
                        }}>
                          {item.name}
                        </Typography>
                      </Box>
                    </div>
                  </NavLink>
                </Grid>

              ))}
          </Grid>
          :
          <Typography variant="h2">Нет предложений</Typography>
      }

      {props.page && (props.data && props.data.total > props.page * 8) &&
        <div className={cx('loadmore')}>
          <div className={cx('button')}>
            <Button variant="outlined"
                    color="primary"
                    fullWidth
                    sx={{ color: 'text.primary', height: '6.4rem', fontSize: '2rem', fontWeight: 700 }}
                    onClick={() => loadMore()}>
              Загрузить еще
            </Button>
          </div>
        </div>

      }
    </div>
  );
};

export default GridBanner;
