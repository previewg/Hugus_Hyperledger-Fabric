import React, { useEffect } from "react";
import { kakaoSignInRequest } from "../../actions/auth";
import { useDispatch } from "react-redux";
import { signInBtnIsClicked } from "../../actions/user";

const Kakao = () => {
  const dispatch = useDispatch();

  const kakaoSignInHandler = () => {
    window.Kakao.Auth.login({
      success: (authObj) => {
        window.Kakao.API.request({
          url: "/v2/user/me",
          success: (res) => {
            console.log(res);
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

  return <button onClick={kakaoSignInHandler}>Kakao 계정으로 로그인</button>;
};

export default Kakao;
