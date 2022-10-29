import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useGetOrdersQuery } from "../../api/orders";
import Order from "../../components/Orders/Order";
import styles from "./Orders.module.scss";
import classNames from "classnames/bind";
import { OrderInfo } from "../../types/Order";

const cx = classNames.bind(styles);

const OrdersPage = () => {
  const limit = 5;
  const [page, setPage] = useState(1);
  const { data, error } = useGetOrdersQuery({
    page: page.toString(),
    limit: limit.toString(),
  });
  const total = data?.total ?? 0;
  const [orders, setOrders] = useState<OrderInfo[]>([]);

  useEffect(() => {
    if (data) {
      setOrders([...orders, ...data.data]);
    }
  }, [data]);

  return (
    <Box sx={{ mb: "13rem" }}>
      <Typography
        style={{ fontSize: "3.4rem", fontWeight: 700, marginBottom: "2rem" }}
      >
        Заказы
      </Typography>
      {error && (
        <Typography color="primary">
          Ошибка! авторизуйтесь или попробуйте позже
        </Typography>
      )}

      <Box className={cx("buttons")}>
        <Button
          variant="contained"
          sx={{ color: "white", backgroundColor: "#EB4F5A" }}
        >
          Все
        </Button>
        <Button variant="text" sx={{boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.102)', color: '#1A202C'}}>Ожидают оплаты</Button>
        <Button variant="text" sx={{boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.102)', color: '#1A202C'}}>В работе</Button>
        <Button variant="text" sx={{boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.102)', color: '#1A202C'}}>Выполненные</Button>
        <Button variant="text" sx={{boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.102)', color: '#1A202C'}}>Отмененные</Button>
      </Box>

      <Box className={cx("wrapper")}>
        {orders.map((x) => (
          <Order key={x.id} {...x} />
        ))}
      </Box>
      {total > limit * page && (
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "3rem 0",
          }}
        >
          <Button
            variant="outlined"
            color="primary"
            sx={{ color: "#1A202C", fontSize: '20px', fontWeight: 700, padding: '1.6rem 5rem', border: '2px solid #EB4F5A' }}
            onClick={() => setPage(page + 1)}
          >
            Загрузить еще
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default OrdersPage;
