import { Box, CircularProgress, Modal, Typography } from '@mui/material';
import classNames from 'classnames/bind';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import Stories from 'react-insta-stories';
import { Swiper, SwiperSlide } from 'swiper/react';
import { IStory, useGetStoryQuery } from '../../../api/stories';
import placeholder from '../../../assets/placeHolders/noImagePlaceholder.svg';
import { useAppSelector } from '../../../store/hooks';
import { getStories } from '../../../store/stories';
import { imageOnErrorHandler } from '../../../utils/imgError';
import StoryPreview from '../StoryPreview';
import { LeftBtn } from '../../svgComponents/Icons';
import { RightBtn } from '../../svgComponents/Icons/filled';
import styles from './FullView.module.scss';
import PreviewCard from './PreviewCard';
import Story from './Story';

moment.locale('ru');
const cx = classNames.bind(styles);

interface FullViewProps {
  open: boolean,
  storyId?: string,
  setOpen: (arg0: boolean) => any
}

const FullView = ({ open, storyId, setOpen }: FullViewProps) => {
  const storiesData = useAppSelector(getStories)
  const [ id, setId ] = useState(storyId)
  const [ currentIndex, setCurrentIndex ] = useState<number>(0);
  const storiesRef = useRef(null);

  useEffect(() => {
    if (open && id && storiesData?.length) {
      const found = storiesData.findIndex(story => story.id === id)
      if (found) {
        setCurrentIndex(found)
        setId(storiesData[ found ].id)
      } else {
        setCurrentIndex(0)
      }
    }
  }, [ open, id ])


  function handleNextClick() {
    if (storiesData[ currentIndex + 1 ]) {
      setId(storiesData[ currentIndex + 1 ].id)
    }
  }

  function handlePrevClick() {
    if (storiesData[ currentIndex - 1 ]) {
      setId(storiesData[ currentIndex - 1 ].id)
    }
  }

  return (
    <Modal open={open}
           onClose={() => setOpen(false)}
           sx={{
             position: 'fixed',
             left: '50%',
             top: '50%',
             transform: 'translate(-50%, -50%)',
             height: '100vh',
             minWidth: '100vw',
             right: 'unset',
             bottom: 'unset'
           }}>
      <>
        <div className={cx('media')} ref={storiesRef}>
          {currentIndex > 1
            ? <PreviewCard story={storiesData[ currentIndex - 2 ]} />
            : <div className={cx('media-dummy', 'media-dummy__small')} />
          }
          {currentIndex > 0
            ? <PreviewCard story={storiesData[ currentIndex - 1 ]} large />
            : <div className={cx('media-dummy', 'media-dummy__large')} />
          }
          <div className={cx('story')}>
            <LeftBtn
              className={cx('story-icon', 'story-icon__left', currentIndex === 0 ? 'story-icon__disabled' : '')}
              onClick={() => handlePrevClick()} />
            <RightBtn
              className={cx('story-icon', 'story-icon__right', currentIndex + 1 === storiesData.length ? 'story-icon__disabled' : '')}
              onClick={() => handleNextClick()} />
            <Story id={id} handlePrevClick={handlePrevClick} handleNextClick={handleNextClick} setOpen={setOpen} />
          </div>

          {currentIndex + 1 < storiesData.length
            ? <PreviewCard story={storiesData[ currentIndex + 1 ]} large />
            : <div className={cx('media-dummy', 'media-dummy__large')} />}
          {currentIndex + 2 < storiesData.length
            ? <PreviewCard story={storiesData[ currentIndex + 2 ]} />
            : <div className={cx('media-dummy', 'media-dummy__small')} />}
        </div>
      </>
    </Modal>
  );
};

export default FullView;
