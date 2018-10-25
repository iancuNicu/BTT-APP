import React from 'react';
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './carousel.css';

const CarouselComponent = () => {

    var settings = {
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 0,
        autoplaySpeed: 5000,
        cssEase: "linear"
    };

    return(
        <Slider {...settings}>
            <div>
                AAAAAAAAAA
            </div>
            <div>
                BBBBBBBBBB
            </div>
        </Slider>
    );

};

export default CarouselComponent;