import { Box, Button, styled, Typography } from "@mui/material";
import classNames from "classnames/bind";
import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useGetCartDetailsQuery, useUpdateMutation } from "../../../api/cart";
import { useAppSelector } from "../../../store/hooks";
import { orderDeliveryType } from "../../../store/order";
import { numberWithSpaces } from "../../../utils/numberWithSpaces";
import { toTrueWordForm } from "../../../utils/toTrueWordForm";
import CartProductDeleteConfirmDialog from "../../Cart/CartProductDeleteConfirmDialog";
import { QCircularProgress } from "../../common/Progress";
import { DeleteIcon } from "../../svgComponents/Icons";
import { QCard } from "../CheckCard";
import styles from "./CartPreview.module.scss";
import placeholder from "../../../assets/placeHolders/noImagePlaceholder.svg";
import { imageOnErrorHandler } from "../../../utils/imgError";

const cx = classNames.bind(styles);

const CartButton = styled(Button)(({ theme }) => ({
  width: "32px",
  height: "32px",
  padding: 0,
  minWidth: "32px",
  backgroundColor: "#F6F7FB",
  color: theme.palette.text.primary,
}));

interface ICartPreview {
  handleOrder: (ids: string[]) => void;
  hideButton?: boolean;
}

export const PreviewProduct = ({ item }: any) => {
  const [updateQuantity] = useUpdateMutation();
  const [deleteConfirmDialogOpen, setDeleteConfirmDialogOpen] = useState(false);
  const [deleteIds, setDeleteIds] = useState<string[]>([]);

  function handleDelete(ids: string[]) {
    setDeleteIds(ids);
    setDeleteConfirmDialogOpen(true);
  }

  function handleReduce(item: any) {
    if (item.quantity === 1) {
      handleDelete([item.id]);
    } else {
      updateQuantity({ id: item.id, quantity: item.quantity - 1 });
    }
  }

  return (
    <div className={cx("product")}>
      <CartProductDeleteConfirmDialog
        open={deleteConfirmDialogOpen}
        cartProductIds={deleteIds}
        onClose={() => setDeleteConfirmDialogOpen(false)}
        onConfirm={() => setDeleteConfirmDialogOpen(false)}
      />
      <Box className={cx("product-image")}>
        <Box
          component="img"
          src={item.image || placeholder}
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
        <div className={cx("product-header")}>
          <Typography className={cx("product-name")}>{item.name}</Typography>
          <DeleteIcon
            className={cx("product-delete")}
            onClick={() => handleDelete([item.id])}
          />
        </div>
        <div className={cx("product-quantity")}>
          <CartButton onClick={() => handleReduce(item)}>-</CartButton>
          <Typography>{item.quantity}</Typography>
          <CartButton
            onClick={() =>
              updateQuantity({ id: item.id, quantity: item.quantity + 1 })
            }
          >
            +
          </CartButton>
        </div>
        <Typography className={cx("product-price")}>{`${numberWithSpaces(
          item.cost
        )} ₽`}</Typography>
      </div>
    </div>
  );
};

function CartPreview({ handleOrder, hideButton }: ICartPreview) {
  const navigate = useNavigate();
  const deliveryType = useAppSelector(orderDeliveryType);
  const { data: cartData, isLoading: cartLoading } = useGetCartDetailsQuery();

  const activeCartData = cartData?.filter((x) => x.status === "active");
  const total =
    activeCartData?.reduce((acc, curr) => acc + curr.cost * curr.quantity, 0) ||
    0;
  const totalOldPrice =
    activeCartData?.reduce((acc, curr) => {
      const itemOldPrice = curr.oldCost
        ? curr.oldCost * curr.quantity
        : curr.cost * curr.quantity;
      return acc + itemOldPrice;
    }, 0) || 0;

  return (
    <div className={cx("cart")}>
      {activeCartData && activeCartData.length === 0 ? (
        <Navigate to="/cart" />
      ) : (
        <>
          <QCard
            title="Ваш заказ"
            handleClick={() => {
              navigate("/cart");
            }}
            editTitle={
              activeCartData && activeCartData.length > 2
                ? `Еще ${toTrueWordForm(activeCartData.length - 2, [
                    "товар",
                    "товара",
                    "товаров",
                  ])}`
                : undefined
            }
          >
            {activeCartData &&
              activeCartData.slice(0, 2).map((item) => (
                <div style={{ marginBottom: "3.2rem" }} key={item.id}>
                  <PreviewProduct
                    item={{
                      id: item.id,
                      image: item.product?.picturePath,
                      name: item.product.name,
                      quantity: item.quantity,
                      cost: item.cost,
                    }}
                  />
                </div>
              ))}
            <Typography>
              {deliveryType === 1 ? "Доставка курьером" : "Самовывоз"}
            </Typography>
            <hr />
            <Typography className={cx("cart-price")}>
              Итого
              <span>{`${numberWithSpaces(total)} ₽`}</span>
            </Typography>
            <Typography className={cx("cart-discount")}>
              Скидка
              <span>{`${numberWithSpaces(total - totalOldPrice)} ₽`}</span>
            </Typography>
            {!hideButton && (
              <Button
                style={{ width: "100%", marginTop: "2.8rem" }}
                variant="contained"
                color="primary"
                disabled={cartLoading || total === 0}
                onClick={() =>
                  activeCartData &&
                  handleOrder([...activeCartData.map((x) => x.id)])
                }
              >
                {cartLoading && <QCircularProgress size={24} />} Оплатить
              </Button>
            )}
          </QCard>
        </>
      )}
    </div>
  );
}

export default CartPreview;
