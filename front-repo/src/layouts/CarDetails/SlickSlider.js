import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './slider.css';
import { scale } from "chroma-js";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style,
        display: "block",
        borderRadius: 10,
        border: '2px solid', // Set the border thickness here
        borderColor: 'grey',
        background: "grey" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style,
        display: "block",
        borderRadius: 10,
        border: '2px solid', // Set the border thickness here
        borderColor: 'grey',
        background: "grey" }}
      onClick={onClick}
    />
  );
}

const SlickSlider = ({carImages, setCarImages}) => {
  const [images, setImages] = useState(carImages);
  useEffect(() => {
    setImages(carImages);
    console.log("in slick slider data  ", images);
  }, [carImages]);

  var settings = {
    arrows: true,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    outline: false,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };

  const slideStyles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const imageStyles = {
    // width: '600px',
    height: '600px',
    justifyContent: "center",
    transform: scale(1,1),
    // marginLeft: "200px",//'200px',
    // marginRight: "200px",
    objectFit: "scale-down",
  };

  return (
    <div>
      <Slider {...settings}>
        
        <div style={slideStyles}>
          <img src={images.outside} alt="Car outside" style={imageStyles} />
        </div>
        <div style={slideStyles}>
          <img src={images.inside} alt="Car inside" style={imageStyles} />
        </div>
        <div style={slideStyles}>
          <img src={images.front} alt="Car front" style={imageStyles} />
        </div>
        <div style={slideStyles}>
          <img src={images.left} alt="Car left" style={imageStyles} />
        </div>
        <div style={slideStyles}>
          <img src={images.right} alt="Car right" style={imageStyles} />
        </div>
        <div style={slideStyles}>
          <img src={images.back} alt="Car back" style={imageStyles} />
        </div>
      </Slider>
    </div>
  );
};

export default SlickSlider;
