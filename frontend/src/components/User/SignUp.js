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
      socket.on(user.email, (data) => {
        if (data === "SUCCESS") {
          setUser({ ...user, email_verify: "SUCCESS" });
        }
      });
      return () => {
        socket.disconnect();
      };
    }, [user.email_verify]);
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
              개인정보보호법에 따라 HUGUS에 회원가입 신청하시는 분께 수집하는
              개인정보의 항목, 개인정보의 수집 및 이용목적, 개인정보의 보유 및
              이용기간, 동의 거부권 및 동의 거부 시 불이익에 관한 사항을 안내
              드리오니 자세히 읽은 후 동의하여 주시기 바랍니다. 1. 수집하는
              개인정보 이용자는 회원가입을 하지 않아도 정보 검색, 뉴스 보기 등
              대부분의 HUGUS 서비스를 회원과 동일하게 이용할 수 있습니다.
              이용자가 메일, 캘린더, 카페, 블로그 등과 같이 개인화 혹은 회원제
              서비스를 이용하기 위해 회원가입을 할 경우, HUGUS는 서비스 이용을
              위해 필요한 최소한의 개인정보를 수집합니다. 회원가입 시점에
              HUGUS가 이용자로부터 수집하는 개인정보는 아래와 같습니다. - 회원
              가입 시에 ‘아이디, 비밀번호, 이름, 생년월일, 성별, 휴대전화번호’를
              필수항목으로 수집합니다. 만약 이용자가 입력하는 생년월일이 만14세
              미만 아동일 경우에는 법정대리인 정보(법정대리인의 이름, 생년월일,
              성별, 중복가입확인정보(DI), 휴대전화번호)를 추가로 수집합니다.
              그리고 선택항목으로 이메일 주소, 프로필 정보를 수집합니다. -
              단체아이디로 회원가입 시 단체아이디, 비밀번호, 단체이름,
              이메일주소, 휴대전화번호를 필수항목으로 수집합니다. 그리고 단체
              대표자명을 선택항목으로 수집합니다. 서비스 이용 과정에서
              이용자로부터 수집하는 개인정보는 아래와 같습니다. HUGUS 내의 개별
              서비스 이용, 이벤트 응모 및 경품 신청 과정에서 해당 서비스의
              이용자에 한해 추가 개인정보 수집이 발생할 수 있습니다. 추가로
              개인정보를 수집할 경우에는 해당 개인정보 수집 시점에서 이용자에게
              ‘수집하는 개인정보 항목, 개인정보의 수집 및 이용목적, 개인정보의
              보관기간’에 대해 안내 드리고 동의를 받습니다. 서비스 이용 과정에서
              IP 주소, 쿠키, 서비스 이용 기록, 기기정보, 위치정보가 생성되어
              수집될 수 있습니다. 또한 이미지 및 음성을 이용한 검색 서비스
              등에서 이미지나 음성이 수집될 수 있습니다. 구체적으로 1) 서비스
              이용 과정에서 이용자에 관한 정보를 자동화된 방법으로 생성하여 이를
              저장(수집)하거나, 2) 이용자 기기의 고유한 정보를 원래의 값을
              확인하지 못 하도록 안전하게 변환하여 수집합니다. 서비스 이용
              과정에서 위치정보가 수집될 수 있으며, HUGUS에서 제공하는 위치기반
              서비스에 대해서는 'HUGUS 위치정보 이용약관'에서 자세하게 규정하고
              있습니다. 이와 같이 수집된 정보는 개인정보와의 연계 여부 등에 따라
              개인정보에 해당할 수 있고, 개인정보에 해당하지 않을 수도 있습니다.
              2. 수집한 개인정보의 이용 HUGUS 및 HUGUS 관련 제반 서비스(모바일
              웹/앱 포함)의 회원관리, 서비스 개발・제공 및 향상, 안전한 인터넷
              이용환경 구축 등 아래의 목적으로만 개인정보를 이용합니다. - 회원
              가입 의사의 확인, 연령 확인 및 법정대리인 동의 진행, 이용자 및
              법정대리인의 본인 확인, 이용자 식별, 회원탈퇴 의사의 확인 등
              회원관리를 위하여 개인정보를 이용합니다. - 콘텐츠 등 기존 서비스
              제공(광고 포함)에 더하여, 인구통계학적 분석, 서비스 방문 및
              이용기록의 분석, 개인정보 및 관심에 기반한 이용자간 관계의 형성,
              지인 및 관심사 등에 기반한 맞춤형 서비스 제공 등 신규 서비스
              요소의 발굴 및 기존 서비스 개선 등을 위하여 개인정보를 이용합니다.
              - 법령 및 HUGUS 이용약관을 위반하는 회원에 대한 이용 제한 조치,
              부정 이용 행위를 포함하여 서비스의 원활한 운영에 지장을 주는
              행위에 대한 방지 및 제재, 계정도용 및 부정거래 방지, 약관 개정
              등의 고지사항 전달, 분쟁조정을 위한 기록 보존, 민원처리 등 이용자
              보호 및 서비스 운영을 위하여 개인정보를 이용합니다. - 유료 서비스
              제공에 따르는 본인인증, 구매 및 요금 결제, 상품 및 서비스의 배송을
              위하여 개인정보를 이용합니다. - 이벤트 정보 및 참여기회 제공,
              광고성 정보 제공 등 마케팅 및 프로모션 목적으로 개인정보를
              이용합니다. - 서비스 이용기록과 접속 빈도 분석, 서비스 이용에 대한
              통계, 서비스 분석 및 통계에 따른 맞춤 서비스 제공 및 광고 게재
              등에 개인정보를 이용합니다. - 보안, 프라이버시, 안전 측면에서
              이용자가 안심하고 이용할 수 있는 서비스 이용환경 구축을 위해
              개인정보를 이용합니다. 3. 개인정보의 보관기간 회사는 원칙적으로
              이용자의 개인정보를 회원 탈퇴 시 지체없이 파기하고 있습니다. 단,
              이용자에게 개인정보 보관기간에 대해 별도의 동의를 얻은 경우, 또는
              법령에서 일정 기간 정보보관 의무를 부과하는 경우에는 해당 기간
              동안 개인정보를 안전하게 보관합니다. 이용자에게 개인정보
              보관기간에 대해 회원가입 시 또는 서비스 가입 시 동의를 얻은 경우는
              아래와 같습니다. - 부정 가입 및 이용 방지 가입인증 휴대전화번호
              또는DI (만14세 미만의 경우 법정대리인DI) : 수집시점으로부터6개월
              보관 탈퇴한 이용자의 휴대전화번호(복호화가 불가능한 일방향
              암호화(해시처리)) : 탈퇴일로부터6개월 보관 - QR코드 복구 요청 대응
              QR코드 등록 정보:삭제 시점으로부터6개월 보관 - 스마트플레이스 분쟁
              조정 및 고객문의 대응 휴대전화번호:등록/수정/삭제 요청 시로부터
              최대1년 - HUGUS 플러스 멤버십 서비스 혜택 중복 제공 방지
              암호화처리(해시처리)한DI :혜택 제공 종료일로부터6개월 보관
              전자상거래 등에서의 소비자 보호에 관한 법률, 전자금융거래법,
              통신비밀보호법 등 법령에서 일정기간 정보의 보관을 규정하는 경우는
              아래와 같습니다. HUGUS는 이 기간 동안 법령의 규정에 따라
              개인정보를 보관하며, 본 정보를 다른 목적으로는 절대 이용하지
              않습니다. - 전자상거래 등에서 소비자 보호에 관한 법률 계약 또는
              청약철회 등에 관한 기록: 5년 보관 대금결제 및 재화 등의 공급에
              관한 기록: 5년 보관 소비자의 불만 또는 분쟁처리에 관한 기록: 3년
              보관 - 전자금융거래법 전자금융에 관한 기록: 5년 보관 -
              통신비밀보호법 로그인 기록: 3개월 참고로 HUGUS는 ‘개인정보
              유효기간제’에 따라 1년간 서비스를 이용하지 않은 회원의 개인정보를
              별도로 분리 보관하여 관리하고 있습니다. 4. 개인정보 수집 및 이용
              동의를 거부할 권리 이용자는 개인정보의 수집 및 이용 동의를 거부할
              권리가 있습니다. 회원가입 시 수집하는 최소한의 개인정보, 즉, 필수
              항목에 대한 수집 및 이용 동의를 거부하실 경우, 회원가입이 어려울
              수 있습니다.
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
