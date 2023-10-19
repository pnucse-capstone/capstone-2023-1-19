import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './slider.css';

import car1 from "../../assets/images/car1.avif";
import car2 from "../../assets/images/car2.avif";
import car3 from "../../assets/images/car3.avif";

const SlickSlider = () => {
  var settings = {
    arrows: false,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const slideStyles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const imageStyles = {
    objectFit: "cover",
  };

  return (
    <div>
      <Slider {...settings}>
        <div style={slideStyles}>
          <img src={car1} alt="Car 1" style={imageStyles} />
        </div>
        <div style={slideStyles}>
          <img src={car2} alt="Car 2" style={imageStyles} />
        </div>
        <div style={slideStyles}>
          <img src={car3} alt="Car 3" style={imageStyles} />
        </div>
      </Slider>
    </div>
  );
};

export default SlickSlider;
