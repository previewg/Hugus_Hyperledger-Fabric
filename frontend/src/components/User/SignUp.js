import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import socketIOClient from "socket.io-client";
import { useDispatch } from "react-redux";
import { signInBtnIsClicked, signUpBtnIsClicked } from "actions/user";
import axios from "axios";

const SignUpStyle = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
  section {
    background-color: white;
    width: 400px;
    height: 550px;
    .header {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      height: 25%;
      .close__btn {
        font-size: 12px;
        position: relative;
        left: 170px;
        cursor: pointer;
      }
      p {
        font-size: 25px;
      }
    }
    .form {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      height: 65%;
      .email {
        display: flex;
        width: 400px;
        > input {
          margin-left: 75px;
        }
        > p {
          margin: 0px;
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          left: 5px;
          background-color: transparent;
          color: #ffa500;
          width: 70px;
          height: 30px;
          font-size: 13px;
          cursor: pointer;
          outline: none;
          font-weight: normal;
          :hover {
            font-weight: bold;
          }
        }
        .waiting {
          :hover {
            font-weight: normal;
          }
        }
        .verified {
          color: #1eb71e;
          font-weight: bold;
        }
      }
      > div {
        display: flex;
        align-items: center;
        width: 70%;
      }
      input {
        margin-left: 15px;
        width: 240px;
        height: 30px;
        border: none;
        border-bottom: lightgray solid 0.1px;
        font-size: 15px;
        transition: 0.4s ease-in-out;
        :focus {
          outline: none;
          border-bottom: orange solid 0.1px;
        }
      }
      .agreement {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        width: 70%;
        input {
          width: 13px;
          margin-right: 5px;
        }
        p {
          cursor: pointer;
          font-size: 12px;
        }
      }

      button {
        border: orange 0.1px solid;
        border-radius: 5px;
        background-color: white;
        color: orange;
        width: 70%;
        height: 40px;
        font-size: 15px;
        font-weight: bold;
        cursor: pointer;
        outline: none;
        :hover {
          background-color: orange;
          color: white;
          border: none;
        }
      }
    }
    .already {
      display: flex;
      color: gray;
      justify-content: center;
      font-size: 12px;
      p {
        width: 100px;
        text-align: center;
      }
      p:nth-child(2) {
        cursor: pointer;
        color: orange;
      }
    }
  }
  .terms {
    display: inline-block;
    overflow: scroll;
    position: absolute;
    button {
      display: flex;
      justify-content: center;
      align-items: center;
      border: orange 0.1px solid;
      border-radius: 5px;
      background-color: white;
      color: orange;
      width: 100%;
      height: 40px;
      font-size: 15px;
      font-weight: bold;
      cursor: pointer;
      :hover {
        background-color: orange;
        color: white;
        border: none;
      }
    }
    p {
      padding: 10px 30px 20px 30px;
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
  height: 70px;
  transition: 0.7s ease-in-out;
  font-size: 16px;
  z-index: 150;
`;

const errorMsg = [
  "이메일이 이미 존재합니다",
  "이메일 형식에 맞게 입력 바랍니다",
  "닉네임이 이미 존재합니다.",
  "비밀번호는 영문,숫자,특수문자 포함 9자리 이상 입력 바랍니다",
  "이메일을 입력 바랍니다",
  "닉네임을 입력 바랍니다",
  "비밀번호를 입력 바랍니다",
  "비밀번호가 같지 않습니다",
  "이용약관에 동의 바랍니다",
  "이메일 인증이 필요합니다",
  "인증 메일을 확인 바랍니다",
];

const SignUp = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    email: "",
    nickname: "",
    password: "",
    password_confirm: "",
    email_verify: "INIT",
  });
  const [openTerm, setOpenTerm] = useState(false);
  const [checkTerm, setCheckTerm] = useState(false);
  const [errorCode, setErrorCode] = useState(0);
  const email = useRef();
  const nickname = useRef();
  const password = useRef();
  const password_confirm = useRef();
  const term = useRef();

  const checkHandler = () => {
    if (checkTerm === false) {
      setCheckTerm(true);
    } else {
      setCheckTerm(false);
    }
  };

  const onClickTerm = () => {
    setOpenTerm(true);
  };
  const CloseTerm = () => {
    setOpenTerm(false);
  };

  const emailVerifyHandler = async () => {
    if (user.email) {
      const result = await axios.post("/auth/requestEmail", {
        email: user.email,
      });
      if (result.data.success === 1) alert("인증 메일이 전송되었습니다");
      setUser({ ...user, email_verify: "WAITING" });
    }
  };

  const errorHandler = () => {
    if (!user.email) {
      setErrorCode(4);
      email.current.focus();
      return false;
    } else if (user.email_verify !== "SUCCESS") {
      setErrorCode(9);
      return false;
    } else if (!user.nickname) {
      setErrorCode(5);
      nickname.current.focus();
      return false;
    } else if (!user.password) {
      setErrorCode(6);
      password.current.focus();
      return false;
    } else if (user.password !== user.password_confirm) {
      setErrorCode(7);
      password_confirm.current.focus();
      return false;
    } else if (!checkTerm) {
      setErrorCode(8);
      term.current.focus();
      return false;
    }
    return true;
  };

  const signUpHandler = async () => {
    if (errorHandler()) {
      const result = await axios.post("/auth/signup", { ...user });
      if (result.data.code) {
        setErrorCode(result.data.code);
        if (result.data.code === 1 || result.data.code === 2)
          email.current.focus();
        else if (result.data.code === 3) nickname.current.focus();
        else password.current.focus();
      }
      if (result.data.success === 1) {
        alert("회원가입이 완료되었습니다.");
        dispatch(signInBtnIsClicked());
      }
    }
  };

  const onChangeHandler = (e) => {
    setUser({
      ...user,
      [e.target.id]: e.target.value,
    });
    setErrorCode(0);
  };

  const VerifyButton = () => {
    if (user.email_verify === "INIT") {
      return <p onClick={emailVerifyHandler}>인증하기</p>;
    } else if (user.email_verify === "WAITING") {
      return <p className="waiting">대기중</p>;
    } else {
      return <p className="verified">인증완료!</p>;
    }
  };

  const Socket = () => {
    useEffect(() => {
      const socket = socketIOClient("http://127.0.0.1:3333");
      socket.on("hugus", (data) => {
        if (data === "SUCCESS") {
          setUser({ ...user, email_verify: "SUCCESS" });
        }
      });
      return () => {
        socket.disconnect();
      };
    }, []);
    return null;
  };

  return (
    <>
      <Socket />
      <SignUpStyle>
        <section>
          <article className="header">
            <p
              className="close__btn"
              onClick={() => dispatch(signUpBtnIsClicked())}
            >
              닫기
            </p>
            <p>회원가입</p>
          </article>
          <article className="form">
            <div className="email">
              <input
                ref={email}
                id="email"
                value={user.email}
                placeholder="이메일"
                onChange={onChangeHandler}
              />
              <VerifyButton />
            </div>
            <div>
              <input
                ref={nickname}
                id="nickname"
                value={user.nickname}
                placeholder="닉네임"
                onChange={onChangeHandler}
              />
            </div>
            <div>
              <input
                ref={password}
                id="password"
                value={user.password}
                type="password"
                placeholder="비밀번호"
                onChange={onChangeHandler}
              />
            </div>
            <div>
              <input
                ref={password_confirm}
                id="password_confirm"
                value={user.password_confirm}
                type="password"
                placeholder="비밀번호 확인"
                onChange={onChangeHandler}
              />
            </div>

            <div className="agreement">
              <input
                ref={term}
                type="checkbox"
                defaultChecked={checkTerm}
                onChange={checkHandler}
              />
              <p onClick={onClickTerm}>개인정보 이용 동의</p>
            </div>

            <button onClick={signUpHandler}>가입하기</button>
          </article>
          <article className="already">
            <p>이미 회원이신가요?</p>
            <p onClick={() => dispatch(signInBtnIsClicked())}>로그인</p>
          </article>
        </section>
        {openTerm && (
          <section className="terms">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ut
              erat at leo varius fermentum. Vivamus feugiat eget velit et
              aliquam. Orci varius natoque penatibus et magnis dis parturient
              montes, nascetur ridiculus mus. Curabitur venenatis mollis elit,
              at semper odio lacinia ac. Praesent tincidunt pellentesque
              consectetur. Ut sodales vulputate dui pretium rutrum. Nullam vel
              metus porttitor, sollicitudin justo sed, varius quam. Nunc
              faucibus faucibus pellentesque. Integer laoreet fermentum tellus,
              vehicula aliquam diam blandit id. Suspendisse sagittis consequat
              mollis. Nullam interdum lacinia elit non tempus. Aenean efficitur
              porttitor leo nec gravida. Sed ultrices quis lorem id ultricies.
              Vivamus tincidunt metus a malesuada dictum. Aliquam mollis
              elementum dui quis vestibulum. Sed sed lectus condimentum nulla
              eleifend volutpat elementum eget massa. Aenean vulputate urna sit
              amet sollicitudin eleifend. Vivamus diam lectus, tristique vitae
              tristique vel, pharetra id tortor. Phasellus consectetur libero
              vel diam faucibus commodo. Suspendisse urna ante, mollis at
              dapibus quis, pellentesque in magna. Vivamus sit amet ligula vel
              orci varius ornare sed rhoncus erat. Integer volutpat ac leo at
              tempor. Sed sed mauris sed diam lobortis auctor sed at nibh. Etiam
              vitae felis tincidunt, accumsan ex at, faucibus metus. Nunc a
              aliquet ex, vitae suscipit nulla. Ut faucibus sagittis tellus at
              luctus. In placerat, ipsum tincidunt cursus sodales, nisi diam
              mattis erat, ac auctor lectus leo ac tortor. Cras ac massa nunc.
              Aenean tincidunt arcu vitae augue blandit, consectetur eleifend
              eros commodo. Cras sed magna tempus, suscipit eros sed, malesuada
              quam. Ut elementum nisi turpis, in porttitor turpis vulputate
              eget. Cras et velit id ante rhoncus tristique at at leo. Donec
              tristique augue at eros eleifend dictum. Integer ac lobortis nisl.
              Vivamus aliquet fermentum ullamcorper. Ut sodales egestas odio eu
              efficitur. Maecenas pellentesque accumsan nibh, nec bibendum est
              luctus ac. Proin sit amet posuere neque, nec efficitur dolor.
              Morbi eu porttitor odio. Suspendisse molestie quam magna, eu
              molestie orci varius vitae. Vivamus sit amet nisi maximus, porta
              velit sed, mollis orci. Class aptent taciti sociosqu ad litora
              torquent per conubia nostra, per inceptos himenaeos. Vestibulum a
              metus erat. Nullam tincidunt nibh in lectus consequat laoreet.
              Nulla viverra lacus quis tellus pharetra, vitae finibus lorem
              laoreet. Aliquam egestas ut nisi in posuere. Nunc tincidunt cursus
              fringilla. Suspendisse potenti. Sed velit massa, hendrerit eget
              placerat eu, commodo non arcu. Nullam ullamcorper quam ac feugiat
              varius. In lacus elit, tempor at lacus at, blandit luctus mi. Duis
              feugiat a dui non elementum. Pellentesque vehicula, diam eget
              efficitur gravida, nulla risus sagittis elit, eu ullamcorper velit
              augue vitae sapien. Pellentesque et leo lacinia nisi rutrum
              scelerisque. Nulla non nunc purus. Maecenas eget velit sed augue
              scelerisque scelerisque sit amet eget lectus. Sed vel justo at
              quam pretium tempus eget non ex. Curabitur feugiat ante ex, id
              vestibulum neque luctus ac. Integer sit amet arcu dapibus,
              vulputate elit non, congue leo.
            </p>
            <button onClick={CloseTerm}>닫기</button>
          </section>
        )}
      </SignUpStyle>
      <ErrorBoxStyle error={errorCode}>{errorMsg[errorCode]}</ErrorBoxStyle>
    </>
  );
};

export default SignUp;
