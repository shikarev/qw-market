import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  IconButton,
  styled,
  SvgIcon,
  TextField,
  Typography,
} from "@mui/material";
import CartProductQuantityControl from "../../components/Cart/CartProductQuantityControl";
import { ReactComponent as EmptyCartIcon } from "../../assets/Icons/empty-cart.svg?svgr";
import { QCheckbox, QFormControlLabel } from "../../components/common/Controls";
import { DeleteIcon } from "../../components/svgComponents/Icons";
import { CartProductStatus, ICartItem } from "../../types/Cart";
import { numberWithSpaces } from "../../utils/numberWithSpaces";
import noPictureImage from "../../assets/placeHolders/noImagePlaceholder.svg";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { debounceTime } from "../../utils/utils";
import classNames from "classnames/bind";
import styles from "./styles.module.scss";

import {
  useGetCartDetailsQuery,
  useUpdateMutation,
  useUpdateStatusesMutation,
} from "../../api/cart";
import { useGetProductsQuery } from "../../api/product";
import { IProductData } from "../../types/Product";
import CartProductDeleteConfirmDialog from "../../components/Cart/CartProductDeleteConfirmDialog";
import { useCalculatorMutation } from "../../api/remoteCart";
import { currency } from "../../store/currency";
import { useAppSelector } from "../../store/hooks";
import QwSwiper from "../../components/QwSwiper";
import { createStyles, makeStyles } from "@mui/styles";
import { ProductCard } from "@qwangy/styles";
import FavoritesButtonMini from "../../components/Product/FavoritesButton/FavoritesButtonMini";
import WishesButtonMini from "../../components/Product/WishesButton/WishesButtonMini";
import CartButton from "../../components/Cart/CartButton";
import { SwiperSlide } from "swiper/react";
import { imageOnErrorHandler } from "../../utils/imgError";

const useStyles = makeStyles(() =>
  createStyles({
    h3: {
      margin: "16px auto 64px",
    },
    emptyCartIcon: {
      width: 227,
      height: 195,
      fill: "none",
    },
    input: {
      borderRadius: "10rem",
    },
    AlsoOfBuyProducts: {
      margin: "130px 0",
      // [theme.breakpoints.down('sm')]: {
      //     margin: '30px 0',
      // }
    },
  })
);

const cx = classNames.bind(styles);

const EmptyCart = () => {
  // @ts-ignore
  const cls = useStyles();
  return (
    <Box>
      <Typography variant="h1" className={cx("cart_page-name")}>
        Корзина пуста
      </Typography>
      <Typography variant="h3" className={cx(cls.h3)}>
        Воспользуйтесь поиском, чтобы найти всё что нужно.
      </Typography>
      <SvgIcon
        className={cx(cls.emptyCartIcon)}
        component={EmptyCartIcon}
        width="205"
        height="176"
        viewBox="0 0 205 176"
        fill="none"
      />
    </Box>
  );
};

const PromoCodeTextField = styled(TextField)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
  "& .MuiInputBase-root": {},
  "& .MuiOutlinedInput-input": {
    boxSizing: "border-box",
    height: "50px",
    fontSize: "16px",
    "&::placeholder": {
      color: "#777",
    },
    "&:focus::placeholder": {
      color: "transparent",
    },
    [theme.breakpoints.up("lg")]: {
      textAlign: "center",
    },
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "2px solid #DFDFDF",
    borderRadius: "32px",
    [theme.breakpoints.down("md")]: {
      border: "none",
    },
  },
  "& .MuiOutlinedInput-root:not(.Mui-focused):hover": {
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#C5C5C5",
    },
    "& .MuiOutlinedInput-input": {
      "&::placeholder": {
        color: "#333",
      },
    },
  },
}));

const PromoCodeButton = styled(Button)(({ theme }) => ({
  fontWeight: 600,
  "&.Mui-disabled": {
    color: theme.palette.primary.main,
    cursor: "not-allowed",
    pointerEvents: "auto",
    opacity: "0.6",
  },
}));

const MobileCheckputFormBox = styled(Box)(({ theme }) => ({
  boxShadow: "0px 2px 10px rgb(0 0 0 / 15%)",
  border: "2px solid #FFFFFF",
  borderRadius: "14px",
  background: "white",
  position: "fixed",
  padding: "12px",
  zIndex: 100,
  [theme.breakpoints.up("lg")]: {
    display: "none",
  },
}));

const PromoCodeGrid = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    border: "2px solid #DFDFDF",
    borderRadius: "32px",
  },
}));

const PromoCodeButtonBox = styled(Box)(({ theme }) => ({
  display: "flex",
  height: "100%",
  justifyContent: "flex-end",
  [theme.breakpoints.down("md")]: {
    paddingRight: theme.spacing(2),
  },
}));

const MyIconButton = styled(IconButton)(() => ({
  padding: ".8rem",
}));

const PromoCodeForm = () => {
  const [promoCode, setPromoCode] = useState("");

  function formSubmitHandler(e: FormEvent) {
    e.preventDefault();
  }

  return (
    <form onSubmit={formSubmitHandler}>
      <PromoCodeGrid container sx={{ justifyContent: "space-between" }}>
        <Grid item lg={7} md={10}>
          <PromoCodeTextField
            onChange={(e) => setPromoCode(e.target.value.trim())}
            placeholder="Введите промокод"
            variant="outlined"
            fullWidth={true}
            sx={{ maxWidth: "19rem" }}
            inputProps={
              {
                // maxLength: 10
              }
            }
          />
        </Grid>
        <Grid item lg={5} md={2}>
          <PromoCodeButtonBox>
            <PromoCodeButton
              variant="text"
              color="primary"
              size="medium"
              type="submit"
              disabled={!promoCode.length}
            >
              Применить
            </PromoCodeButton>
          </PromoCodeButtonBox>
        </Grid>
      </PromoCodeGrid>
    </form>
  );
};

interface CartItemProps {
  onSelectionChange?: (id: string, selection: boolean) => void;
  onQuantityChange?: (id: string, quantity: number) => void;
  onDelete?: (id: string) => void;
  cartItem: ICartItem;
}

const CartItem = (props: CartItemProps) => {
  const { onSelectionChange, onQuantityChange, onDelete, cartItem } = props;
  const [checked, setChecked] = useState(false);
  const [cartProductUpdate] = useUpdateMutation();
  const product = cartItem.product;

  useEffect(() => {
    setChecked(cartItem.status === CartProductStatus.ACTIVE);
  }, [cartItem.status]);

  function SelectionHendler(
    e: ChangeEvent<HTMLInputElement>,
    checked: boolean
  ): void {
    setChecked(checked);
    if (onSelectionChange) {
      onSelectionChange(cartItem.id, checked);
    }
  }

  function deleteHandler(): void {
    if (onDelete) {
      onDelete(cartItem.id);
    }
  }

  return (
    <>
      <Box
        alignItems="center"
        className={`${cx("cart-item", "cart-item_desktop")}`}
      >
        <QCheckbox
          color="primary"
          checked={checked}
          onChange={SelectionHendler}
          className={cx("cart-item_selection-checkbox")}
        />

        <Box mx={3}>
          <RouterLink to={`/product/${product.id}`}>
            <Box className={cx("cart-item_image")}>
              <Box
                component="img"
                src={product.picturePath || noPictureImage}
                onError={imageOnErrorHandler}
                sx={{ objectFit: "contain", width: "75%", height: "75%" }}
              />
            </Box>
          </RouterLink>
        </Box>

        <Box className={cx("cart-item_product-name")}>
          <RouterLink to={`/product/${product.id}`}>
            <Typography sx={{ fontWeight: 500 }}>{product.name}</Typography>
          </RouterLink>
        </Box>

        <Box mx={3}>
          <CartProductQuantityControl
            className={cx("cart-item-counter")}
            cartItem={cartItem}
            value={cartItem.quantity}
          />
        </Box>

        <Box mx={3} className={cx("cart-item_price")}>
          <div className={cx("container")}>
            <Typography className={cx("cost")}>{`${numberWithSpaces(
              cartItem.cost || 0
            )} ₽`}</Typography>
            <MyIconButton onClick={deleteHandler}>
              <SvgIcon
                component={DeleteIcon}
                className={cx("cart-item_delete-icon")}
              />
            </MyIconButton>
          </div>
          {cartItem.oldCost && (
            <Typography className={cx("old-cost")}>{`${numberWithSpaces(
              cartItem.oldCost || 0
            )} ₽`}</Typography>
          )}
        </Box>

        {/*<Box mx={3}>
                    <MyIconButton onClick={deleteHandler}>
                        <SvgIcon component={DeleteIcon} className={cx('cart-item_delete-icon')}/>
                    </MyIconButton>
                </Box>*/}
      </Box>

      <Box
        flexDirection="column"
        className={`${cx("cart-item", "cart-item_mobile")}`}
      >
        <Box display="flex" alignItems="center">
          <Box display="flex">
            <QCheckbox
              color="primary"
              checked={checked}
              onChange={SelectionHendler}
              className={cx("cart-item_selection-checkbox")}
            />
            <Box ml={1} mr={2}>
              <RouterLink to={`/product/${product.id}`}>
                <span
                  className={cx("cart-item_image")}
                  style={{
                    backgroundImage: `url(${
                      product.picturePath || noPictureImage
                    })`,
                  }}
                />
              </RouterLink>
            </Box>
          </Box>
          <Box display="flex" flexDirection="column">
            <Typography
              className={cx("cart-item_price", "item-m")}
            >{`${numberWithSpaces(cartItem.cost || 0)} ₽`}</Typography>
            {cartItem.oldCost && (
              <Typography className={cx("old-cost")}>{`${numberWithSpaces(
                cartItem.oldCost || 0
              )} ₽`}</Typography>
            )}

            <Typography className={cx("cart-item_product-name")}>
              <RouterLink to={`/product/${product.id}`}>
                {product.name}
              </RouterLink>
            </Typography>
          </Box>
        </Box>
        <Box
          mt={3}
          pl={5}
          display="flex"
          alignContent="center"
          justifyContent="space-between"
        >
          <CartProductQuantityControl
            className={cx("cart-item_counter")}
            cartItem={cartItem}
            value={cartItem.quantity}
          />
          <IconButton onClick={deleteHandler}>
            <SvgIcon
              component={DeleteIcon}
              className={cx("cart-item_delete-icon")}
            />
          </IconButton>
        </Box>
      </Box>
    </>
  );
};

const AlsoOfBuyProducts = (props: any): JSX.Element => {
  const { products } = useGetProductsQuery(
    {},
    {
      skip: false,
      selectFromResult: ({ data, isFetching, error }) => ({
        products: data?.data,
        productsFetching: isFetching,
        productsError: error,
      }),
    }
  );

  const navigate = useNavigate();

  const handleClick = (id: string) => {
    navigate(`/product/${id}`);
  };

  return (
    <div {...props}>
      {products && (
        <div className={cx("block")}>
          <QwSwiper
            title="Часто покупают"
            className="view-swiper"
            slidesPerView={1}
            spaceBetween={94}
            slidesPerGroup={1}
            speed={500}
            breakpoints={{
              "576": {
                slidesPerView: 2,
                spaceBetween: 16,
                slidesPerGroup: 1,
              },
              "768": {
                slidesPerView: 3,
                spaceBetween: 16,
                slidesPerGroup: 2,
              },
              "992": {
                slidesPerView: 4,
                spaceBetween: 16,
                slidesPerGroup: 3,
              },
              "1200": {
                slidesPerView: 5,
                spaceBetween: 28,
                slidesPerGroup: 3,
              },
              "1400": {
                slidesPerView: 5,
                spaceBetween: 48,
                slidesPerGroup: 3,
              },
            }}
          >
            {products.map((item: IProductData, index: number) => (
              <SwiperSlide key={index} style={{ paddingTop: "1rem" }}>
                {/*<div className={cx('card')}>
                                    <SmallCard {...item} onOpenProduct={() => handleClick(item.id)} />
                                </div>*/}
                <ProductCard
                  id={item.id}
                  name={item.name}
                  cost={item.cost}
                  priceId={item.priceId}
                  oldCost={item.oldCost}
                  points={item.points}
                  rating={item.rating}
                  feedbackCount={item.feedbackCount}
                  picturePath={item.picturePath}
                  currencyId={item.currencyId}
                  currencyName={item.currencyName}
                  inCart={item.inCart}
                  inFavorite={item.inFavorite}
                  inWish={item.inWish}
                  FavoritesToggle={
                    <FavoritesButtonMini
                      productId={item.id}
                      inFavorite={item.inFavorite}
                    />
                  }
                  WishesToggle={
                    <WishesButtonMini
                      productId={item.id}
                      inWish={item.inWish}
                    />
                  }
                  onClick={() => handleClick(item.id)}
                  CartButton={
                    <CartButton productId={item.id} priceId={item.priceId} />
                  }
                />
              </SwiperSlide>
            ))}
          </QwSwiper>
        </div>

        /*<SlickCarousel title={`Часто покупают`}>
                    {products.map((item: IProductData, index: number) =>
                        <div key={index} className={cx('card')}>
                            <SmallCard {...item}/>
                        </div>
                    )}
                </SlickCarousel>*/
      )}
    </div>
  );
};

const CheckoutButton = ({
  children,
  size,
}: {
  children: any;
  size?: "medium" | "small";
}) => {
  const navigate = useNavigate();

  return (
    <Button
      onClick={() => {
        navigate("/order");
      }}
      className={cx("checkout-btn")}
      variant="contained"
      color="primary"
      size={size}
    >
      {children}
    </Button>
  );
};

const Loading = () => <Typography>Загрузка...</Typography>;

const CartContent = ({ items }: { items: ICartItem[] }) => {
  const [currentItems, setCurrentItems] = useState<ICartItem[]>(() => []);
  const [selectedItemIds, setSelectedItemIds] = useState<string[]>(() => []);
  const [selectedItems, setSelectedItems] = useState<ICartItem[]>([]);
  const [itemIdsForDelete, setItemIdsForDelete] = useState<string[]>([]);
  const [deleteConfirmDialogOpen, setDeleteConfirmDialogOpen] =
    useState<boolean>(false);
  const [calculatorResult, setCalculatorResult] = useState<{
    total: number;
    discount: number;
  }>({
    total: 0,
    discount: 0,
  });
  const [totalQuantity, setTotalQuantity] = useState<number>(0);
  const [updateStatuses] = useUpdateStatusesMutation();
  const [cartProductUpdate] = useUpdateMutation();
  const currencySelector = useAppSelector(currency);
  const [calculator] = useCalculatorMutation();

  const navigate = useNavigate();

  useEffect(() => {
    setCurrentItems(items);
    const selectedItems = items.filter(
      (it) => it.status === CartProductStatus.ACTIVE
    );
    setSelectedItemIds(() => selectedItems.map((it) => it.id));
  }, [items]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSelectedItems(
        currentItems.filter(({ id }) => selectedItemIds.includes(id))
      );
    }, 10);
    return () => clearTimeout(timer);
  }, [selectedItemIds, currentItems]);

  useEffect(() => {
    if (!selectedItems.length) {
      setCalculatorResult({ total: 0, discount: 0 });
      setTotalQuantity(0);
      return;
    }

    calculator({
      currency: currencySelector.code,
      data: selectedItems.reduce(
        (p, it) => ({ ...p, [it.id]: it.quantity }),
        {}
      ),
    }).then((resp) => {
      if ("data" in resp) {
        setCalculatorResult({
          total: resp.data.summary,
          discount: resp.data.discount || 0,
        });
        const quantities: number[] = selectedItems.map((it) => it.quantity);
        setTotalQuantity(
          !quantities.length ? 0 : quantities.reduce((p, c) => p + c)
        );
      }
    });
  }, [selectedItems]);

  function allSelectionHandler(
    e: ChangeEvent<HTMLInputElement>,
    checked: boolean
  ): void {
    const status = checked ? CartProductStatus.ACTIVE : CartProductStatus.DRAFT;
    updateStatuses(currentItems.map((it) => ({ id: it.id, status })));
  }

  function itemSelectionChangeHandler(
    itemId: string,
    selection: boolean
  ): void {
    setSelectedItemIds((prevState) =>
      selection
        ? [...prevState, itemId]
        : prevState.filter((id) => itemId !== id)
    );
    const status = selection
      ? CartProductStatus.ACTIVE
      : CartProductStatus.DRAFT;
    cartProductUpdate({ id: itemId, status }).then();
  }

  function itemQuantityChangeHandler(itemId: string, quantity: number): void {
    debounceTime(300, () => {
      cartProductUpdate({
        // status: selectedItemIds.includes(itemId) ? CartProductStatus.ACTIVE : CartProductStatus.DRAFT,
        id: itemId,
        quantity,
      });
    });
  }

  function onDeleteItemHandler(itemId: string): void {
    deleteItems([itemId]);
  }

  function onItemsDeleteHandler(): void {
    deleteItems(selectedItemIds);
  }

  function deleteItems(itemIds: string[]): void {
    setItemIdsForDelete(itemIds);
    setDeleteConfirmDialogOpen(true);
  }

  function deleteConfirmDialogCloseHandler() {
    deleteConfirmDialogClose();
  }

  function deleteConfirmDialogClose() {
    setDeleteConfirmDialogOpen(false);
    setItemIdsForDelete([]);
  }

  if (!currentItems.length) {
    return <EmptyCart />;
  }

  return (
    <>
      <CartProductDeleteConfirmDialog
        open={deleteConfirmDialogOpen}
        cartProductIds={itemIdsForDelete}
        onClose={deleteConfirmDialogCloseHandler}
        onConfirm={deleteConfirmDialogCloseHandler}
      />

      <div className={cx("cart")}>
        <Typography variant="h1" className={cx("cart_page-name")}>
          Корзина
        </Typography>
        <div className={cx("cart_content")}>
          <div className={cx("cart_product-list-container")}>
            <div className="mb-5 mb-md-0">
              <QFormControlLabel
                className={cx("cart_all-selection-checkbox")}
                label="Выбрать все товары"
                control={
                  <QCheckbox
                    checked={selectedItemIds.length === currentItems.length}
                    onChange={allSelectionHandler}
                    color="primary"
                  />
                }
              />
              <div className="d-sm-none" />
              <Button
                style={{
                  display: !selectedItemIds.length ? "none" : "inline-flex",
                }}
                className={cx("cart_selected-items-remove-btn")}
                onClick={onItemsDeleteHandler}
                color="primary"
              >
                <SvgIcon component={DeleteIcon} />
                Удалить выбранные
              </Button>
            </div>

            <div className={cx("cart_product-list")}>
              {currentItems.map((it) => (
                <CartItem
                  key={it.id}
                  cartItem={it}
                  onSelectionChange={itemSelectionChangeHandler}
                  onQuantityChange={itemQuantityChangeHandler}
                  onDelete={onDeleteItemHandler}
                />
              ))}
            </div>
          </div>

          <div className={`${cx("cart_sidebar")}`}>
            {" "}
            {/* d-none d-lg-block*/}
            <Grid container spacing={4}>
              <Grid item xs={6} sx={{ padding: "16px" }}>
                <Typography>Товары ({totalQuantity})</Typography>
              </Grid>
              <Grid item xs={6} sx={{ padding: "16px" }}>
                <Typography align="right">
                  {numberWithSpaces(calculatorResult.total || 0)}{" "}
                  {currencySelector.shortName}
                </Typography>
              </Grid>
            </Grid>
            {!!calculatorResult.discount && (
              <Grid container spacing={4}>
                <Grid item xs={6} sx={{ padding: "16px" }}>
                  <Typography>Скидка</Typography>
                </Grid>
                <Grid item xs={6} sx={{ padding: "16px" }}>
                  <Typography color="primary" align="right">
                    - {numberWithSpaces(calculatorResult.discount)}{" "}
                    {currencySelector.shortName}
                  </Typography>
                </Grid>
              </Grid>
            )}
            <Grid container spacing={4} style={{ fontWeight: "bold" }}>
              <Grid item xs={6} sx={{ padding: "16px" }}>
                <Typography sx={{ fontSize: "2rem", fontWeight: 700 }}>
                  Итого
                </Typography>
              </Grid>
              <Grid item xs={6} sx={{ padding: "16px" }}>
                <Typography
                  align="right"
                  component="div"
                  sx={{ fontSize: "2rem", fontWeight: 700 }}
                >
                  {numberWithSpaces(calculatorResult.total || 0)}{" "}
                  {currencySelector.shortName}
                </Typography>
              </Grid>
            </Grid>
            <Box mt={3}>
              <Button
                variant="contained"
                color="primary"
                sx={{
                  fontSize: "1.6rem",
                  fontWeigh: 700,
                  width: "100%",
                  padding: "2.4rem",
                }}
                onClick={() => {
                  navigate("/order");
                }}
              >
                Перейти к оформлению
              </Button>
            </Box>
            <Box mt={3}>
              <PromoCodeForm />
            </Box>
          </div>
        </div>
      </div>

      <MobileCheckputFormBox bottom={10} left={10} right={10}>
        <Grid
          container
          alignItems="center"
          sx={{ fontWeight: "bold", justifyContent: "space-between" }}
        >
          <Grid item>
            <Typography align="right" component="div">
              {numberWithSpaces(calculatorResult.total || 0)}{" "}
              {currencySelector.shortName}
            </Typography>
          </Grid>
          <Grid item>
            <CheckoutButton>Оформить</CheckoutButton>
          </Grid>
        </Grid>
      </MobileCheckputFormBox>
    </>
  );
};

const CartPage = () => {
  const { data } = useGetCartDetailsQuery();
  // @ts-ignore
  const cls = useStyles();
  return (
    <>
      {!data ? <Loading /> : <CartContent items={data} />}
      <AlsoOfBuyProducts className={cx(cls.AlsoOfBuyProducts)} />
    </>
  );
};

export default CartPage;
