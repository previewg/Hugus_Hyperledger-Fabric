import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Slider from 'react-slick';
import ActSlider from "./ActSlider";

const ActContentsStyle = styled.div`
  display: flex;
  padding-top:70px;
  justify-content: center;
  flex-direction:column;
  width: 70%;
 
 .act_contents {
   width:100%;
   display:flex;
   justify-content:flex-start;
   margin-top: 70px;
          >p {
            font-size:25px;
            border-bottom:solid orange 3px;
            padding-bottom:2px;
            }
 }

`;

const ActContents = ({ actId }) => {
const data = actId.data; 



  return (
    <ActContentsStyle>
    <div className="act_contents">
      {data !== undefined &&
      <p>{data.act_title}에 대한 소식입니다.</p>}
      {/* <ActSlider files={data.Act_Files} /> */}

      <div className="전달과정">ㅁㄴㅇ</div>

    </div>

      

    </ActContentsStyle>
  );
};

export default ActContents;
