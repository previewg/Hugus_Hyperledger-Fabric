import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import styled from "styled-components";

const ConfirmPwdStyle = styled.section`
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 50;
  justify-content: center;
  align-items: center;
  article {
    background-color: white;
    display: flex;
    flex-direction: column;
    min-width: 400px;
    width: 400px;
    height: 150px;
    align-items: center;
    margin-left: 100px;
    padding: 10px;

    .confirm__exit {
      width: 97%;
      margin: 0px;
      display: flex;
      justify-content: flex-end;
      cursor: pointer;
      font-size: 11px;
      transition: color 0.2s ease-in-out;
      :hover {
        color: orange;
      }
    }
    .confirm__header {
      margin-top: 20px;
      margin-bottom: 20px;
      > strong {
        font-weight: normal;
        color: orange;
      }
    }
    .confirm__input {
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: 80%;
      > input {
        padding: 10px;
        width: 200px;
        height: 15px;
        outline: none;
        border: solid 0.1px lightgray;
        transition: border 0.3s ease-in-out;
        :focus {
          border: solid 0.1px orange;
        }
      }
      > button {
        cursor: pointer;
        color: gray;
        background-color: transparent;
        border: solid 0.1px lightgray;
        width: 70px;
        height: 35px;
        padding: 10px;
        outline: none;

        transition: 0.3s ease-in-out;
        :hover {
          border: solid 0.1px orange;
          color: orange;
        }
      }
    }
  }
`;

const ErrorBoxStyle = styled.p`
  ${(props) => {
    if (props.error == 0) {
      return "display:none;opacity:0";
    } else {
      return "opacity:1;transform: translateX(-100px);";
    }
  }};
  right: 0;
  background-color: #ffa500;
  border-radius: 5px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 100px;
  width: 200px;
  height: 50px;
  transition: 0.7s ease-in-out;
  font-size: 15px;
  z-index: 150;
`;

const errorMsg = [
  "",
  "비밀번호를 입력 바랍니다",
  "비밀번호가 일치하지 않습니다",
];

const ConfirmPwd = ({ setIsConfirmed, setInfoType }) => {
  const nickname = useSelector((state) => state.auth.user.nickname);
  const input = useRef();
  const [password, setPassword] = useState("");
  const [errorCode, setErrorCode] = useState(0);

  const onChangeHandler = (e) => {
    setPassword(e.target.value);
    setErrorCode(0);
    if (e.key === "Enter") {
      submitHandler();
    }
  };

  const errorHandler = () => {
    if (!password) {
      setErrorCode(1);
      input.current.focus();
      return false;
    }
    return true;
  };

  const submitHandler = async () => {
    if (errorHandler()) {
      const check = await axios.post("/auth/confirm", {
        nickname: nickname,
        password: password,
      });

      if (check.data.success === 1) {
        setIsConfirmed(true);
      } else if (check.data.success === 2) {
        setErrorCode(2);
        setPassword("");
        input.current.focus();
      }
    }
  };

  const onClickHandler = (e) => {
    setInfoType("my__home");
  };

  useEffect(() => {
    input.current.focus();
  }, []);

  return (
    <>
      <ConfirmPwdStyle>
        <article>
          <p className="confirm__exit" onClick={onClickHandler}>
            닫기
          </p>
          <p className="confirm__header">
            개인정보 보호를 위해 <strong>비밀번호</strong>를 입력 바랍니다
          </p>
          <div className="confirm__input">
            <input
              ref={input}
              type="password"
              value={password}
              placeholder="비밀번호를 입력 바랍니다"
              onChange={onChangeHandler}
              onKeyPress={onChangeHandler}
            />
            <button onClick={submitHandler}>확인</button>
          </div>
        </article>
      </ConfirmPwdStyle>
      <ErrorBoxStyle error={errorCode}>{errorMsg[errorCode]}</ErrorBoxStyle>
    </>
  );
};
export default ConfirmPwd;
