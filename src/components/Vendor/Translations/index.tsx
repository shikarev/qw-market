import React from 'react';
import {useGetPodcastsQuery} from "../../../api/podcasts";
import {IPodcast} from "../../../types/Podcasts";
import { Box, Grid, Typography } from '@mui/material';
import styles from './Translations.module.scss';
import classNames from "classnames/bind";
import moment from "moment";
import {ViewIcon} from "../../svgComponents/Icons";
import {numberWithSpaces} from "../../../utils/numberWithSpaces";
import {ReactComponent as Placeholder} from "../../../assets/placeHolders/translationMediaPlaceholder.svg?svgr";
import { useParams } from 'react-router-dom';

const cx = classNames.bind(styles);

const Translation = (props: IPodcast) => {

    const durationHours = props.duration ? Math.floor(Math.floor(props.duration / 60) / 60) : 0;
    const durationMinutes = props.duration ? Math.floor(props.duration / 60 ) - durationHours * 60 : 0;
    const durationSeconds = props.duration ? props.duration % 60 : 0;
    const isRecord = props.startDate ? Date.parse(props.startDate) < Date.now() : false;

    return (
        <div className={cx('root')}>
            {!!(props.image) &&
            <div className={cx('media-preview')} style={{backgroundImage: `url(${props.image})`}}/>
            }
            {!!(props.video) &&
            <div className={cx('media-preview')} >
              {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
                <video src={props.video}/>
            </div>
            }
            {(!props.image && !props.video) &&
                <div className={cx('placeholder')}>
                    <Placeholder />
                </div>
            }
            <div className={cx('media-info')}>
                <Typography className={cx('date', isRecord ? 'date__record' : 'date__announcement')}>{ isRecord ? 'Запись' : 'Анонс'}</Typography>
                {props.viewCount &&
                <Typography className={cx('view')}><ViewIcon/>{numberWithSpaces(props.viewCount)}</Typography>
                }
            </div>

            <div className={cx('info')}>
                <Typography className={cx('duration')}>{`${durationHours > 0 ? `${durationHours} : ` : ''}${durationMinutes < 10 ? '0' : ''}${durationMinutes} : ${durationSeconds < 10 ? '0' : ''}${durationSeconds}`}</Typography>
                <div>
                    <Typography variant="h2">{props.name}</Typography>
                </div>
                <Typography className={cx('start')}>{moment(props.startDate).format('DD.MM.YYYY')}</Typography>
            </div>
        </div>
    )
}

const Translations = () => {

  const {id} = useParams()

  const {data, isFetching} = useGetPodcastsQuery({vendorId: id}, {
      selectFromResult: ({data, isFetching, isLoading}) => ({
          data: data?.data,
          isFetching: isFetching,
          isLoading: isLoading,
      })
  })

  const live = data?.find(x => !!(Date.parse(x.startDate) < Date.now() && Date.parse(x.startDate) + 3600000 > Date.now())) //date between hour ago and now

  if(!isFetching && data && data.length <= 0) {
      return <Typography variant="h2" sx={{p: 3}}>Трансляций пока нет</Typography>
  }

  return (
      <Box className={cx('wrapper')} sx={{p: 3}}>
          {data && data.length > 0 &&
          <>
              {!!live &&
                  <div className={cx('live')}>
                      <Translation {...live}/>
                  </div>
              }
              <Grid container spacing={3}>
                  {data.map(item =>
                      <Grid key={item.id} item xs={12} md={6} lg={4}>
                          <Translation  {...item}/>
                      </Grid>)}
              </Grid>
          </>}
      </Box>
  );
};

export default Translations;
