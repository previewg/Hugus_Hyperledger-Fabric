import React from "react";
import styled from "styled-components";
import ActSlider from "./ActSlider";
import { Link } from "react-router-dom";

const ActContentsStyle = styled.div`
  display: flex;
  padding-top:70px;
  justify-content: center;
  flex-direction:column;
  width: 750px;
 
 .act_contents {
   width:100%;
   display:flex;
   justify-content:flex-start;
   margin-top: 70px;
   >p {
            font-size:30px;
            }
 }

 .content {
  .buyAuthForm {
    white-space: pre;
    margin-top: 50px;
    p:nth-child(1) {
      font-weight: bold;
    }
    p:nth-child(2) {
      border: solid 0.1px lightgray;
      padding: 15px;
      padding-left: 20px;
    }
  }

  .giveProcessForm {
    margin-top: 50px;
    white-space: pre;
    p:nth-child(1) {
      font-weight: bold;
    }
    p:nth-child(2) {
      border: solid 0.1px lightgray;
      padding: 15px;
      padding-left: 20px;
    }
  }
 }


  .back_btn {
    margin-top: 20px;
    display: flex;
    width: 100%;
    justify-content: flex-end;
    font-size: 15px;
    font-weight: bold;
    text-decoration: none;
    color: grey;
    cursor: pointer;
    transition: 0.1s ease-in-out;
    outline: none;
    :hover {
    color: orange;
    }
  }

  .visited {
    margin-top: 50px;
    display: flex;
    justify-content: flex-end;
    font-size: 13px;
    > p {
      margin: 0;
      margin-left: 10px;
    }
  }

`;

const ActContents = ({ actId }) => {
const data = actId.data; 

  return (
    <ActContentsStyle>
    <div className="act_contents">

      <p>{data.act_title}의 소식입니다.</p>
      </div>

      <ActSlider files={data.Act_Files} />
      
      <div className="visited">
      <p>조회수 {data.visited}</p>
      </div>

      <div className="content">
      <div className="buyAuthForm">
      <p>구매내역</p>
      <p>
      {data.act_buy}
      </p>
      </div>

      <div className="giveProcessForm">
      <p>전달과정</p>
      <p>
      {data.act_content}  
      </p>
      </div>
      </div>

      <Link className="back_btn" to="/act">
      글목록
      </Link>

    </ActContentsStyle>
  );
};

export default ActContents;
