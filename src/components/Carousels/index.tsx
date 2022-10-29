import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import  './styles.scss';
import {LeftBtn, RightBtn} from "../svgComponents/Icons/filled";
import classNames from "classnames/bind";
import styles from "../Selector/selector.module.scss";

const cx = classNames.bind(styles);

const responsive = {
    xxl: {
        breakpoint: { max: 10000, min: 1400 },
        items: 6,
    },
    xl: {
        breakpoint: { max: 1400, min: 1200 },
        items: 5,
    },
    lg: {
        breakpoint: { max: 1200, min: 992 },
        items: 4,
    },
    md: {
        breakpoint: { max: 992, min: 768 },
        items: 3,
    },
    sm: {
        breakpoint: { max: 768, min: 576 },
        items: 2,
    },
    xs: {
        breakpoint: { max: 576, min: 0 },
        items: 1,
    }
};

const responsiveCatalog = {
    xxl: {
        breakpoint: { max: 10000, min: 1400 },
        items: 10,
    },
    xl: {
        breakpoint: { max: 1400, min: 1200 },
        items: 9,
    },
    lg: {
        breakpoint: { max: 1200, min: 992 },
        items: 8,
    },
    md: {
        breakpoint: { max: 992, min: 768 },
        items: 6,
    },
    sm: {
        breakpoint: { max: 768, min: 576 },
        items: 5,
    },
    xs: {
        breakpoint: { max: 576, min: 0 },
        items: 3,
    }
};

function SampleNextArrow({ onClick, ...rest }:any) {
    const {
        onMove,
        carouselState: { currentSlide, deviceType }
    } = rest;
    return (
        <RightBtn
            style={{cursor: 'pointer', position: 'absolute', top: -94, right: '0px', display: "block"}}
            onClick={() => onClick()}
        />
    );
}

function SamplePrevArrow({ onClick, ...rest }:any) {
    const {
        onMove,
        carouselState: { currentSlide, deviceType }
    } = rest;
    return (
        <LeftBtn
            style={{ cursor: 'pointer', position: 'absolute', top: -94, right: '86px', display: "block", zIndex: 100}}
            onClick={() => onClick()}
        />
    );
}

const ButtonGroup = ({ next, previous, goToSlide, show, ...rest }:any) => {
    const { carouselState: { currentSlide }, isReview} = rest;
    return (
        <div className={isReview? `review-carousel-button-group ${!show && 'review-carousel-button-group__hidden'}`
            :`carousel-button-group ${!show && 'carousel-button-group__hidden'}`}>

            <LeftBtn
                className='carousel-button carousel-button__left'
                onClick={() => previous()}
            />
            <RightBtn
                className='carousel-button carousel-button__right'
                onClick={() => next()}
            />
        </div>
    );
};

const QwCarousel = ({...props}) => {

    const {
        title,
        type='product',
    } = props

    return (
        <div className={'carousel'}>
            {(type === 'product' && props.children &&
            <Carousel
                customButtonGroup={<ButtonGroup isReview={props.isReview} show={ props.children.length > 0 && !props.hideButtons}/>}
                renderButtonGroupOutside={true}
                swipeable={true}
                draggable={true}
                arrows={false}
                showDots={false}
                responsive={props.responsive? {...responsive, ...props.responsive}: responsive}
                partialVisible={true}
                infinite={true}
                autoPlay={false}
                // autoPlaySpeed={1000}
                keyBoardControl={true}
                customTransition="all .5"
                transitionDuration={600}
                containerClass={props.containerClass ? props.containerClass : "carousel-container"}
                //removeArrowOnDeviceType={["tablet", "mobile"]}
                deviceType={props.deviceType}
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
                minimumTouchDrag={100}
            >
                {props.children}

            </Carousel>) ||
            (type ==='category' &&
                <Carousel
                customButtonGroup={<ButtonGroup show={ props.children.length > 0}/>}
                renderButtonGroupOutside={true}
                swipeable={true}
                draggable={true}
                arrows={false}
                showDots={false}
                responsive={responsiveCatalog}
                partialVisible={true}
                infinite={true}
                autoPlay={false}
                // autoPlaySpeed={1000}
                keyBoardControl={true}
                customTransition="all .5"
                transitionDuration={600}
                containerClass="carousel-container"
                //removeArrowOnDeviceType={["tablet", "mobile"]}
                deviceType={props.deviceType}
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
                minimumTouchDrag={100}
            >
                {props.children}
            </Carousel>)}
        </div>
    )
}

export default QwCarousel;
