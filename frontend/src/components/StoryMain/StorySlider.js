import React from "react";
import styled from 'styled-components';
import Slider from 'react-slick';

const SliderStyle = styled.div`
  display: flex;
  justify-content: center;
      .slick-slider{
       width: 70%;
    .slick-slide>div{
      width: 90%;
    }
  }
`;

const StorySlider = () => {
    const settings = {
        infinite: true,
        speed: 2000,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay:true,
        centerMode:true,
    };
    return(
        <SliderStyle>
            <Slider {...settings}>
                <img src='/pics/1.jpg'/>
                <img src='/pics/2.jpg'/>
                <img src='/pics/3.jpg'/>
                <img src='/pics/1.jpg'/>
                <img src='/pics/2.jpg'/>
                <img src='/pics/3.jpg'/>
            </Slider>
        </SliderStyle>


    )
}

export default StorySlider;