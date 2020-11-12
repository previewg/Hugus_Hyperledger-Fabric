import React from "react";
import Slider from "react-slick";
import styled from "styled-components";

const SliderStyle = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  .slick-slider {
    width: 300px;
  }
  .slick-list {
    img {
      width: auto;
      height: 500px;
      object-fit: cover;
    }
  }

  .slick-dots {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    li {
      width: 50px;
      height: 50px;
    }
    img {
      width: 50px;
      height: 50px;
    }
  }
`;

const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <img
      className={className}
      style={{
        ...style,
        display: "block",
        paddingLeft: "300px",
        transform: "scale(2)",
      }}
      onClick={onClick}
      src="/icons/Nexticon.png"
    />
  );
};

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <img
      className={className}
      style={{
        ...style,
        display: "block",
        paddingRight: "300px",
        transform: "scale(2)",
      }}
      onClick={onClick}
      src="/icons/Backicon.png"
    />
  );
};

const TalkSlider = ({ files }) => {
  const settings = {
    customPaging: function (i) {
      return (
        <a>
          <img src={files[i].file} />
        </a>
      );
    },
    dots: true,
    dotsClass: "slick-dots",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <SliderStyle>
      <Slider {...settings}>
        {files.map((file, key) => {
          return (
            <div key={key}>
              <img src={file.file} />
            </div>
          );
        })}
      </Slider>
    </SliderStyle>
  );
};

export default TalkSlider;
