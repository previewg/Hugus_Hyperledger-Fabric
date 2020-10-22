import React from "react";
import styled from "styled-components";

const NaverStyle = styled.button`
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
`;
const Naver = () => {
  return (
    <NaverStyle
      onClick={() =>
        document.getElementById("naverIdLogin_loginButton").click()
      }
      id="naver"
    >
      Naver 계정으로 로그인
    </NaverStyle>
  );
};

export default Naver;
