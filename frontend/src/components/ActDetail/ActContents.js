import React from "react";
import styled from "styled-components";
import ActSlider from "./ActSlider";
import { Link } from "react-router-dom";

const ActContentsStyle = styled.div`
  display: flex;
  padding-top: 70px;
  justify-content: center;
  flex-direction: column;
  width: 700px;

  .act__title {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    margin-top: 70px;
    > p {
      font-size: 30px;
    }
  }

  .act__createdAt {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin-top: 30px;
    > p {
      font-size: 15px;
    }
  }

  .act__image {
    margin-top: 10px;
    > img {
      width: 700px;
    }
  }

  .act__content {
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

  .act__visited {
    margin-top: 50px;
    display: flex;
    justify-content: flex-end;
    font-size: 13px;
    > p {
      margin: 0;
      margin-left: 10px;
    }
  }

  .back_btn {
    margin-top: 50px;
    display: flex;
    width: 100%;
    justify-content: flex-end;
    font-size: 15px;
    text-decoration: none;
    color: grey;
    cursor: pointer;
    transition: 0.1s ease-in-out;
    outline: none;
    :hover {
      color: orange;
    }
  }
`;

const getTimeStamp = (date) => {
  let givenDate = new Date(date);
  let newDate =
    leadingZeros(givenDate.getFullYear(), 4) +
    "-" +
    leadingZeros(givenDate.getMonth() + 1, 2) +
    "-" +
    leadingZeros(givenDate.getDate(), 2);
  return newDate;
};

const leadingZeros = (n, digits) => {
  let zero = "";
  n = n.toString();

  if (n.length < digits) {
    for (let i = 0; i < digits - n.length; i++) zero += "0";
  }
  return zero + n;
};

const ActContents = ({ actId }) => {
  const data = actId.data;
  console.log(data);
  return (
    <ActContentsStyle>
      <div className="act__title">
        <p>{data.act_title}의 소식입니다.</p>
      </div>

      <div className="act__createdAt">
        <p>{getTimeStamp(data.createdAt)}</p>
      </div>

      <div className="act__image">
        <img src={data.Act_Files[1].file} />
      </div>

      <div className="act__content">
        <p>인증내용</p>
        <p>{data.act_content}</p>
      </div>

      <div className="act__visited">
        <p>조회수 {data.visited}</p>
      </div>

      <Link className="back_btn" to="/act">
        글목록
      </Link>
    </ActContentsStyle>
  );
};

export default ActContents;
