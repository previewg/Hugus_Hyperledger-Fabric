import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {signUpRequest} from "../../actions/auth";
import {emailConfirmRequest, emailSendRequest, signInBtnIsClicked, signUpBtnIsClicked} from "../../actions/user";

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
      height: 45%;
      input {
        width: 70%;
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
          width: 15px;
          margin-right: 5px;
        }
        p {
          cursor: pointer;
          font-size: 13px;
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
    .social {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      height: 30%;
      p {
        font-size: 13px;
      }
      .social__logo {
        width: 50%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        img {
          width: 35px;
          cursor: pointer;
          transition: 0.2s ease-in-out;

          :hover {
            transform: scale(1.2);
          }
        }
      }
      .already {
        display: flex;
        justify-content: space-around;
        width: 50%;
        color: gray;
        p:nth-child(2) {
          color: orange;
          cursor: pointer;
        }
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
const SignUp = () => {
    const dispatch = useDispatch();
    const errorCode = useSelector((state) => state.authentication.signUp.error);
    const confirmed_Status = useSelector((state) => state.authentication.emailConfirm.status);
    const send_Status = useSelector((state) => state.authentication.emailConfirm.send_status);
    const confirmed_key = useSelector((state) => state.authentication.emailConfirm.key);
    const registerStatus = useSelector(
        (state) => state.authentication.signUp.status
    );
    const [user, setUser] = useState({
        email: "",
        nickname: "",
        password: "",
        password_Confirm: "",
    });
    const [try_Confirm, setTry_Confirm] = useState(0)
    const [openTerm, setOpenTerm] = useState(false);
    const [checkTerm, setCheckTerm] = useState(false);

    const errorMessage = [
        "이메일이 이미 존재합니다.",
        "이메일 형식에 맞게 입력해주세요",
        "닉네임이 이미 존재합니다.",
        "패스워드는 영문,숫자 포함 10자리 이상 입력해주세요",
        "이메일 인증을 완료해주세요",
    ];

    const checkHandler = () => {
        if (checkTerm === false) {
            setCheckTerm(true)
        } else {
            setCheckTerm(false)
        }
    }
    const emailConfirmHandler = async () => {
        await setTry_Confirm(1)
        if (try_Confirm === 0) {
            await dispatch(emailSendRequest({user}))
            alert("이메일을 확인 해 주세요")
        } else {
            alert("이미 발송되었습니다")
        }
    }


    const signUpHandler = () => {
        if (checkTerm === true) {
            if (user.password === user.password_Confirm) {
                dispatch(signUpRequest({user}));
            } else {
                alert("비밀번호가 일치하지 않습니다.")
            }
        } else {
            alert("이용약관에 동의해 주세요")
        }

    };

    const onClickTerm = () => {
        setOpenTerm(true);
    };
    const CloseTerm = () => {
        setOpenTerm(false);
    };

    const onChangeHandler = (e) => {
        setUser({
            ...user,
            [e.target.id]: e.target.value
        })
        if (e.key === "Enter") {
            signUpHandler()
        }
    }

    useEffect(() => {

        if (registerStatus === "SUCCESS") {
            alert("회원가입성공");
            dispatch(signInBtnIsClicked());
            setUser({
                email: "",
                nickname: "",
                password: "",
                password_Confirm: "",
            });

        } else if (registerStatus === "FAILURE") {
            alert(errorMessage[errorCode - 1]);
        }
    }, [registerStatus]);

    return (
        <SignUpStyle>
            <section>
                <article className='header'>
                    <p className='close__btn' onClick={() => dispatch(signUpBtnIsClicked())}>닫기</p>
                    <p>회원가입</p>
                </article>
                <article className='form'>
                    <input id='email' value={user.email} placeholder='이메일' onChange={onChangeHandler}
                           onKeyPress={onChangeHandler}/>
                    <div>
                        <button onClick={emailConfirmHandler}>
                            이메일 인증하기
                        </button>
                    </div>

                    <input id='nickname' value={user.nickname} placeholder='닉네임' onChange={onChangeHandler}
                           onKeyPress={onChangeHandler}/>
                    <input id='password' value={user.password} type='password' placeholder='비밀번호'
                           onChange={onChangeHandler} onKeyPress={onChangeHandler}/>
                    <input id='password_Confirm' value={user.password_Confirm} type='password' placeholder='비밀번호 확인'
                           onChange={onChangeHandler} onKeyPress={onChangeHandler}/>
                    <div className='agreement'>
                        <input type='checkbox' defaultChecked={checkTerm} onChange={checkHandler}/>
                        <p onClick={onClickTerm}>개인정보 이용 동의</p>
                    </div>

                    <button onClick={signUpHandler}>가입하기</button>
                </article>
                <article className="social">
                    <p>소셜 계정으로 간편하게 가입하세요!</p>
                    <div className="social__logo">
                        <img alt="google" src="icons/google.png"/>
                        <img alt="kakao" src="icons/kakao.png"/>
                        <img alt="facebook" src="icons/facebook.png"/>
                    </div>
                    <div className="already">
                        <p>이미 회원이신가요?</p>
                        <p onClick={() => dispatch(signInBtnIsClicked())}>로그인</p>
                    </div>
                </article>
            </section>
            {openTerm === true ? (
                <section className="terms">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ut
                        erat at leo varius fermentum. Vivamus feugiat eget velit et aliquam.
                        Orci varius natoque penatibus et magnis dis parturient montes,
                        nascetur ridiculus mus. Curabitur venenatis mollis elit, at semper
                        odio lacinia ac. Praesent tincidunt pellentesque consectetur. Ut
                        sodales vulputate dui pretium rutrum. Nullam vel metus porttitor,
                        sollicitudin justo sed, varius quam. Nunc faucibus faucibus
                        pellentesque. Integer laoreet fermentum tellus, vehicula aliquam
                        diam blandit id. Suspendisse sagittis consequat mollis. Nullam
                        interdum lacinia elit non tempus. Aenean efficitur porttitor leo nec
                        gravida. Sed ultrices quis lorem id ultricies. Vivamus tincidunt
                        metus a malesuada dictum. Aliquam mollis elementum dui quis
                        vestibulum. Sed sed lectus condimentum nulla eleifend volutpat
                        elementum eget massa. Aenean vulputate urna sit amet sollicitudin
                        eleifend. Vivamus diam lectus, tristique vitae tristique vel,
                        pharetra id tortor. Phasellus consectetur libero vel diam faucibus
                        commodo. Suspendisse urna ante, mollis at dapibus quis, pellentesque
                        in magna. Vivamus sit amet ligula vel orci varius ornare sed rhoncus
                        erat. Integer volutpat ac leo at tempor. Sed sed mauris sed diam
                        lobortis auctor sed at nibh. Etiam vitae felis tincidunt, accumsan
                        ex at, faucibus metus. Nunc a aliquet ex, vitae suscipit nulla. Ut
                        faucibus sagittis tellus at luctus. In placerat, ipsum tincidunt
                        cursus sodales, nisi diam mattis erat, ac auctor lectus leo ac
                        tortor. Cras ac massa nunc. Aenean tincidunt arcu vitae augue
                        blandit, consectetur eleifend eros commodo. Cras sed magna tempus,
                        suscipit eros sed, malesuada quam. Ut elementum nisi turpis, in
                        porttitor turpis vulputate eget. Cras et velit id ante rhoncus
                        tristique at at leo. Donec tristique augue at eros eleifend dictum.
                        Integer ac lobortis nisl. Vivamus aliquet fermentum ullamcorper. Ut
                        sodales egestas odio eu efficitur. Maecenas pellentesque accumsan
                        nibh, nec bibendum est luctus ac. Proin sit amet posuere neque, nec
                        efficitur dolor. Morbi eu porttitor odio. Suspendisse molestie quam
                        magna, eu molestie orci varius vitae. Vivamus sit amet nisi maximus,
                        porta velit sed, mollis orci. Class aptent taciti sociosqu ad litora
                        torquent per conubia nostra, per inceptos himenaeos. Vestibulum a
                        metus erat. Nullam tincidunt nibh in lectus consequat laoreet. Nulla
                        viverra lacus quis tellus pharetra, vitae finibus lorem laoreet.
                        Aliquam egestas ut nisi in posuere. Nunc tincidunt cursus fringilla.
                        Suspendisse potenti. Sed velit massa, hendrerit eget placerat eu,
                        commodo non arcu. Nullam ullamcorper quam ac feugiat varius. In
                        lacus elit, tempor at lacus at, blandit luctus mi. Duis feugiat a
                        dui non elementum. Pellentesque vehicula, diam eget efficitur
                        gravida, nulla risus sagittis elit, eu ullamcorper velit augue vitae
                        sapien. Pellentesque et leo lacinia nisi rutrum scelerisque. Nulla
                        non nunc purus. Maecenas eget velit sed augue scelerisque
                        scelerisque sit amet eget lectus. Sed vel justo at quam pretium
                        tempus eget non ex. Curabitur feugiat ante ex, id vestibulum neque
                        luctus ac. Integer sit amet arcu dapibus, vulputate elit non, congue
                        leo.
                    </p>
                    <button onClick={CloseTerm}>닫기</button>
                </section>
            ) : null}
        </SignUpStyle>
    );
};

export default SignUp;
