import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { kakaoSignInRequest } from "actions/auth";
import { signInBtnIsClicked } from "actions/user";

const KakaoStyle = styled.button`
  color: #000000;
  background-color: #fee500;
  border: none;
  display: flex;
  align-items: center;
  img {
    width: 27px;
    height: 22px;
    margin-right: 44px;
    padding-left: 5px;
  }
`;

const Kakao = () => {
  const dispatch = useDispatch();

  const kakaoSignInHandler = () => {
    window.Kakao.Auth.login({
      success: (authObj) => {
        window.Kakao.API.request({
          url: "/v2/user/me",
          success: (res) => {
            dispatch(kakaoSignInRequest({ res }));
            dispatch(signInBtnIsClicked());
          },
          fail: (error) => {
            console.log(error);
          },
        });
      },
      fail: (err) => {
        alert(JSON.stringify(err));
      },
    });
  };

  return (
    <KakaoStyle onClick={kakaoSignInHandler}>
      <img src="/icons/kakao2.png" />
      <p>카카오 계정으로 로그인</p>
    </KakaoStyle>
  );
};

export default Kakao;
