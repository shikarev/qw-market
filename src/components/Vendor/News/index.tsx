import React from 'react';
import classNames from "classnames/bind";
import styles from "./News.module.scss";
import { Box, Grid, Typography } from '@mui/material';
import {CommentsIcon, FavoritesOutline, Heart, ShareArrow, ViewEye} from "../../svgComponents/Icons/outlined";
import {useGetNewsesQuery} from "../../../api/news";
import {INews} from "../../../types/Newses";
import placeholder from '../../../assets/placeHolders/noImagePlaceholder.svg';
import { Link, useParams } from 'react-router-dom';

const cx = classNames.bind(styles);

const News = () => {

  const {id} = useParams()

    const {data, isLoading} = useGetNewsesQuery({vendorId: id, page: '1', limit: "12"}, {
        selectFromResult: ({data, isLoading}) => ({
            data: data?.data,
            isLoading: isLoading,
        })
    });

    if(!data || data.length <= 0) {
        return <Typography variant="h2" sx={{p:3}}>{!isLoading ? 'Новостей пока нет' : null}</Typography>
    }

    return (
        <Grid container spacing={4} className={cx('container')} sx={{p: 3}}>
            {data && data.map((item: INews) =>
                <Grid
                  key={item.id}
                  className={cx('padding-default')}
                  item xs={12} sm={12} md={6} lg={4} xl={4}
                >
                    <Link to={`/news/${item.id}`}>
                      <div className={cx('action')}>
                        <Box component="img" src={item.media?.[0]?.path || placeholder} sx={{objectFit: 'cover', objectPosition: 'center', width: '100%', height: '100%'}} />
                        <div className={cx('labels')}>
                          {id &&
                            <Typography className={cx('label-from')}>
                              Новость магазина
                            </Typography>
                          }

                          {item?.viewCount &&
                            <Typography className={cx('label-from')}>
                              <ViewEye /> <span className={cx('views')}>{item?.viewCount}</span>
                            </Typography>
                          }
                        </div>
                        <div className={cx('news-container')}>
                          <Typography className={cx('title')}>{item.description}</Typography>
                          <div className={cx('subtitle')}>
                            <div className={cx('icons')}><Heart /> <span>{item.likeCount}</span></div>
                            <div className={cx('icons')}><CommentsIcon /> <span>{item.commentsCount}</span></div>
                            <FavoritesOutline />
                            <ShareArrow className={cx('icon')} />
                          </div>
                        </div>
                      </div>
                    </Link>
                </Grid>
            )}
        </Grid>
    );
};

export default News;
