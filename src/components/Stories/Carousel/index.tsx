import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SwiperSlide } from 'swiper/react';
import { useGetStoriesQuery } from '../../../api/stories';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { clearStories, getStories, setStories } from '../../../store/stories';
import QwSwiper from '../../QwSwiper';
import StoryPreview from '../StoryPreview';

interface CarouselProps {
  handleOpen: (id: string) => void;
}

const Carousel = ({handleOpen}:CarouselProps) => {
  const navigate = useNavigate();
  const [ limit, setLimit ] = useState(10);
  const [ page, setPage ] = useState(1);
  const dispatch = useAppDispatch();
  const { data } = useGetStoriesQuery({ page, limit });
  const storiesData = useAppSelector(getStories)

  useEffect(() => {
    dispatch(clearStories())
  }, [])

  useEffect(() => {
    if (data) {
      dispatch(setStories(data.data))
    }
  }, [ data ])

  function loadMore() {
    if (data?.total > (page * limit)) {
      setPage(page + 1);
    }
  }

  function handleVendor(e: Event, vendorId?: string) {
    e.stopPropagation();
    navigate(`/stores/${vendorId}`)
  }

  return (
    <QwSwiper
      title="Новые истории от магазинов"
      className="market-stories-swiper"
      slidesPerView={1.5}
      spaceBetween={16}
      slidesPerGroup={1}
      onReachEnd={() => loadMore()}
      breakpoints={{
        '576': {
          'slidesPerView': 3,
          'spaceBetween': 16,
          'slidesPerGroup': 1,
        },
        '768': {
          'slidesPerView': 3,
          'spaceBetween': 16,
          'slidesPerGroup': 2,
        },
        '992': {
          'slidesPerView': 4,
          'spaceBetween': 16,
          'slidesPerGroup': 2,
        },
        '1200': {
          'slidesPerView': 5,
          'spaceBetween': 16,
          'slidesPerGroup': 3,
        },
        '1400': {
          'slidesPerView': 5,
          'spaceBetween': 16,
          'slidesPerGroup': 3,
        }
      }}
    >
      {storiesData.map(item =>
        <SwiperSlide key={item.id}>
          <StoryPreview
            handleVendor={(e: Event) => handleVendor(e, item.vendor?.id)}
            key={item.id} {...item}
            onClick={handleOpen}
          />
        </SwiperSlide>
      )
      }
    </QwSwiper>
  );
};

export default Carousel;
