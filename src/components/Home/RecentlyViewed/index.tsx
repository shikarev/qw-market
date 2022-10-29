import { ProductCard } from '@qwangy/styles';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SwiperSlide } from 'swiper/react';
import { useGetViewHistoryQuery } from '../../../api/viewHistory';
import { getIsAuth } from '../../../store/auth';
import { useAppSelector } from '../../../store/hooks';
import { ProductCardProps } from '../../../types/Product';
import CartButton from '../../Cart/CartButton';
import FavoritesButtonMini from '../../Product/FavoritesButton/FavoritesButtonMini';
import WishesButtonMini from '../../Product/WishesButton/WishesButtonMini';
import QwSwiper from '../../QwSwiper';

const RecentlyViewed = () => {
  const isAuth =  useAppSelector(getIsAuth);
    const navigate = useNavigate()

    const [page, setPage] = useState(1)

    const limit = 10
    const viewHistoryLimit = 30

    const {data: viewHistory, total, isLoading} = useGetViewHistoryQuery({page, limit}, {skip: !isAuth, selectFromResult:({data, isLoading}) => ({
            data: data?.data,
            total: data?.['total'],
            isLoading: isLoading,
        })
    });

    const [slides, setSlides] = useState<ProductCardProps[]>([]);

    function setViewHistory() {
        if(viewHistory) {
            if(page === 1) {
                setSlides(viewHistory)
            } else {
                setSlides( [...slides, ...viewHistory])
            }
        }
    }

    useEffect(() => {
        setViewHistory()
    },[viewHistory])

    function handlePage() {
        if(viewHistory && total) {
            if(total > limit * (page+1) && limit * (page+1) <= viewHistoryLimit){
                setPage(page + 1)
            }
        }
    }

    const handleClick = (id: string) => {
      navigate(`/product/${id}`)
    }

    return (
        <>
            {(!isLoading && viewHistory) &&
                <QwSwiper
                    title="Вы недавно смотрели"
                    className="view-swiper"
                    slidesPerView={1}
                    spaceBetween={94}
                    slidesPerGroup={1}
                    speed={500}
                    onReachEnd={handlePage}
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
                            "slidesPerGroup": 2,
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
                    {slides && slides.map(item =>
                        <SwiperSlide key={item.id} style={{minWidth: '20rem', paddingTop: '1rem'}}>
                            <ProductCard
                                {...item}
                                FavoritesToggle={<FavoritesButtonMini productId={item.id} inFavorite={item.inFavorite}/>}
                                WishesToggle={<WishesButtonMini productId={item.id} inWish={item.inWish}/>}
                                onClick={() => handleClick(item.id)}
                                CartButton={<CartButton key={item.id} productId={item.id} priceId={item.priceId}/>}
                            />
                        </SwiperSlide>
                    )}
                </QwSwiper>
            }
        </>
    );
};

export default RecentlyViewed;
