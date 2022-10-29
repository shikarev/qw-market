import styles from "./reviewFilter.module.scss";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
  styled,
} from "@mui/material";
import { toTrueWordForm } from "../../../utils/toTrueWordForm";
import React from "react";
import classNames from "classnames/bind";
import { useGetFeedbackRateCountByProductIdQuery } from "../../../api/productReviews";
import { Rating } from "@qwangy/styles";
import cuid from "cuid";

const cx = classNames.bind(styles);

const StyledCheckbox = styled(Checkbox)({
  marginRight: "1rem",
  "& .MuiSvgIcon-root": {
    fontSize: "2.4rem",
  },
});

const StyledFormControlLabel = styled(FormControlLabel)({
  marginLeft: "-1px",
  marginRight: "0",
});

const ReviewFilter = ({
  productId,
  rates,
  setRates,
}: {
  productId?: string;
  rates: number[];
  setRates?: (rates: number[]) => void;
}) => {
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    num: number
  ) => {
    if (setRates) {
      if (rates.includes(num)) {
        setRates(rates.filter((i) => i !== num));
      } else {
        setRates([...rates, num]);
      }
    }
  };

  const { data: rateCounts } =
    useGetFeedbackRateCountByProductIdQuery(productId);

  return (
    <div className={cx("reviewContainer")}>
      {rateCounts && rateCounts.length > 0 ? (
        <Typography className={cx("reviewTitle")}>Отзывы c оценкой</Typography>
      ) : null}
      <FormGroup>
        {rateCounts &&
          rateCounts.map((data: any) => (
            <StyledFormControlLabel
              key={cuid()}
              control={
                <StyledCheckbox
                  color="primary"
                  checked={rates.includes(data.rate)}
                  onChange={(e) => handleChange(e, data.rate)}
                  value={data.rate}
                />
              }
              label={
                <div className={cx("ratingLabel")}>
                  <div className={cx("ratingStars")}>
                    <Rating
                      value={data.rate}
                      name="rating"
                      readOnly
                      sx={{
                        fontSize: "2rem",
                        height: "2rem",
                        ".MuiRating-iconEmpty": {
                          color: "rgba(0, 0, 0, 0.26)",
                        },
                      }}
                    />
                  </div>
                  <Typography>
                    {toTrueWordForm(data.rates_count, [
                      "отзыв",
                      "отзыва",
                      "отзывов",
                    ])}
                  </Typography>
                </div>
              }
            />
          ))}
      </FormGroup>
    </div>
  );
};

export default ReviewFilter;
