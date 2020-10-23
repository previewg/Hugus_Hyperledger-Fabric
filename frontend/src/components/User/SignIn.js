import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { signInBtnIsClicked, signUpBtnIsClicked } from "../../actions/user";
import { signInRequest } from "../../actions/auth";
import Kakao from "./Kakao";
import Naver from "./Naver";

const SignInStyle = styled.div`
  position: fixed;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  display: flex;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
  section {
    background-color: white;
    width: 400px;
    height: 550px;
    .header {
      .close__btn {
        font-size: 12px;
        position: relative;
        left: 170px;
        cursor: pointer;
      }
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 25%;
      p {
        font-size: 25px;
      }
    }
    .form {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      height: 35%;
      input {
        width: 70%;
        height: 25px;
        font-size: 15px;
        transition: 0.4s ease-in-out;
        border: solid 0.1px lightgray;
        padding: 10px;
        :focus {
          outline: none;
          border: solid 0.1px orange;
        }
      }
      > div {
        width: 70%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        p {
          font-size: 12px;
          color: gray;
        }
        .checkbox {
          display: flex;
          align-items: center;
          justify-content: space-between;
          input {
            width: 15px;
            margin-right: 5px;
          }
        }
      }
    }

    .buttons {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      height: 40%;
      button {
        width: 70%;
        height: 40px;
        cursor: pointer;
        border-radius: 6px;
        :focus {
          outline: none;
        }
      }
      button:nth-child(1) {
        border: none;
        background-color: pink;
      }
      .already {
        font-size: 12px;
        color: gray;
        display: flex;
        justify-content: space-around;
        width: 50%;
        p:nth-child(2) {
          color: orange;
          cursor: pointer;
        }
      }
    }
  }
`;
const SignIn = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const signInStatus = useSelector((state) => state.auth.signIn.status);
  const errorCode = useSelector((state) => state.auth.signIn.error);

  const onChangeHandler = (e) => {
    setUser({
      ...user,
      [e.target.id]: e.target.value,
    });
    if (e.key === "Enter") {
      signInHandler();
    }
  };

  const signInHandler = () => {
    dispatch(signInRequest({ user }));
  };
  const errorMessage = [
    "아이디 혹은 비밀번호가 일치하지 않습니다.",
    "이메일 인증이 필요합니다.",
  ];

  useEffect(() => {
    if (signInStatus === "SUCCESS") {
      alert("로그인성공");
      setUser({
        email: "",
        password: "",
      });
    } else if (signInStatus === "FAILURE") {
      alert(errorMessage[errorCode - 1]);
    }
  }, [signInStatus]);

  return (
    <SignInStyle>
      <section>
        <article className="header">
          <p
            className="close__btn"
            onClick={() => dispatch(signInBtnIsClicked())}
          >
            닫기
          </p>
          <p>로그인</p>
        </article>
        <article className="form">
          <input
            id="email"
            placeholder="이메일"
            value={user.email}
            onChange={onChangeHandler}
            onKeyPress={onChangeHandler}
          />
          <input
            type="password"
            id="password"
            value={user.password}
            placeholder="비밀번호"
            onChange={onChangeHandler}
            onKeyPress={onChangeHandler}
          />
          <div>
            <div className="checkbox">
              <input type="checkbox" />
              <p>로그인 유지하기</p>
            </div>
            <p>아이디/비밀번호 찾기</p>
          </div>
        </article>
        <article className="buttons">
          <button onClick={signInHandler}>HUGUS 계정으로 로그인</button>
          <Kakao />
          <Naver />
          <div className="already">
            <p>회원이 아니신가요?</p>
            <p onClick={() => dispatch(signUpBtnIsClicked())}>회원가입</p>
          </div>
        </article>
      </section>
    </SignInStyle>
  );
};

export default SignIn;
