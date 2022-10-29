import { Grid, Typography } from '@mui/material';
import { ProductCard } from '@qwangy/styles';
import classNames from 'classnames/bind';
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SwiperSlide } from 'swiper/react';
import { useGetManufacturerByIdQuery, useGetManufacturerCategoriesQuery } from '../../../api/manufacturer';
import { useGetProductsQuery } from '../../../api/product';
import { IProductData } from '../../../types/Product';
import CartButton from '../../Cart/CartButton';
import { QCategoryCardSkeleton } from '../../common/Skeletons';
import FavoritesButtonMini from '../../Product/FavoritesButton/FavoritesButtonMini';
import WishesButtonMini from '../../Product/WishesButton/WishesButtonMini';
import QwSwiper from '../../QwSwiper';
import Products from '../Products';
import styles from './brand-card.module.scss';

const cx = classNames.bind(styles)

const BrandCard = ({setBrand}: { id: string, setBrand: any }) => {
    const location = useLocation();
    const navigate = useNavigate();
    let params = new URLSearchParams(location.search);
    const page = params.get("page") || '1';
    const brandId = params.get("id") || '';

    function setPage(num: number) {
        params.set('page', num.toString());
        navigate("?" + params.toString());
    }

    const {data: brandData} = useGetManufacturerByIdQuery(
        {query: brandId}, {skip: !brandId});


    useEffect(() => {
        if (brandData?.name) {
            setBrand({name: brandData.name, url: ''})
        } else {
            setBrand(null)
        }
        //eslint-disable-next-line
    }, [brandData])

    const {brandProductsData} = useGetProductsQuery(
        {manufacturer: brandId}, {
            skip: !brandId,
            selectFromResult: ({data, isFetching, error}) => ({
                brandProductsData: data?.data,
                brandProductsFetching: isFetching,
                brandProductsError: error
            })
        });

    const {
        data: brandCategoryData,
        isFetching: brandCategoryFetching
    } = useGetManufacturerCategoriesQuery({id: brandId, page: parseInt(page)}, {skip: !brandId});

    const handleClick = (categoryId: string) => {
       navigate(`/subcategory/${categoryId}?manufacturer=${brandId}`)
    }

    if (!page) {
      navigate(`/brands/id?id=${brandId}&page=1`)
    }

    const handleClickProduct = (id: string) => {
      navigate(`/product/${id}`)
    }

    return (
        <div key='brands-prod' className={cx('root')}>
            <Typography variant='h1'>Товары бренда {brandData?.name || ''}</Typography>
            {brandCategoryFetching ? <div className={cx('products')}>
                    <Grid container spacing={2}>
                        {[...Array(12)].map((item, index) => <Grid key={index} item sm={6} md={4} xs={12} lg={3}>
                            <QCategoryCardSkeleton/>
                        </Grid>)}
                    </Grid>
                </div>
                :
                brandCategoryData ?
                    <div className={cx('products')}>
                        <Products page={parseInt(page)} data={brandCategoryData} handleClick={handleClick}
                                  onChange={setPage}/>
                    </div>
                    :
                    <Typography>ошибка</Typography>
            }

            <div className={cx('block')}>
                <QwSwiper
                    title="Скидки на популярные товары бренда"
                    className="view-swiper"
                    slidesPerView={1}
                    spaceBetween={94}
                    slidesPerGroup={1}
                    speed={500}
                    breakpoints={{
                        "576": {
                            "slidesPerView": 2,
                            "spaceBetween": 16,
                            "slidesPerGroup": 1,
                        },
                        "768": {
                            "slidesPerView": 3,
                            "spaceBetween": 16,
                            "slidesPerGroup": 2,
                        },
                        "992": {
                            "slidesPerView": 4,
                            "spaceBetween": 16,
                            "slidesPerGroup": 3,
                        },
                        "1200": {
                            "slidesPerView": 5,
                            "spaceBetween": 28,
                            "slidesPerGroup": 3,
                        },
                        "1400": {
                            "slidesPerView": 5,
                            "spaceBetween": 48,
                            "slidesPerGroup": 3,
                        }
                    }}
                >
                    {brandProductsData && brandProductsData.map((product: IProductData) =>
                        <SwiperSlide key={product.id}>
                            <div className={cx('card')}>
                                <ProductCard
                                    key={product.id}
                                    id={product.id}
                                    name={product.name}
                                    cost={product.cost}
                                    oldCost={product.oldCost}
                                    picturePath={product.picturePath}
                                    currencyName={product.currencyName}
                                    rating={product.rating}
                                    feedbackCount={product.feedbackCount || 0}
                                    points={product.points}
                                    inCart={product.inCart}
                                    inFavorite={product.inFavorite}
                                    FavoritesToggle={<FavoritesButtonMini productId={product.id}
                                                                          inFavorite={product.inFavorite}/>}
                                    WishesToggle={<WishesButtonMini productId={product.id}
                                                                    inWish={product.inWish}/>}
                                    CartButton={<CartButton key={product.id + 'cart'} productId={product.id} priceId={product.priceId}/>}
                                    onClick={handleClick}
                                />
                            </div>
                        </SwiperSlide>
                    )}
                </QwSwiper>
            </div>

            <div className={cx('block')}>
                <QwSwiper
                    title="Смотрите также"
                    className="view-swiper"
                    slidesPerView={1}
                    spaceBetween={94}
                    slidesPerGroup={1}
                    speed={500}
                    breakpoints={{
                        "576": {
                            "slidesPerView": 2,
                            "spaceBetween": 16,
                            "slidesPerGroup": 1,
                        },
                        "768": {
                            "slidesPerView": 3,
                            "spaceBetween": 16,
                            "slidesPerGroup": 2,
                        },
                        "992": {
                            "slidesPerView": 4,
                            "spaceBetween": 16,
                            "slidesPerGroup": 3,
                        },
                        "1200": {
                            "slidesPerView": 5,
                            "spaceBetween": 28,
                            "slidesPerGroup": 3,
                        },
                        "1400": {
                            "slidesPerView": 5,
                            "spaceBetween": 48,
                            "slidesPerGroup": 3,
                        }
                    }}
                >
                    {brandProductsData && brandProductsData.map((product: IProductData, index: number) =>
                        <SwiperSlide key={product.id}>
                            <div className={cx('card')}>
                                <ProductCard
                                    key={product.id}
                                    id={product.id}
                                    name={product.name}
                                    cost={product.cost}
                                    oldCost={product.oldCost}
                                    picturePath={product.picturePath}
                                    currencyName={product.currencyName}
                                    rating={product.rating}
                                    feedbackCount={product.feedbackCount || 0}
                                    points={product.points}
                                    inCart={product.inCart}
                                    inFavorite={product.inFavorite}
                                    FavoritesToggle={<FavoritesButtonMini productId={product.id}
                                                                          inFavorite={product.inFavorite}/>}
                                    WishesToggle={<WishesButtonMini productId={product.id}
                                                                    inWish={product.inWish}/>}
                                    CartButton={<CartButton key={product.id + 'cart'} productId={product.id} priceId={product.priceId}/>}
                                    onClick={handleClick}
                                />
                            </div>
                        </SwiperSlide>
                    )}
                </QwSwiper>
            </div>
        </div>
    )
};

export default BrandCard;
