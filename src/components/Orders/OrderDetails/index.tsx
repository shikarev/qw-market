import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { OrderProduct } from "../../../types/Order";
import placeholder from "../../../assets/placeHolders/noImagePlaceholder.svg";
import { imageOnErrorHandler } from "../../../utils/imgError";
import { numberWithSpaces } from "../../../utils/numberWithSpaces";
import moment from "moment";
import classNames from "classnames/bind";
import styles from "../Order/Order.module.scss";
import { useGetOrderQuery } from "../../../api/orders";
import { useParams } from "react-router-dom";
import { QCircularProgress } from "../../common/Progress";

const cx = classNames.bind(styles);

const OrderDetails = () => {
  const { id } = useParams();

  const { data, isFetching } = useGetOrderQuery({ orderId: id }, { skip: !id });

  const total =
    data?.orderProducts?.reduce(
      (acc, curr) => acc + curr.cost * curr.quantity,
      0
    ) || 0;

  if (isFetching) {
    return <QCircularProgress size={24} />;
  }

  return (
    <Box sx={{ mb: "13rem" }}>
      <Typography variant="h1" sx={{ mb: "5rem" }}>
        Детали заказа
      </Typography>

      <Box
        sx={{
          boxShadow: "0px 2px 26px rgba(0, 0, 0, 0.1)",
          borderRadius: "44px",
          mb: "5rem",
        }}
      >
        <Typography variant="h2" sx={{ p: "4rem" }}>
          {`Заказ № ${data.id.slice(0, 7)}`}
        </Typography>
      </Box>
      <Box
        sx={{
          boxShadow: "0px 2px 26px rgba(0, 0, 0, 0.1)",
          borderRadius: "44px",
        }}
      >
        <Typography variant="h2" sx={{ p: "4rem" }}>
          Данные
        </Typography>
        <Grid container spacing={5} className={cx("container")}>
          <Grid item xs={5}>
            {data.orderProducts?.map((previewProduct: OrderProduct) => (
              <div key={previewProduct.id} className={cx("product")}>
                <Box
                  className={cx("product-image")}
                  component="img"
                  src={previewProduct.image || placeholder}
                  alt=""
                  onError={imageOnErrorHandler}
                  sx={{
                    width: "100%",
                    height: "100%",
                    alignSelf: "center",
                    maxHeight: "10rem",
                    maxWidth: "10rem",
                    objectFit: "contain",
                    objectPosition: "center",
                  }}
                />
                <div className={cx("product-description")}>
                  <Typography className={cx("product-name")}>
                    {previewProduct.name}
                  </Typography>
                  <Typography
                    className={cx("product-price")}
                  >{`${numberWithSpaces(
                    previewProduct.cost * previewProduct.quantity
                  )} ₽`}</Typography>
                  <span className={cx("product-quantity")}>{`${
                    previewProduct.quantity > 1
                      ? `${previewProduct.quantity} шт. по ${numberWithSpaces(
                          previewProduct.cost
                        )} ₽`
                      : ""
                  }`}</span>
                </div>
              </div>
            ))}
          </Grid>
          <Grid item xs={7} style={{ marginTop: "3rem" }}>
            <Grid container className={cx("details-block")}>
              <Grid item xs={6}>
                <Typography className={cx("details-label")}>
                  Дата оформления
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>
                  {moment(data.created).format("DD MMMM YYYY")}
                </Typography>
              </Grid>
              <Grid item xs={12} />
            </Grid>

            <Grid container className={cx("details-block")}>
              <Grid item xs={12}>
                <Typography className={cx("details-label")}>
                  Способ оплаты
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{data.paymentMethodName}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{`${numberWithSpaces(total)} ₽`}</Typography>
              </Grid>
            </Grid>
            <Grid container className={cx("details-block")}>
              <Grid item xs={12}>
                <Typography className={cx("details-label")}>
                  Способ получения
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>Получатель</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{data.recipientName}</Typography>
                <Typography>{data.recipientPhone}</Typography>
                <Typography>{data.recipientEmail}</Typography>
              </Grid>
              <Grid className={cx("details-label")} item xs={12} />
              <Grid item xs={6}>
                <Typography>Стоимость доставки</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>бесплатно</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default OrderDetails;
