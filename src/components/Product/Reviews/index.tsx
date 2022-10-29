import classNames from "classnames/bind";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  IFeedbackSort,
  useGetFeedbackMediaByProductIdQuery,
  useGetProductReviewsByProductIdQuery,
} from "../../../api/productReviews";
import { IReviewsData } from "../../../types/Product";
import Feedback from "../Feedback";
import styles from "./reviews.module.scss";

const cx = classNames.bind(styles);

const Reviews = ({
  productId,
  pagination,
  pageCount,
  setRates,
  page,
  rates,
}: IReviewsData) => {
  const location = useLocation();
  let params = new URLSearchParams(location.search);

  const [swiperPage, setSwiperPage] = useState(1);

  const { data: feedbacksMedia } = useGetFeedbackMediaByProductIdQuery({
    productId: productId,
    page: swiperPage,
    limit: 20,
    image_size: "100x100",
  });

  function handleSwiper() {
    setSwiperPage(swiperPage + 1);
  }

  const [sort, setSort] = useState(params.get("sort") || "created");
  const [sortType, setSortType] = useState(params.get("sortType") || "DESC");

  const { data: productReviews } = useGetProductReviewsByProductIdQuery({
    productId: productId,
    page: Number(page),
    limit: 10,
    rates: rates,
    sort: sort,
    sortType: sortType,
  });

  const handleSort = ({ sort }: IFeedbackSort) => {
    params.set("sort", sort);
    setSort(sort);

    if (sortType === "ASC") {
      params.set("sortType", "DESC");
      setSortType("DESC");
    } else {
      params.set("sortType", "ASC");
      setSortType("ASC");
    }

    window.history.replaceState(
      null,
      "",
      location.pathname + "?" + params.toString()
    );
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("feedback")}>
        {productReviews && (
          <Feedback
            reviewsData={productReviews}
            productId={productId}
            pagination={pagination}
            pageCount={pageCount}
            page={page}
            rates={rates}
            setRates={setRates}
            handleSort={handleSort}
            sort={sort}
            reviewsMedia={feedbacksMedia}
            callback={handleSwiper}
          />
        )}
      </div>
    </div>
  );
};

export default Reviews;
