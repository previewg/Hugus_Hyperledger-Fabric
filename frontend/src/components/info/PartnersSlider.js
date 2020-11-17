import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Slider from "react-slick";
import axios from "axios";
import CountUp from "react-countup";
import { Link } from "react-router-dom";

const PartnersSliderStyle = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 150px;
  height: 80vh;
  transition: all 0.7s ease-in-out;
  //opacity: ${(props) => (props.scroll > 400 ? 1 : 0)};
  > p {
    text-align: left;
    font-size: 25px;
    padding: 10px;
    border-bottom: solid 2px orange;
    margin-bottom: 100px;
  }
  > div {
    display: flex;
    justify-content: center;
    height: 40%;
    width: 80%;
    .slick-dots {
      position: relative;
      margin-top: 10px;
    }
    .slick-slider {
      width: 90%;
    }
    .slick-slide {
      display: flex;
      justify-content: center;
      transition: all 0.7s ease-in-out;
    }
    .slick-slide > div {
      padding: 15%;
    }
    .slick-center {
      transform: scale(1.2);
    }
    .campaign {
      display: flex;
      flex-direction: column;
      box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);
      border-radius: 5px;
      cursor: pointer;
      text-decoration: none;

      :focus {
        outline: none;
      }

      .campaign__img {
        width: 290px;
        height: 290px;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
      }

    }

    @media (max-width: 700px) {
      .slick-slider {
        width: 700px;
        height: 550px;
      }

      .slick-slide > div {
        padding: 20px;
      }
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

const PartnersSlider = () => {
  const settings = {
    infinite: true,
    autopspeed: 5000,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    dots: true,
    autoplay: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  const [list, setList] = useState([]);
  const init = useRef(true);

  useEffect(() => {
    if (init.current) {
      init.current = false;
    }
  }, []);

  return (
    <PartnersSliderStyle>
      <div>
        <Slider {...settings}>
              <Link>
                <p>asdfsadfsadfdsa</p>
                <p>asdfsadfsadfdsa</p>
                <p>asdfsadfsadfdsa</p>
                <p>asdfsadfsadfdsa</p>
                <p>asdfsadfsadfdsa</p>
              </Link>
        </Slider>
      </div>
    </PartnersSliderStyle>
  );
};

export default React.memo(PartnersSlider);
