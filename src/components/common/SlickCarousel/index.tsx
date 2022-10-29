import {LeftBtn, RightBtn} from "../../svgComponents/Icons/filled";
import React from "react";
import Slider from "react-slick";

function SampleNextArrow(props: any) {
    const {onClick} = props;
    return (
        <RightBtn
            style={{cursor: 'pointer', position: 'absolute', top: -94, right: '0px', display: "block"}}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props: any) {
    const {onClick} = props;
    return (
        <LeftBtn
            style={{cursor: 'pointer', position: 'absolute', top: -94, right: '86px', display: "block"}}
            onClick={onClick}
        />
    );
}

const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    initialSlide: 0,
    nextArrow: <SampleNextArrow/>,
    prevArrow: <SamplePrevArrow/>,
    responsive: [
        {
            breakpoint: 1100,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 4,
                initialSlide: 0,
            }
        },
        {
            breakpoint: 900,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                initialSlide: 0,
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 0,
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                initialSlide: 0,
            }
        }
    ]
};

export const SlickCarousel = ({children, title, afterChange}:{children?: JSX.Element[], title?: string, afterChange?: (num: number) => void}) => {
    return (
        <>
            <h1 style={{marginBottom: '48px', overflow: 'hidden', textOverflow: 'ellipsis', width: 'calc(100% - 14rem)'}}>{title}</h1>
            <Slider {...settings} afterChange={afterChange}>
                {children}
            </Slider>
        </>
    )
}
