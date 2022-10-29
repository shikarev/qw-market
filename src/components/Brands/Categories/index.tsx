import { Typography } from '@mui/material';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import { SwiperSlide } from 'swiper/react';
import { ICatalogCategory } from '../../../types/Catalog';
import QwSwiper from '../../QwSwiper';
import { Category } from '../Products';
import styles from './categories.module.scss';

const cx = classNames.bind(styles);

function Categories({data, isLoading}: { data: ICatalogCategory[] | undefined, isLoading: boolean }) {
    const navigate = useNavigate();

    const handleClick = (categoryId: string) => {
      navigate(`/brands/cat?id=${categoryId}`);
    }

    return (
        <div className={cx('wrapper')}>
            {isLoading ?
                <Typography>загрузка</Typography>
                :
                data &&
                <QwSwiper
                    title="Бренды в категориях"
                    className="carousel-swiper"
                    slidesPerView={2}
                    spaceBetween={16}
                    slidesPerGroup={1}
                    breakpoints={{
                        "576": {
                            "slidesPerView": 4,
                            "spaceBetween": 16,
                            "slidesPerGroup": 2,
                        },
                        "768": {
                            "slidesPerView": 4,
                            "spaceBetween": 16,
                            "slidesPerGroup": 2,
                        },
                        "992": {
                            "slidesPerView": 5,
                            "spaceBetween": 16,
                            "slidesPerGroup": 3,
                        },
                        "1200": {
                            "slidesPerView": 5,
                            "spaceBetween": 16,
                            "slidesPerGroup": 3,
                        },
                        "1400": {
                            "slidesPerView": 5,
                            "spaceBetween": 16,
                            "slidesPerGroup": 3,
                        }
                    }}
                >
                        {data.map(item =>
                            <SwiperSlide key={item.id}>
                                <div className={cx('category')}>
                                    <Category onClick={() => handleClick(item.id)} title={item.name}
                                              picture={item.picture_path}/>
                                </div>
                            </SwiperSlide>
                        )}
                </QwSwiper>
            }
        </div>
    );
}

export default Categories;
