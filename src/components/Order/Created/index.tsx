import { useGetOrderQuery } from "../../../api/orders";
import moment from "moment";
import { numberWithSpaces } from "../../../utils/numberWithSpaces";
import React, { useState } from "react";
import styles from "./Created.module.scss";
import classNames from "classnames/bind";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { getOrderId, setOrderStatus } from "../../../store/order";
import { QSimpleModal } from "../../common/Modals";
import { Grid, Typography, Button, Box } from "@mui/material";
import placeholder from "../../../assets/placeHolders/noImagePlaceholder.svg";
import { imageOnErrorHandler } from "../../../utils/imgError";

const cx = classNames.bind(styles);

function OrderCreated() {
  const [openDetails, setOpenDetails] = useState(false);
  const id = useAppSelector(getOrderId);
  const { data: order } = useGetOrderQuery({ orderId: id }, { skip: !id });
  const total =
    order?.orderProducts?.reduce(
      (acc, curr) => acc + curr.cost * curr.quantity,
      0
    ) || 0;
  const previewProducts = order?.orderProducts;
  const dispatch = useAppDispatch();

  function handleComplete() {
    window.location.href = "orders";
  }

  function showDetails() {
    setOpenDetails(true);
  }

  function finishOrder() {
    dispatch(setOrderStatus(0));
  }

  return (
    <div>
      {order ? (
        <>
          <QSimpleModal
            header={`Заказ №${order.id.slice(-4)}`}
            show={openDetails}
            onClose={() => setOpenDetails(false)}
          >
            <Grid container spacing={5} className={cx("container")}>
              <Grid item xs={5}>
                {previewProducts &&
                  previewProducts.map((previewProduct) => (
                    <div className={cx("product")}>
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
                            ? `${
                                previewProduct.quantity
                              } шт. по ${numberWithSpaces(
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
                      {moment(order.created).format("DD MMMM YYYY")}
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
                    <Typography>{order.paymentMethodName}</Typography>
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
                    <Typography>{order.recipientName}</Typography>
                    <Typography>{order.recipientPhone}</Typography>
                    <Typography>{order.recipientEmail}</Typography>
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
          </QSimpleModal>
          <h1> Спасибо за оформленный заказ!</h1>
          <div className={cx("header")}>
            <Typography>Заказ доступен в профиле</Typography>
            <Typography onClick={() => handleComplete()}>
              Перейти в профиль
            </Typography>
          </div>
          <div className={cx("order")}>
            <div className={cx("order-info")}>
              <div className={cx("order-header")}>
                <Typography variant="h2">
                  Заказ № {order.id.slice(-4)}
                </Typography>
                <span />
                <Typography variant="h2">
                  Доставка {order.deliveryWayName.toLowerCase()}{" "}
                  {moment(order.created).format("DD MMMM YYYY")} в{" "}
                  {moment(order.created).format("HH:mm")}
                </Typography>
              </div>
              <div className={cx("order-date")}>
                <Typography>Дата оформления:</Typography>
                <Typography className={cx("order-date__created")}>
                  {moment(order.created).format("DD MMMM YYYY")}
                </Typography>
              </div>
              {previewProducts &&
                previewProducts.map((previewProduct) => (
                  <div className={cx("product")}>
                    <Box className={cx("product-image")}>
                      <Box
                        component="img"
                        src={previewProduct.image || placeholder}
                        alt=""
                        onError={imageOnErrorHandler}
                        sx={{
                          width: "100%",
                          height: "100%",
                          alignSelf: "center",
                          objectFit: "contain",
                          objectPosition: "center",
                        }}
                      />
                    </Box>
                    <div className={cx("product-description")}>
                      <Typography className={cx("product-name")}>
                        {previewProduct.name}
                      </Typography>
                      <Typography
                        className={cx("product-price")}
                      >{`${numberWithSpaces(
                        previewProduct.cost * previewProduct.quantity
                      )} ₽`}</Typography>
                      <Typography className={cx("product-quantity")}>{`${
                        previewProduct.quantity > 1
                          ? `${
                              previewProduct.quantity
                            } шт. по ${numberWithSpaces(previewProduct.cost)} ₽`
                          : ""
                      }`}</Typography>
                    </div>
                  </div>
                ))}
            </div>
            <div className={cx("order-details")}>
              <div className={cx("order-status-info")}>
                <Typography className={cx("order-price")}>{`${numberWithSpaces(
                  total
                )} ₽`}</Typography>
                <Typography className={cx("order-status")}>
                  {order.orderStatus === "created" ? "Создан" : "В обработке"}
                </Typography>
                <Typography className={cx("order-payment-status")}>
                  {order.paymentStatus === "no" ? "не оплачен" : "оплачен"}
                </Typography>
              </div>
              <Button
                variant="contained"
                size="medium"
                color="primary"
                onClick={() => showDetails()}
              >
                {" "}
                Детали заказа
              </Button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className={cx("header")}>
            <Typography>Заказ доступен на странице "Заказы"</Typography>
            <Typography onClick={() => handleComplete()}>Перейти</Typography>
          </div>
          <Button
            variant="contained"
            color="primary"
            onClick={() => finishOrder()}
          >
            Новый заказ
          </Button>
        </>
      )}
    </div>
  );
}

export default OrderCreated;
