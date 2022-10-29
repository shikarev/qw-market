import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { clamp } from 'lodash';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useGetStoryQuery } from '../../../../api/stories';
import { fixedLinesProp } from '../../../../utils/sx';
import Header from './Header';
import Media from './Media';
import Progress from './Progress';

const Story = ({ handleNextClick, handlePrevClick, id, setOpen }) => {

  const { data, isLoading } = useGetStoryQuery({ id }, { skip: !id });
  const [ index, setIndex ] = useState(0);

  function onEnd() {
    handleNextClick();
  }

  useEffect(() => {
    setIndex(0)
  }, [ id, data ])

  function handleIndex(rate: number) {

    if (index + rate >= data?.media?.length) {
      onEnd();
    }

    if (index + rate < 0) {
      handlePrevClick();
    }

    setIndex(clamp(index + rate, 0, data.media?.length - 1))
  }

  function handleClick(vendorId: string) {
    const path = window.location.origin;

    window.location.href = path + `/marketplace/stores/${vendorId}`;
    //TODO update to navigate after update router to v6
  }

  const media = !!data?.media?.length ? data?.media : undefined;

  return (
    <Box sx={{
      position: 'relative',
      width: '375px',
      height: '780px',
      backgroundColor: 'black',
      borderRadius: '2rem',
      overflow: 'hidden'
    }}>
      {isLoading
        ? <CircularProgress />
        : <>
          <Progress index={index} length={data.media.length} />
          <Header
            setOpen={setOpen}
            setIndex={handleIndex}
            profileImage={data.vendor.picturePath}
            heading={data.vendor.name}
            subheading={moment(media.created).startOf('hour').fromNow()}
          />
          {media[ index ] &&
            <Box sx={{
              '& img, video': { width: '375px', height: '780px', objectFit: 'cover', objectPosition: 'center' }
            }}
            >
              <Media type={media[ index ].type} url={media[ index ].path} onEnd={() => handleIndex(1)}/>
            </Box>
          }
          <Box sx={{ position: 'absolute', width: '100%', left: 0, bottom: 0, color: 'white' }}>
            <Box sx={{ p: '2.4rem 1.6rem' }}>
              <Typography variant="h2" sx={{ ...fixedLinesProp(2) }}>{data?.name}</Typography>
              <Typography sx={{ mt: '1.6rem', fontSize: '2rem', ...fixedLinesProp(4) }}>{data?.description}</Typography>
              <Button sx={{
                mt: '1.6rem',
                position: 'relative',
                fontWeight: 700,
                zIndex: 20,
                height: '5.6rem',
                width: '100%'
              }}
                      variant="contained"
                      color="primary"
                      id="btn-from-story"
                      onClick={() => handleClick(data?.vendor?.id)}
              >
                Перейти к акции
              </Button>
            </Box>
          </Box>
        </>
      }
    </Box>
  );
};

export default Story;
