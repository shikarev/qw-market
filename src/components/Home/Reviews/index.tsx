import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SwiperSlide } from 'swiper/react';
import QwSwiper from '../../QwSwiper';
import Review from './Review';
import { useGetReviewsArticlesListQuery } from '../../../api/reviewsArticles';

const Reviews = () => {
    const { data: reviewsData } = useGetReviewsArticlesListQuery();
    const navigate = useNavigate();

    function handleClick (id?: string) {
      navigate('/reviews_articles/' + id)
    }

  function toReviewsArticles () {
    navigate('/reviews_articles/')
  }

    return (
        <QwSwiper
            title="Обзоры"
            className="review-swiper"
            slidesPerView={1.5}
            spaceBetween={34}
            slidesPerGroup={1}
            buttonCallback={toReviewsArticles}
            breakpoints={{
                "576": {
                    "slidesPerView": 2,
                    "spaceBetween": 16,
                    "slidesPerGroup": 1,
                },
                "768": {
                    "slidesPerView": 3,
                    "spaceBetween": 16,
                    "slidesPerGroup": 2,
                },
                "992": {
                    "slidesPerView": 4,
                    "spaceBetween": 32,
                    "slidesPerGroup": 2,
                },
                "1200": {
                    "slidesPerView": 5,
                    "spaceBetween": 48,
                    "slidesPerGroup": 3,
                },
                "1400": {
                    "slidesPerView": 5,
                    "spaceBetween": 48,
                    "slidesPerGroup": 3,
                }
            }}
        >
            {reviewsData?.data.map(item =>
                <SwiperSlide key={item.id}>
                    <Review
                    description={item.description}
                    image={item.image}
                    key={item.id}
                    onClick={() => handleClick(item.id)}
                    />
                </SwiperSlide>
            )}
        </QwSwiper>
    );
};

export default Reviews;
