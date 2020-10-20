import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Slider from 'react-slick';

const ActContentsStyle = styled.div`
  display: flex;
  justify-content: center;
  flex-direction:column;
  width: 80%;
  .slick-slider{
    width: 90%;
  }
  .slick-slide{
  display: flex;
  justify-content: center;
  transition: all 0.6s ease-in-out;
  }
  .slick-slide>div{
    padding: 15%;
  }
  .slick-center{
      transform: scale(1.2);
    }

  .act{
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.3);
    border-radius: 5px;
    cursor:pointer;
    :focus{
    outline: none;
    };
    img{
    width: 100%; 
    height: auto;
    }
    .act__title{
    padding: 10px;
    padding-top: 0;
    padding-bottom: 0;
    font-size: 13px;
    }
  }
/*   
  @media(max-width: 700px){
    .slick-slider{
        width: 700px;
        height: 550px;
      }
      
    .slick-slide>div{
    padding: 20px;
  }
  } */
 .act_contents {
   width:100%;
   display:flex;
   justify-content:center;
 }

`;


const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <img
      className={className}
      style={{ ...style, display: "block",transform:'scale(2)'}}
      onClick={onClick}
      src='/icons/Nexticon.png'
    />
  );
};
const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <img
      className={className}
      style={{ ...style, display: "block",transform:'scale(2)'}}
      onClick={onClick}
      src='/icons/Backicon.png'
    />
  );
}

const ActContents = ({ actList }) => {
  const settings = {
    infinite: true,
    autopspeed: 5000,
    slidesToShow:3,
    slidesToScroll: 1,
    centerMode:true,
    nextArrow:<NextArrow/>,
    prevArrow:<PrevArrow/>
};
  return (
    <ActContentsStyle>
            <Slider {...settings}>
                <div className='act'>
                    <img alt='' src='/pics/1.jpg'/>
                    <p className='act__title'>게시물1의 제목</p>
                </div>
                <div className='act'>
                    <img alt='' src='/pics/2.jpg'/>
                    <p className='act__title'>게시물2의 제목</p>
                </div>
                <div className='act'>
                    <img alt='' src='/pics/3.jpg'/>
                    <p className='act__title'>게시물3의 제목</p>
                </div>
                <div className='act'>
                    <img alt='' src='/pics/4.jpg'/>
                    <p className='act__title'>게시물4의 제목</p>
                </div>
            </Slider>

      <div className="act_contents">
        {actList.map((act, key) => {
          return (
            <p key={key}>
              {act.act_title}
              {act.act_content}
              {act.visited}
              {act.created_at}
            </p>
          );
        })}
      </div>
      



    </ActContentsStyle>
  );
};

export default ActContents;
