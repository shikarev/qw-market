import React, {useRef} from 'react';
import classNames from "classnames/bind";
import styles from "./QwSwiper.module.scss";
import {Swiper} from "swiper/react";
import SwiperCore, {Pagination, Navigation} from 'swiper';

import "./swiper.scss";
import "./navigation.scss";
import {Button, Typography} from "@mui/material";

const cx = classNames.bind(styles);

SwiperCore.use([Pagination,Navigation]);

interface IQwSwiper {
    title?: string,
    className?: string,
    slidesPerView?: number,
    spaceBetween?: number,
    slidesPerGroup?: number,
    breakpoints?: any,
    speed?: number,
    onReachEnd?: any,
    children?: any,
    buttonCallback?: any,
}

const QwSwiper = (props: IQwSwiper) => {

    const prevRef = useRef<HTMLDivElement>(null);
    const nextRef = useRef<HTMLDivElement>(null);

    function onReachEnd() {
        if(props.onReachEnd) {
            props.onReachEnd()
        }
    }

    return (
        <div className={cx('carousel')}>
            {props.title &&
                <div className={cx('navigation')}>
                    <div className={cx('title-container')}>
                        <Typography variant='h1'>{props.title}</Typography>

                        {props.buttonCallback &&
                            <div className={cx('button-screen')}>
                                <Button color="primary" variant="outlined" sx={{p: '1.4rem 4rem', fontSize: '1.6rem'}} onClick={props.buttonCallback}>Посмотреть все</Button>
                            </div>
                        }
                    </div>

                    <div className={cx('navigation-buttons')}>
                        <div className="swiper-button-prev" ref={prevRef} />
                        <div className="swiper-button-next" ref={nextRef}  />
                    </div>
                </div>
            }

            <Swiper
                onInit={(swiper: any) => {
                    swiper.params.navigation.prevEl = prevRef.current;
                    swiper.params.navigation.nextEl = nextRef.current;
                    swiper.navigation.init();
                    swiper.navigation.update();
                }}
                className={props.className}
                slidesPerView={props.slidesPerView}
                spaceBetween={props.spaceBetween}
                slidesPerGroup={props.slidesPerGroup}
                breakpoints={props.breakpoints}
                speed={props.speed ?? 500}
                onReachEnd={() => onReachEnd()}
            >
                {props.children}
            </Swiper>


            {props.buttonCallback &&
                <div className={cx('mobile-container')}>
                    <div className={cx('button-mobile')}>
                        <Button color="primary" variant="text" onClick={props.buttonCallback}>Посмотреть все</Button>
                    </div>
                </div>
            }

        </div>
    );
};

export default QwSwiper;
