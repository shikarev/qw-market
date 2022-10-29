import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { ArrowPrev, Questions } from "../../svgComponents/Icons/outlined";
import { Rating } from "@qwangy/styles";
import { toTrueWordForm } from "../../../utils/toTrueWordForm";
import FavoritesButtonDefault from "../FavoritesButton/FavoritesButtonDefault";
import WishesButtonDefault from "../WishesButton/WishesButtonDefault";
import ShareButtonModal from "../ShareButton/ShareButtonModal";
import IconLink from "../../IconLink";
import placeholder from "../../../assets/placeHolders/noImagePlaceholder.svg";
import { imageOnErrorHandler } from "../../../utils/imgError";
import { numberWithSpaces } from "../../../utils/numberWithSpaces";
import clsx from "clsx";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../../store/hooks";
import { getProductCard } from "../../../store/product";
import styles from "./ProductHeader.module.scss";

const ProductHeader = ({ title }: { title?: string }) => {
  const productData = useAppSelector(getProductCard);

  const navigate = useNavigate();

  const routePath = useParams();

  let productMod = new URLSearchParams(window.location.search).toString();

  const offersTitle = toTrueWordForm(productData.productPrices?.total, [
    "предложение",
    "предложения",
    "предложений",
  ]).toString();

  return (
    <>
      <nav className={clsx(styles.navigation, styles.stickyMode)}>
        <Box className={clsx(styles.navigation_menu)}>
          <Box className={clsx(styles.back)}>
            <Button
              variant="text"
              sx={{ color: "text.primary" }}
              disableRipple
              onClick={() =>
                navigate(`/product/${productData.product?.id}?${productMod}`, {
                  replace: true,
                })
              }
              startIcon={<ArrowPrev />}
            >
              Обратно к товару
            </Button>
          </Box>
          <Typography variant="h1">
            {routePath["*"] === "reviews" && "Отзывы о товаре"}
            {routePath["*"] === "questions" && "Вопросы о товаре"}
            {routePath["*"] === "offers" && offersTitle}
            {title}
          </Typography>
          <Box className={clsx(styles.description)}>
            <Rating
              readOnly
              value={productData.product?.rating || 0}
              sx={{
                pr: "0.8rem",
                fontSize: "2rem",
                height: "2rem",
                ".MuiRating-iconEmpty": { color: "rgba(0, 0, 0, 0.26)" },
              }}
            />

            <Typography
              className={clsx(styles.reviews, styles.review, styles.color)}
              sx={{ pr: "2.4rem" }}
              onClick={() =>
                navigate(
                  `/product/${productData.product?.id}/reviews?${productMod}`,
                  { replace: true }
                )
              }
            >
              {toTrueWordForm(productData.productReviews?.total || 0, [
                "отзыв",
                "отзыва",
                "отзывов",
              ])}
            </Typography>

            <Box className={clsx(styles.benefits)}>
              <Typography className={clsx(styles.review)} sx={{ pr: "2.4rem" }}>
                {toTrueWordForm(productData.product?.purchaseCount || 0, [
                  "покупка",
                  "покупки",
                  "покупок",
                ])}{" "}
                за 2 месяца
              </Typography>

              <Typography className={clsx(styles.review)} sx={{ pr: "2.4rem" }}>
                88% рекомендуют
              </Typography>
            </Box>
          </Box>

          <Box className={clsx(styles.actions)}>
            <FavoritesButtonDefault productId={productData.product?.id} />
            <WishesButtonDefault productId={productData.product?.id} />

            <ShareButtonModal />
            <IconLink
              className={clsx(styles.hidable)}
              icon={Questions}
              text={toTrueWordForm(productData.product?.questionCount || 0, [
                "вопрос",
                "вопроса",
                "вопросов",
              ])}
              callback={() =>
                navigate(
                  `/product/${productData.product?.id}/questions?${productMod}`,
                  {
                    replace: true,
                  }
                )
              }
            />
          </Box>
        </Box>
        <Box className={clsx(styles.navigation_product)}>
          <Box className={clsx(styles.mediaContainer)}>
            <img
              className={clsx(styles.media)}
              src={productData.product?.picturePath || placeholder}
              alt=""
              onError={imageOnErrorHandler}
            />
          </Box>
          <Box className={clsx(styles.test)}>
            <Typography className={clsx(styles.previewTitle)}>
              {productData.product?.name || ""}
            </Typography>
            {productData.product?.cost && (
              <Typography className={clsx(styles.previewPrice)}>
                {`${numberWithSpaces(productData.product?.cost)} ₽`}
              </Typography>
            )}
          </Box>
        </Box>
      </nav>
      <Outlet />
    </>
  );
};

export default ProductHeader;
