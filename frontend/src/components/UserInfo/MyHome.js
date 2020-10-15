import React, { useEffect, useState } from "react";
import styled from "styled-components";

const MyHomeStyle = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-left: 200px;
  .my__home__header {
    display: flex;
    width: 700px;
    justify-content: space-around;
    border: orange solid 0.1px;
    .header__left {
      margin: 10px;
      flex-grow: 1;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      > div {
        display: flex;
        justify-content: space-around;
        align-items: center;
        > p {
          color: gray;
          font-size: 20px;
        }
        > strong {
          color: orange;
          font-size: 25px;
          font-weight: normal;
        }
      }
    }
    .header__right {
      margin: 10px;
      border-left: solid #e6e6e6 0.2px;
      flex-grow: 1;
      display: flex;
      justify-content: space-around;
      align-items: center;
      > p {
        color: gray;
        font-size: 20px;
      }
      > strong {
        color: orange;
        font-size: 25px;
        font-weight: normal;
      }
    }
  }
`;

const MyHome = ({ currentUser }) => {
  return (
    <MyHomeStyle>
      <article className="my__home__header">
        <div className="header__left">
          <div>
            <p>기부 건수</p>
            <strong>1건</strong>
          </div>
          <div>
            <p>내가 쓴 글</p>
            <strong>1건</strong>
          </div>
        </div>
        <div className="header__right">
          <p>총 후원금액</p>
          <strong>100,000원</strong>
        </div>
      </article>
    </MyHomeStyle>
  );
};

export default MyHome;
