import React, {useLayoutEffect, useRef, useState} from "react";

//Geo
import Geocode from "react-geocode";

// Get Query
import {useGetSectionsQuery} from "../../api/sections";

// Styles

import { Skeleton } from '@mui/material';
import classNames from "classnames/bind";
import styles from "./styles.module.scss";

import Category from "./Category";
import {GeoMarker} from "../svgComponents/Icons/outlined";
import {Swiper, SwiperSlide} from "swiper/react";
import SwiperCore, {Navigation, Pagination, A11y} from "swiper";

import "./swiper.scss";
import "./navigation.scss";

const cx = classNames.bind(styles);

SwiperCore.use([Pagination,Navigation, A11y]);



const Sections = () => {

    const prevRef = useRef<HTMLDivElement>(null);
    const nextRef = useRef<HTMLDivElement>(null);

    const [fade, setFade] = useState(styles.prev)
    //const [nextFade, setNextFade] = useState(false)
    //const [midFade, setMidFade] = useState(false)

    const handleProgress = (progress: number) => {
        if(progress <= 0) {
            setFade(styles.next)
        } else if(progress === 1) {
            setFade(styles.prev)
        } else {
            setFade(styles.both)
        }


    }

    const {data, isLoading} = useGetSectionsQuery();
    const [city, setCity] = useState<string>();

    Geocode.setLanguage("ru");
    Geocode.setRegion("am");
    Geocode.setApiKey("AIzaSyAbsoQIf3RuI5HhLbn8t0NI6qfUlqWiaT0");
    Geocode.enableDebug();

    useLayoutEffect(() => {
        navigator.geolocation.getCurrentPosition(
            position => {
                Geocode.fromLatLng(`${position.coords.latitude}`, `${position.coords.longitude}`).then(
                    (response) => {
                        let city, state, country;
                        for (let i = 0; i < response.results[0].address_components.length; i++) {
                            for (let j = 0; j < response.results[0].address_components[i].types.length; j++) {
                                switch (response.results[0].address_components[i].types[j]) {
                                    case "locality":
                                        city = response.results[0].address_components[i].long_name;
                                        break;
                                    case "administrative_area_level_1":
                                        state = response.results[0].address_components[i].long_name;
                                        break;
                                    case "country":
                                        country = response.results[0].address_components[i].long_name;
                                        break;
                                }
                            }
                        }
                        setCity(city);
                    },
                    (error) => {
                        console.error(error);
                    }
                );
            }
        )
    }, [city]);

    /*function compareSectionsTypes(a: Section, b: Section) {
        let typeA = a.type?.toUpperCase() || 'none'; // ignore upper and lowercase
        let typeB = b.type?.toUpperCase() || 'none'; // ignore upper and lowercase
        if (typeA < typeB) {
            return -1;
        }
        if (typeA > typeB) {
            return 1;
        }
        // names must be equal
        return 0;
    }*/

    return (
        <>
            {isLoading ?
                <Skeleton animation='pulse' className={cx('skeleton')}/>
                :
                <>
                    <div className={cx('categories')}>
                        <div className={cx('Catswiper-button-prev')} ref={prevRef} />
                        <div className={cx('Catswiper-button-next')} ref={nextRef} />
                        <Swiper
                            slidesPerView="auto"
                            spaceBetween={60}
                            slidesPerGroup={3}
                            onProgress={(fade) => {
                                handleProgress(fade.progress)
                            }}
                            className={`categories ${fade}`}
                            onInit={(swiper: any) => {
                                swiper.params.navigation.prevEl = prevRef.current;
                                swiper.params.navigation.nextEl = nextRef.current;
                                swiper.navigation.init();
                                swiper.navigation.update();
                            }}
                            /*navigation={{
                                prevEl: '.Catswiper-button-prev',
                                nextEl: '.Catswiper-button-next',
                            }}*/
                            //slidesOffsetAfter={46}
                            slidesOffsetBefore={46}
                        >
                            {data && [...data]
                                .map(item =>
                                    <SwiperSlide key={item.id}>
                                        <Category
                                            title={item.name}
                                            url={item.picture_path}
                                            type={item.type}
                                            id={item.id}
                                            load={isLoading}
                                        />
                                    </SwiperSlide>)}
                        </Swiper>

                        {/*{data && [...data]?.sort(compareSectionsTypes)
                            .map(item => <Category
                                key={item.id}
                                title={item.name}
                                url={item.picture_path}
                                type={item.type}
                                id={item.id}
                                load={isLoading}
                            />)}*/}
                    </div>

                    <div className={cx('geoposition')}>
                        <GeoMarker />
                        <h1 className={cx('city')}>{city ? city : 'Поиск...'}</h1>
                    </div>
                </>
            }
        </>
    )
};

export default Sections;
