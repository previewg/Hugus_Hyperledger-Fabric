import React from "react";
import styled from "styled-components";

const NaverStyle = styled.button`
  background-color: white;
  color: black;
  border: solid #e7e7e7 0.1px;
  display: flex;
  align-items: center;
  img {
    border-right: solid #e7e7e7 0.1px;
    width: 35px;
    height: 100%;
    margin-right: 35px;
    padding-right: 5px;
  }
`;
const Naver = () => {
  return (
    <NaverStyle
      onClick={() =>
        document.getElementById("naverIdLogin_loginButton").click()
      }
      id="naver"
    >
      <img src="/icons/naver3.png" />
      <p>네이버 계정으로 로그인</p>
    </NaverStyle>
  );
};

export default Naver;
