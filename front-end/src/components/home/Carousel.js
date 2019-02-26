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
            <div className="slick-image carousel-horse"><img src="/images/zena.jpg"></img></div>
            <div className="slick-image carousel-horse"><img src="/images/roan_mustang.jpg"></img></div>
            <div className="slick-image carousel-horse"><img src="/images/pelipa.jpg"></img></div>
            <div className="slick-image carousel-horse"><img src="/images/morgan.jpg"></img></div>
            <div className="slick-image carousel-horse"><img src="/images/grey_beauty.png"></img></div>
            <div className="slick-image carousel-horse"><img src="/images/chestnut_quarterhorse.jpg"></img></div>
        </Slider>
    )
}

export default Carousel;