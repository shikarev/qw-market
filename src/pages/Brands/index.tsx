import styles from './brands.module.scss';
import classNames from "classnames/bind";
import { Link, Route,Routes, useLocation, useNavigate } from 'react-router-dom';
import BrandsCatalog from '../../components/Brands/Catalog';
import BreadCrumbs, {IBreadCrumb} from '../../components/common/BreadCrumbs';
import Categories from '../../components/Brands/Categories';
import {useGetRootCategoriesQuery} from '../../api/categories';
import {useState, useEffect} from 'react';
import BrandCard from '../../components/Brands/BrandCard';
import {useSearchManufacturersQuery} from '../../api/search';

import {toTrueWordForm} from "../../utils/toTrueWordForm";
import _ from "lodash";
import cuid from "cuid";
import {useGetCategoryPathByCategoryIdQuery} from "../../api/product";
import placeholder from '../../assets/placeHolders/noImagePlaceholder.svg';
import QwSwiper from "../../components/QwSwiper";
import {SwiperSlide} from "swiper/react";
import {Box, Typography} from "@mui/material";
import { imageOnErrorHandler } from '../../utils/imgError';

const cx = classNames.bind(styles)

export const BrandLabel = ({name, picture, id}: any) => {
    const navigate = useNavigate();

    function handleClick(id: string) {
      navigate(`/brands/id?id=${id}`);
    }

    return (
        <Box className={cx('brand')} onClick={() => handleClick(id)}>
            <img src={picture || placeholder} alt="" onError={imageOnErrorHandler}  />
        </Box>
    )
}

const BrandsPage = (props) => {
    const {data, isLoading} = useGetRootCategoriesQuery();

    const [category, setCategory] = useState<IBreadCrumb | null>(null);
    const [brand, setBrand] = useState<{ name: string, url: string } | null>(null);
    const categoryId = props.location?.search?.replace('?id=', '') || '';

    const {data: popularManufacturersData} = useSearchManufacturersQuery({limit: 24});
    const location = useLocation();
    let params = new URLSearchParams(location.search);
    const brandId = params.get("id") || '';
    const {data: catData, isFetching: catFetching} = useGetCategoryPathByCategoryIdQuery(brandId, {skip: !brandId});

    function setCategoryBreadcrumbs(id: string | undefined) {
        const cat = data?.find(cat => cat.id === id)
        if (cat) {
            setCategory({url: cat.id, name: cat.name});
        } else {
            setCategory(null);
        }
    }

    useEffect(() => {
        setCategoryBreadcrumbs(categoryId)
        //eslint-disable-next-line
    }, [data])

    return (

        <div className={cx('wrapper')}>
            <BreadCrumbs links={(brand && [{url: brand.url, name: brand.name}]) || (catData && [{
                url: catData.id,
                name: catData.name
            }])}/>
          <Routes>
            <Route index element={
              <>
                <nav>
                    <Typography variant='h1' sx={{mt: '1.6rem'}}>Все бренды</Typography>
                    <Box sx={{display: 'flex'}}>
                        <Typography sx={{
                            color: 'text.secondary',
                            fontWeight: 500,
                            mr: '.8rem'
                        }}> {toTrueWordForm(popularManufacturersData?.total, ['бренд', 'бренда', 'брендов'])} </Typography>
                        <Link to='/brands/cat' className={cx('view-all')}>
                            <Typography color='primary' sx={{fontWeight: 700}}>
                                Посмотреть все
                            </Typography>
                        </Link>
                    </Box>
                </nav>

                <section className={cx('popular')}>
                    <div className={cx('brands')}>

                        {popularManufacturersData &&
                            <QwSwiper
                                title="Популярные бренды"
                                className="carousel-swiper"
                                slidesPerView={1}
                                spaceBetween={16}
                                slidesPerGroup={1}
                                breakpoints={{
                                    "576": {
                                        "slidesPerView": 3,
                                        "spaceBetween": 16,
                                        "slidesPerGroup": 2,
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
                                        "spaceBetween": 16,
                                        "slidesPerGroup": 2,
                                    },
                                    "1400": {
                                        "slidesPerView": 6,
                                        "spaceBetween": 16,
                                        "slidesPerGroup": 3,
                                    }
                                }}
                            >
                                {
                                    _.chunk(popularManufacturersData.data, 3)
                                        .map((brandsGroup) =>
                                            <SwiperSlide key={cuid()}>
                                                <div className={cx('container')}>
                                                    {brandsGroup.map((brand) =>
                                                        <BrandLabel key={brand.id} id={brand.id}
                                                                    picture={brand.picturePath}/>
                                                    )
                                                    }
                                                </div>
                                            </SwiperSlide>
                                        )}
                            </QwSwiper>
                        }
                    </div>
                </section>

                <section>
                    <Categories data={data} isLoading={isLoading}/>
                </section>
              </>}
            />

            <Route path='cat' element={ <BrandsCatalog category={category} brandId={brandId} catData={catData} catFetching={catFetching}/>}/>

            <Route path='id' element={<BrandCard id={categoryId} setBrand={setBrand}/>}/>

          </Routes>
        </div>

    );
}

export default BrandsPage;
