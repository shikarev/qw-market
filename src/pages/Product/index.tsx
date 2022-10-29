import { Box, Typography } from "@mui/material";
import classNames from "classnames/bind";
import React, { useEffect, useState } from "react";
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import {
  useFetchProductByIdQuery,
  useGetProductModOptionByProductIdQuery,
  useGetProductOptionsByProductIdQuery,
  useGetProductPricesByProductIdQuery,
} from "../../api/product";
import { useGetProductQuestionsByProductIdQuery } from "../../api/productQuestions";
import { useGetProductReviewsByProductIdQuery } from "../../api/productReviews";
import ProductBreadCrumbs from "../../components/common/ProductBreadCrumbs";
import IconLink from "../../components/IconLink";
import Description from "../../components/Product/Description";
import FavoritesButtonDefault from "../../components/Product/FavoritesButton/FavoritesButtonDefault";
import FeedbackMini from "../../components/Product/Feedback/FeedbackMini";
import MediaGallery from "../../components/Product/MediaGallery";
import Offers from "../../components/Product/Offers";
import OrderDetails from "../../components/Product/OrderDetails";
import QuestionsPage from "../../components/Product/QuestionsPage";
import ReviewAdd from "../../components/Product/ReviewAdd";
import SuccessMessage from "../../components/Product/ReviewAdd/SuccessMessage";
import Reviews from "../../components/Product/Reviews";
import ShareButtonModal from "../../components/Product/ShareButton/ShareButtonModal";
import ShortInfo from "../../components/Product/ShortInfo";
import Specs from "../../components/Product/Specs";
import WishesButtonDefault from "../../components/Product/WishesButton/WishesButtonDefault";
import { Questions } from "../../components/svgComponents/Icons/outlined";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getModOptions, setModOptionsFromUrl } from "../../store/modOption";
import { IModificationOptions } from "../../types/Product";
import { toTrueWordForm } from "../../utils/toTrueWordForm";
import styles from "./product.module.scss";
import {
  setProduct,
  setProductPrices,
  setProductReviews,
} from "../../store/product";
import ProductHeader from "../../components/Product/ProductHeader";
import ProductLayout from "../../components/Product/ProductLayout";

const cx = classNames.bind(styles);

export const getDiscount = (oldPrice: number, newPrice: number) => {
  let discount = 100 - (newPrice / oldPrice) * 100;
  return discount > 0 ? discount.toFixed(0) : 0;
};

const ProductCard = () => {
  const { id: productId } = useParams();
  const { data } = useFetchProductByIdQuery(productId, { skip: !productId });

  useEffect(() => {
    if (data) {
      dispatch(setProduct(data));
    }
  }, [data]);

  const modsOptions = useAppSelector(getModOptions);

  const dispatch = useAppDispatch();

  useEffect(() => {
    let searchParams = new URLSearchParams(window.location.search);
    const currentUrl = searchParams.toString().split("&");
    if (data?.modificationOptions) {
      const modifications = data.modificationOptions
        .reduce<string>((prev: string, curr: IModificationOptions) => {
          const found = currentUrl.find((x) => x.includes(curr.optionId));
          if (found) {
            const foundObj = found.split("=");
            return `${prev}${foundObj[0]}=${foundObj[1]}&`;
          }

          return `${prev}${curr.optionId}=${curr.optionValueId}&`;
        }, "")
        .slice(0, -1);

      let newurl =
        window.location.protocol +
        "//" +
        window.location.host +
        window.location.pathname +
        "?" +
        modifications;
      window.history.replaceState({ path: newurl }, "", newurl);
      dispatch(setModOptionsFromUrl(window.location.search.slice(1)));
    }
  }, [data, dispatch]);

  let productMod = new URLSearchParams(window.location.search).toString();

  const { data: productPrices, isFetching: productPricesIsFetching } =
    useGetProductPricesByProductIdQuery(
      { id: productId, modStr: modsOptions },
      { skip: !productId }
    );

  useEffect(() => {
    if (productPrices) {
      dispatch(setProductPrices(productPrices));
    }
  }, [productPrices]);

  let minPrices = Math.min(...(productPrices?.data.map((x) => x.cost) || [0]));

  let stateChecks: number[] = [];
  const [rates, setRates] = useState(stateChecks);

  const location = useLocation();
  const navigate = useNavigate();
  let params = new URLSearchParams(location.search);

  const page = params.get("page") || "1";

  const { data: productReviews } = useGetProductReviewsByProductIdQuery(
    {
      productId,
      page: Number(page),
      limit: 10,
      rates: rates,
      sort: "created",
      sortType: "DESC",
    },
    { skip: !productId }
  );

  useEffect(() => {
    if (productReviews) {
      dispatch(setProductReviews(productReviews));
    }
  }, [productReviews]);

  const { data: productQuestions } = useGetProductQuestionsByProductIdQuery(
    {
      productId,
      page: Number(page),
      limit: 10,
    },
    { skip: !productId }
  );

  const { data: modOptions } =
    useGetProductModOptionByProductIdQuery(productId);

  function handlePagination(num: number) {
    params.set("page", num.toString());
    navigate("?" + params.toString());
  }

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    handlePagination(value);
  };

  const { data: productOptions } = useGetProductOptionsByProductIdQuery(
    productId,
    { skip: !productId }
  );

  const handleClickQuestions = () => {
    navigate(`questions?${productMod}`);
  };

  return (
    <Routes>
      <Route path="/" element={<ProductLayout />}>
        <Route
          index
          element={
            <Box className={cx("wrapper")}>
              {data && productPrices && (
                <>
                  <Box className={cx("main")}>
                    <ProductBreadCrumbs categoryId={data?.categoryId || ""} />

                    <Typography
                      variant="h1"
                      sx={{ pt: "1.6rem" }}
                      className={cx("title")}
                    >
                      {data.name || "Без названия"}
                    </Typography>

                    <Description
                      rating={data.rating}
                      points={productReviews?.total}
                      purchaseCount={data.purchaseCount}
                      productId={data.id}
                    />

                    <Box className={cx("actions")}>
                      <FavoritesButtonDefault productId={data.id} />

                      <WishesButtonDefault productId={data.id} />

                      <ShareButtonModal />

                      <IconLink
                        className={cx("hidable")}
                        icon={Questions}
                        text={toTrueWordForm(data.questionCount, [
                          "вопрос",
                          "вопроса",
                          "вопросов",
                        ])}
                        active={false}
                        callback={() => handleClickQuestions()}
                      />
                    </Box>

                    <Box className={cx("product-grid")}>
                      <Box className={cx("product")}>
                        <MediaGallery productId={data.id || ""} />
                      </Box>

                      <Box className={cx("shortInfo")}>
                        <ShortInfo
                          manufacturerLogo={data?.manufacturer?.picturePath}
                          manufacturerName={data?.manufacturer?.name}
                          manufacturerId={data?.manufacturer?.id}
                          shortInfo={data?.mainOptions}
                          modOptions={modOptions}
                          modStr={data.modStr || ""}
                        />
                      </Box>

                      <Box className={cx("details")}>
                        <OrderDetails
                          cost={data.cost}
                          oldCost={data.oldCost}
                          currency={data.currencyName || "₽"}
                          points={data.points}
                          productId={data.id}
                          productMod={productMod}
                          vendorName={data?.vendor?.name}
                          vendorRating={data?.vendor?.rating}
                          vendorFeedback={data?.vendor?.feedback_count}
                          vendorPayment={data.vendorPayments}
                          vendorDelivery={data.vendorDeliveries}
                          offersCount={productPrices.total}
                          minCost={minPrices}
                          isFetching={productPricesIsFetching}
                          priceId={data.priceId}
                        />
                      </Box>
                    </Box>
                  </Box>

                  {data && productOptions && (
                    <Box className={cx("specs")}>
                      <Specs
                        desc={data.description}
                        manuf={data.manufacturePlace}
                        productId={data.id || ""}
                        optionsData={productOptions}
                      />
                    </Box>
                  )}

                  {data && productReviews && (
                    <div className={cx("feedback")}>
                      <FeedbackMini
                        reviewsData={productReviews}
                        productId={data.id || ""}
                        total={productReviews?.total}
                        setRates={setRates}
                        rates={rates}
                      />
                    </div>
                  )}
                </>
              )}
            </Box>
          }
        />
        <Route path="/" element={<ProductHeader />}>
          {data && productPrices && (
            <Route
              path="offers"
              element={
                <Offers
                  productId={data.id || ""}
                  vendorData={productPrices}
                  productName={data.name || ""}
                  pagination={handleChange}
                  currency={data.currencyName}
                />
              }
            />
          )}

          {data && productPrices && productQuestions && (
            <Route
              path="questions"
              element={
                <QuestionsPage
                  questionsData={productQuestions}
                  vendorId={data?.vendor?.id}
                  pagination={handleChange}
                  pageCount={productQuestions?.pageCount}
                  page={page}
                  rates={rates}
                  setRates={setRates}
                />
              }
            />
          )}

          {data && productPrices && productReviews && (
            <Route
              path="reviews"
              element={
                <Reviews
                  productId={data.id || ""}
                  pagination={handleChange}
                  pageCount={productReviews?.pageCount}
                  page={page}
                  rates={rates}
                  setRates={setRates}
                />
              }
            />
          )}
        </Route>
      </Route>

      {data && (
        <Route
          path="reviews/form"
          element={
            <ReviewAdd
              productId={data?.id}
              vendorId={data?.vendor?.id}
              productName={data?.name ?? ""}
              productImage={data?.picturePath}
            />
          }
        />
      )}

      {data && (
        <Route
          path="reviews/form/success"
          element={<SuccessMessage productId={data?.id} />}
        />
      )}
    </Routes>
  );
};

export default ProductCard;
