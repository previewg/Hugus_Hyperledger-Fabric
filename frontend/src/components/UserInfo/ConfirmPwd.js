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
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 50;
  justify-content: center;
  align-items: center;
  article {
    background-color: white;
    display: flex;
    flex-direction: column;
    width: 400px;
    height: 150px;
    justify-content: space-around;
    align-items: center;
    margin-left: 100px;
    padding: 10px;

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
        transition: 0.3s ease-in-out;
        :hover {
          border: solid 0.1px orange;
          color: orange;
        }
      }
    }
  }
`;

const ConfirmPwd = () => {
  const nickname = useSelector(
    (state) => state.authentication.status.currentUser
  );
  const input = useRef();
  const [password, setPassword] = useState("");

  const onChangeHandler = (e) => {
    setPassword(e.target.value);
    if (e.key === "Enter") {
      submitHandler();
    }
  };

  const submitHandler = async () => {
    const check = await axios.post("auth/confirm", {
      nickname: nickname,
      password: password,
    });

    if (check.data.success === 1) {
      console.log("확인");
    } else {
      alert("비밀번호가 일치하지 않습니다");
    }
  };

  useEffect(() => {
    input.current.focus();
  }, []);
  return (
    <ConfirmPwdStyle>
      <article>
        <p className="confirm__header">
          개인정보 보호를 위해 비밀번호를 입력 바랍니다
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
  );
};
export default ConfirmPwd;
