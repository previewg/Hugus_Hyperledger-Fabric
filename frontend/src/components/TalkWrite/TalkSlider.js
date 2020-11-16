import React, { useEffect, useState } from "react";
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
  .talk_file {
    height: 290px;
    object-fit: contain;
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
  .story_file {
    outline: none;
    cursor: pointer;
  }
`;

const EnlargedImgStyle = styled.div`
  top: 0;
  left: 0;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 80;
  > div {
    width: 900px;
    height: 500px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    display: flex;
  }
  > button {
    margin-top: 20px;
    width: 50px;
    height: 50px;
    background-color: white;
    border-radius: 25px;
    border: solid 0.1px orange;
    color: orange;
    font-weight: bold;
    outline: none;
    cursor: pointer;
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
  const [open, setOpen] = useState(false);
  const [src, setSrc] = useState("");

  const EnlargedImg = () => {
    return (
      <EnlargedImgStyle open={open}>
        <div style={{ backgroundImage: `url(${src})` }}></div>
        <button onClick={() => setOpen(false)}>닫기</button>
      </EnlargedImgStyle>
    );
  };

  const openHandler = (src) => {
    setSrc(src);
    setOpen(true);
  };

  const settings = {
    customPaging: function (i) {
      return (
        <a>
          <img src={files[i].previewURL} />
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
  console.log(files);
  if (files)
    return (
      <>
        {open && <EnlargedImg />}
        <SliderStyle>
          <Slider {...settings}>
            {files.map((file, key) => {
              return (
                <img
                  className="talk_file"
                  key={key}
                  src={file.previewURL}
                  onClick={() => openHandler(file.previewURL)}
                />
              );
            })}
          </Slider>
        </SliderStyle>
      </>
    );
};

export default TalkSlider;
