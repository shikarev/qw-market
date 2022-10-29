import { Box, Typography } from "@mui/material";
import { Rating } from "@qwangy/styles";
import classNames from "classnames/bind";
import React from "react";
import { useNavigate } from "react-router-dom";
import { IProductDescription } from "../../../types/Product";
import { toTrueWordForm } from "../../../utils/toTrueWordForm";
import styles from "./description.module.scss";

const cx = classNames.bind(styles);

const Description = ({
  rating,
  points,
  purchaseCount,
  productId,
}: IProductDescription) => {
  const navigate = useNavigate();

  let productMod = new URLSearchParams(window.location.search).toString();

  const handleClickReviews = () => {
    navigate(`reviews?${productMod}`);
  };

  return (
    <Box className={cx("wrapper")}>
      <Rating
        readOnly
        value={rating || 0}
        sx={{
          pr: "0.8rem",
          fontSize: "2rem",
          height: "2rem",
          ".MuiRating-iconEmpty": { color: "rgba(0, 0, 0, 0.26)" },
        }}
      />

      <Typography
        className={cx("reviews", "review", "color")}
        onClick={() => handleClickReviews()}
        sx={{ pr: "2.4rem" }}
      >
        {toTrueWordForm(points || 0, ["отзыв", "отзыва", "отзывов"])}
      </Typography>

      <Box className={cx("benefits")}>
        <Typography className={cx("review")} sx={{ pr: "2.4rem" }}>
          {toTrueWordForm(purchaseCount, ["покупка", "покупки", "покупок"])} за
          2 месяца
        </Typography>

        <Typography className={cx("review")} sx={{ pr: "2.4rem" }}>
          88% рекомендуют
        </Typography>
      </Box>
    </Box>
  );
};

export default Description;
