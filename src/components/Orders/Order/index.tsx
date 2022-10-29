import React from "react";
import { Box, Button, Skeleton, Typography } from "@mui/material";
import classNames from "classnames/bind";
import styles from "./Order.module.scss";
import { OrderInfo } from "../../../types/Order";
import moment from "moment";
import { useGetOrderQuery } from "../../../api/orders";
import { numberWithSpaces } from "../../../utils/numberWithSpaces";
import { imageOnErrorHandler } from "../../../utils/imgError";
import placeholder from "../../../assets/placeHolders/noImagePlaceholder.svg";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

const Order = (props: OrderInfo) => {
  const { data, isFetching } = useGetOrderQuery({ orderId: props.id });
  const total =
    data?.orderProducts?.reduce(
      (acc, curr) => acc + curr.cost * curr.quantity,
      0
    ) || 0;

  const navigate = useNavigate();

  return (
    <Box className={cx("root")}>
      {/* HEADER */}
      <Box style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
        <Box>
          <Typography style={{ fontSize: "2.4rem", fontWeight: 600 }}>
            Заказ от {moment(props.created).format("DD MMMM YYYY")}
          </Typography>
          <Typography color="textSecondary" style={{ fontSize: "1.4rem" }}>
            {props.id.slice(0, 7)}
          </Typography>
        </Box>
        <Typography
          style={{
            marginLeft: "auto",
            fontSize: "2.4rem",
            fontWeight: 600,
          }}
        >
          {isFetching ? (
            <Skeleton width={100} />
          ) : (
            `${numberWithSpaces(total)} ₽`
          )}
        </Typography>
        <Typography
          color="textSecondary"
          style={{
            marginLeft: "1rem",
            fontSize: "1.4rem",
          }}
        >
          {props.paymentStatus === "no" ? "Не оплачен" : "Оплачен"}
        </Typography>
      </Box>

      {/* Content */}
      <Box className={cx("content")}>
        <Box className={cx("content-header")}>
          <Typography style={{ fontSize: "1.7rem", fontWeight: 600 }}>
            {props.deliveryWayName}
          </Typography>
          <Typography
            color="textSecondary"
            style={{ marginLeft: "2rem", fontSize: "1.4rem" }}
          >
            Дата
          </Typography>
          <Typography
            style={{
              marginLeft: "auto",
              fontSize: "1.7rem",
              fontWeight: 600,
            }}
          >
            {props.orderStatus === "created" ? "Создан" : "В обработке"}
          </Typography>
        </Box>
        <Box className={cx("content-divider")} />
        <Box className={cx("content-media")}>
          <Box
            style={{
              display: "flex",
              flex: "0 1 100%",
              overflowX: "auto",
              paddingBottom: "1rem",
            }}
          >
            {data?.orderProducts.map((previewProduct) => (
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
              </div>
            ))}
          </Box>
          <span style={{ marginLeft: "auto" }} />
          <Button
            variant="outlined"
            color="primary"
            style={{ marginLeft: "2rem", flex: "0 0 200px" }}
            onClick={() => navigate(`${data.id}`)}
          >
            Детали заказа
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Order;
