import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./LargeFeedbackViewer.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Navigation } from "swiper";
import placeholder from "../../../../assets/placeHolders/noImagePlaceholder.svg";
import { useGetFeedbackMediaByProductIdQuery } from "../../../../api/productReviews";
import { IFeedbacksMedia } from "../../../../types/Reviews";

import "./swiper.scss";
import "./navigation.scss";

const cx = classNames.bind(styles);

interface IFeedbackMedia {
  productId: string;
}

SwiperCore.use([Pagination, Navigation]);

const LargeFeedbackViewer = (props: IFeedbackMedia) => {
  const [swiperPage, setSwiperPage] = useState(1);

  const { data: feedbacksMedia, pageCount } =
    useGetFeedbackMediaByProductIdQuery(
      {
        productId: props.productId,
        page: swiperPage,
        limit: 24,
        image_size: "100x100",
      },
      {
        selectFromResult: ({ data }) => ({
          data: data?.data,
          pageCount: data?.[`page-count`],
        }),
      }
    );

  const [slides, setSlides] = useState<IFeedbacksMedia[]>([]);

  useEffect(() => {
    if (feedbacksMedia) {
      if (swiperPage === 1) {
        setSlides(feedbacksMedia);
      } else {
        setSlides([...slides, ...feedbacksMedia]);
      }
    }
  }, [feedbacksMedia]);

  if (feedbacksMedia) {
    if (feedbacksMedia.length <= 0) {
      return null;
    }
  }

  return (
    <div className={cx("container", "reviews")}>
      <Swiper
        slidesPerView={4}
        spaceBetween={16}
        onReachEnd={() =>
          setSwiperPage(
            pageCount && swiperPage < pageCount ? swiperPage + 1 : swiperPage
          )
        }
        slidesPerGroup={3}
        breakpoints={{
          "576": {
            slidesPerView: 7,
            spaceBetween: 16,
          },
          "768": {
            slidesPerView: 8,
            spaceBetween: 16,
          },
          "992": {
            slidesPerView: 10,
            spaceBetween: 16,
          },
          "1200": {
            slidesPerView: 11,
            spaceBetween: 16,
          },
          "1400": {
            slidesPerView: 13,
            spaceBetween: 16,
          },
        }}
        navigation={{
          prevEl: ".Fswiper-button-prev",
          nextEl: ".Fswiper-button-next",
        }}
      >
        {slides &&
          slides.map((item: any, index: number) => (
            <SwiperSlide key={index}>
              <div className={cx("large_viewer")}>
                <div
                  className={cx("banner")}
                  style={{
                    backgroundImage: `url(${item.image}), url(${placeholder})`,
                  }}
                  key={index}
                />
              </div>
            </SwiperSlide>
          ))}
        <div className="Fswiper-button-prev" />
        <div className="Fswiper-button-next" />
      </Swiper>
    </div>
  );
};

export default LargeFeedbackViewer;
