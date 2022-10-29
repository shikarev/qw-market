import { Box, Divider, Typography } from "@mui/material";
import { Rating } from "@qwangy/styles";
import classNames from "classnames/bind";
import moment from "moment";
import React, { useEffect } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import { useGetProductPricesByProductIdQuery } from "../../../api/product";
import shopOnMap from "../../../assets/offers/shops_on_map.png";

import placeholder from "../../../assets/placeHolders/noImagePlaceholder.svg";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { getModOptions } from "../../../store/modOption";
import { IVendorPrices } from "../../../types/Prices";
import { IOffersData } from "../../../types/Product";
import { numberWithSpaces } from "../../../utils/numberWithSpaces";
import { toTrueWordForm } from "../../../utils/toTrueWordForm";
import CartButton from "../../Cart/CartButton";
import { abbreviateNumber } from "../OrderDetails";
import styles from "./offers.module.scss";
import { imageOnErrorHandler } from "../../../utils/imgError";
import { setProductPrices } from "../../../store/product";

const cx = classNames.bind(styles);

const Offers = ({
  productId,
  productName,
  vendorData,
  currency,
}: IOffersData) => {
  let navigate = useNavigate();

  const handleClickVendor = (vendorId: string) => {
    navigate(`/stores/${vendorId}`);
  };

  const match = useMatch("/product/:id/offers");

  const modsOptions = useAppSelector(getModOptions);

  const dispatch = useAppDispatch();

  const { data: productPrices } = useGetProductPricesByProductIdQuery(
    { id: match?.params.id, modStr: modsOptions || "" },
    { skip: !match?.params.id }
  );

  useEffect(() => {
    if (productPrices) {
      dispatch(setProductPrices(productPrices));
    }
  }, [productPrices]);

  //let productMod = new URLSearchParams(window.location.search).toString();

  return (
    <div className={cx("wrapper")}>
      <Box className={cx("sort")} sx={{ display: "flex" }}>
        <Typography sx={{ fontWeight: 600 }} className={cx("item")}>
          Сортировать:
        </Typography>
        <Typography sx={{ fontWeight: 600 }} className={cx("item", "active")}>
          По популярности
        </Typography>
        <Typography sx={{ fontWeight: 600 }} className={cx("item", "inActive")}>
          По рейтингу и цене
        </Typography>
        <Typography sx={{ fontWeight: 600 }} className={cx("item", "inActive")}>
          По скидке
        </Typography>
      </Box>

      <div className={cx("content")}>
        <div className={cx("products")}>
          {vendorData && vendorData.data.length > 0
            ? vendorData.data.map((data: IVendorPrices, index: number) => (
                <div className={cx("productContainer")} key={index}>
                  <div className={cx("productCard")}>
                    <div className={cx("productImage")}>
                      <img
                        src={data.picture_path || placeholder}
                        alt=""
                        className={cx("imgStyle")}
                        onError={imageOnErrorHandler}
                      />
                    </div>
                    <div className={cx("productInfo")}>
                      <Typography variant="h2">{productName}</Typography>
                      <Typography className={cx("productType")}>
                        {data.mod_name}
                      </Typography>
                      <Typography className={cx("price")}>{`${numberWithSpaces(
                        data.cost
                      )} ${data.currency_name}`}</Typography>
                      <div className={cx("addcart")}>
                        <CartButton
                          productId={productId}
                          priceId={data.id}
                          style={{ margin: "1rem 0" }}
                        >
                          {data.id ? "В корзину" : "Нет в наличии"}
                        </CartButton>
                      </div>
                    </div>
                    <div className={cx("shopInfo")}>
                      <Box
                        className={cx("vendorInfo")}
                        onClick={() => handleClickVendor(data.vendor.id)}
                      >
                        {data.vendor.picture_path?.length > 0 ? (
                          <img
                            src={data.vendor.picture_path || placeholder}
                            alt=""
                            onError={imageOnErrorHandler}
                            className={cx("vendorLogo")}
                          />
                        ) : null}

                        <Typography className={cx("bold", "mb-1")}>
                          {data.vendor.name}
                        </Typography>

                        {data.vendor.rating! > 0 && (
                          <Rating
                            readOnly
                            value={data.vendor.rating!}
                            sx={{ mb: "1.2rem" }}
                          />
                        )}

                        {data.vendor.feedback_count && (
                          <Typography className={cx("review", "color")}>
                            {toTrueWordForm(
                              abbreviateNumber(data.vendor.feedback_count) || 0,
                              ["отзыв", "отзыва", "отзывов"]
                            )}
                          </Typography>
                        )}
                      </Box>

                      {data.vendor_deliveries?.map((data, index) => (
                        <Typography key={index} className={cx("delivery")}>
                          {data.timeframe
                            ? `${data.name},  ${moment()
                                .add(data.timeframe, "days")
                                .format("Do MMMM")}`
                            : data.name}{" "}
                          —{" "}
                          <span className={cx("bold")}>
                            {data.cost
                              ? `${data.cost} ${currency}`
                              : `бесплатно`}
                          </span>
                        </Typography>
                      ))}
                      <Typography className={cx("storage")}>
                        Склад продавца
                      </Typography>
                      {data.vendor_payments?.map((data, index) => (
                        <Typography key={index} className={cx("delivery")}>
                          {index + 1 === data.vendor_payments?.length
                            ? `${data.name},`
                            : data.name}
                        </Typography>
                      ))}
                    </div>
                  </div>
                  <Divider />
                </div>
              ))
            : productPrices &&
              productPrices.data.map((data: IVendorPrices, index: number) => (
                <div className={cx("productContainer")} key={index}>
                  <div className={cx("productCard")}>
                    <div className={cx("productImage")}>
                      <img
                        src={data.picture_path || placeholder}
                        alt=""
                        className={cx("imgStyle")}
                        onError={imageOnErrorHandler}
                      />
                    </div>
                    <div className={cx("productInfo")}>
                      <Typography variant="h2">{productName}</Typography>
                      <Typography className={cx("productType")}>
                        {data.mod_name}
                      </Typography>
                      <Typography className={cx("price")}>{`${numberWithSpaces(
                        data.cost
                      )} ${data.currency_name}`}</Typography>
                      <div className={cx("addcart")}>
                        <CartButton
                          productId={productId}
                          priceId={data.id}
                          style={{ margin: "1rem 0" }}
                        >
                          {data.id ? "В корзину" : "Нет в наличии"}
                        </CartButton>
                      </div>
                    </div>
                    <div className={cx("shopInfo")}>
                      <Box
                        className={cx("vendorInfo")}
                        onClick={() => handleClickVendor(data.vendor.id)}
                      >
                        {data.vendor.picture_path?.length > 0 ? (
                          <img
                            src={data.vendor.picture_path}
                            alt=""
                            className={cx("vendorLogo")}
                            onError={imageOnErrorHandler}
                          />
                        ) : null}

                        <Typography className={cx("bold", "mb-1")}>
                          {data.vendor.name}
                        </Typography>

                        {data.vendor.rating! > 0 && (
                          <Rating
                            readOnly
                            value={data.vendor.rating!}
                            sx={{ mb: "1.2rem" }}
                          />
                        )}

                        {data.vendor.feedback_count && (
                          <Typography className={cx("review", "color")}>
                            {toTrueWordForm(
                              abbreviateNumber(data.vendor.feedback_count) || 0,
                              ["отзыв", "отзыва", "отзывов"]
                            )}
                          </Typography>
                        )}
                      </Box>

                      {data.vendor_deliveries?.map((data, index) => (
                        <Typography key={index} className={cx("delivery")}>
                          {data.timeframe
                            ? `${data.name},  ${moment()
                                .add(data.timeframe, "days")
                                .format("Do MMMM")}`
                            : data.name}{" "}
                          —{" "}
                          <span className={cx("bold")}>
                            {data.cost
                              ? `${data.cost} ${currency}`
                              : `бесплатно`}
                          </span>
                        </Typography>
                      ))}
                      <Typography className={cx("storage")}>
                        Склад продавца
                      </Typography>
                      {data.vendor_payments?.map((data, index) => (
                        <Typography key={index} className={cx("delivery")}>
                          {index + 1 === data.vendor_payments?.length
                            ? `${data.name},`
                            : data.name}
                        </Typography>
                      ))}
                    </div>
                  </div>
                  <Divider />
                </div>
              ))}
        </div>
        <div className={cx("filters")}>
          <Typography className={cx("shopsMap")}>Магазины на карте</Typography>
          <div className={cx("map")}>
            <img src={shopOnMap} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offers;
