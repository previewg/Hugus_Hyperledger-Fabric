import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const HugusInfoStyle = styled.section`
  display: flex;
  width: 100%;
  height: 300px;
  background-color: #e9e9e9;
  margin-top: 100px;
  justify-content: space-between;
  align-items: center;
  .logo {
    padding: 50px;
    width: 30%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    img {
      width: 5rem;
    }
  }
  .slogan {
    padding: 50px;
    width: 40%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-around;
    p:nth-child(1) {
      font-size: 25px;
      font-weight: bold;
    }
  }
  .menu {
    padding: 50px;
    width: 30%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-around;
    height: 70%;
    button,
    a {
      color: black;
      outline: none;
      text-decoration: none;
      border: none;
      font-size: 15px;
      width: 160px;
      height: 50px;
      cursor: pointer;
      background-color: #ffffff;
      box-shadow: -10px -10px 10px 0px rgba(0, 0, 0, 0.3);
      display: flex;
      justify-content: center;
      align-items: center;
      :hover {
        font-weight: bold;
        color: orange;
      }
    }
  }
`;

const HugusInfo = () => {
  return (
    <HugusInfoStyle>
      <article className="logo">
        <img src="/icons/hugus.png" alt="hugus" />
      </article>
      <article className="slogan">
        <p>
          마음을 담는 기부
          <br />
          허그에 담기다
        </p>
        <p>
          따뜻하게 안아줄 수 있는
          <br />
          투명하고 자율적인 기부플랫폼
        </p>
      </article>
      <article className="menu">
        <button>허그 소개</button>
        <Link to="/block">실시간 블록체인 정보</Link>
      </article>
    </HugusInfoStyle>
  );
};

export default React.memo(HugusInfo);
