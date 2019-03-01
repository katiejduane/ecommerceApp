import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Carousel(props) {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true
    }
    return(
        <Slider {...settings}>
            <div className="slick-image carousel-horse"><img src="/images/zena.jpg" alt="horse"></img></div>
            <div className="slick-image carousel-horse"><img src="/images/roan_mustang.jpg" alt="horse"></img></div>
            <div className="slick-image carousel-horse"><img src="/images/pelipa.jpg" alt="horse"></img></div>
            <div className="slick-image carousel-horse"><img src="/images/morgan.jpg" alt="horse"></img></div>
            <div className="slick-image carousel-horse"><img src="/images/grey_beauty.png" alt="horse"></img></div>
            <div className="slick-image carousel-horse"><img src="/images/chestnut_quarterhorse.jpg" alt="horse"></img></div>
        </Slider>
    )
}

export default Carousel;