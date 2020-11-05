import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { PayLoader, PaySocket, Pending } from "components";
import { useSelector } from "react-redux";

const PayStyle = styled.section`
  padding-top: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .pay__header {
    width: 700px;
    height: 280px;
    display: flex;
    flex-direction: column;
    > p {
      width: 100px;
      border-bottom: solid orange 2px;
      font-size: 20px;
      padding: 10px;
    }
    .pay__header__contents {
      display: flex;
      margin-top: 50px;
      .pay__header__img {
        min-width: 150px;
        height: 150px;
        border-radius: 10px;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        justify-self: center;
      }
      .pay__header__data {
        display: flex;
        width: 100%;
        flex-direction: column;
        justify-content: space-around;
        .pay__header__top {
          width: 100%;
          height: 50px;
          font-weight: bold;
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          > p {
            justify-self: center;
          }
        }
        .pay__header__bottom {
          display: grid;
          grid-template-columns: 1fr 1fr;
          width: 100%;
          align-items: center;
          font-size: 18px;
          > p {
            justify-self: center;
          }
          > div {
            justify-self: center;
            display: flex;
            > input {
              width: 150px;
              border: none;
              border-bottom: solid 0.1px lightgray;
              margin-right: 5px;
              outline: none;
              text-align: end;
              font-size: 18px;
            }
          }
        }
        .pay__header__select {
          width: 100%;
          display: grid;
          grid-template-columns: 1fr 1fr;
          > div:nth-child(2) {
            justify-self: center;
            button {
              background-color: transparent;
              margin: 5px;
              padding: 5px;
              width: 70px;
              height: 30px;
              border-radius: 15px;
              border: 0.1px solid lightgray;
              cursor: pointer;
              outline: none;
              :hover {
                border: 0.1px solid orange;
                color: orange;
              }
            }
          }
        }
      }
    }
  }

  .pay__type {
    margin-top: 170px;
    width: 700px;
    display: flex;
    flex-direction: column;
    > p {
      width: 100px;
      border-bottom: solid orange 2px;
      font-size: 20px;
      padding: 10px;
      margin-bottom: 40px;
    }
    > div {
      display: flex;
      width: 100%;
      justify-content: space-between;

      .kakaopay {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 150px;
        height: 100px;
        transition: background-color 0.5s ease-in-out;
        border-radius: 10px;
        background-color: ${(props) =>
          props.pay == "kakaopay" ? "rgba(0,0,0,0.15)" : "transparent"};
        img {
          cursor: pointer;
          width: 70px;
        }
        margin-right: 20px;
      }
      .naverpay {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 150px;
        height: 100px;
        border-radius: 10px;
        transition: background-color 0.5s ease-in-out;
        background-color: ${(props) =>
          props.pay == "naverpay" ? "rgba(0,0,0,0.15)" : "transparent"};

        img {
          width: 60px;
          cursor: pointer;
        }
        margin-right: 20px;
      }
      .samsungpay {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 150px;
        height: 100px;
        transition: background-color 0.5s ease-in-out;
        border-radius: 10px;
        background-color: ${(props) =>
          props.pay == "samsungpay" ? "rgba(0,0,0,0.15)" : "transparent"};
        img {
          width: 60px;
          cursor: pointer;
        }
        margin-right: 20px;
      }
      .card {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 150px;
        height: 100px;
        transition: background-color 0.5s ease-in-out;
        border-radius: 10px;
        background-color: ${(props) =>
          props.pay == "card" ? "rgba(0,0,0,0.15)" : "transparent"};
        margin-right: 15px;
        p {
          cursor: pointer;
        }
      }
      .money {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 150px;
        height: 100px;
        transition: background-color 0.5s ease-in-out;
        border-radius: 10px;
        background-color: ${(props) =>
          props.pay == "money" ? "rgba(0,0,0,0.15)" : "transparent"};
        p {
          cursor: pointer;
        }
      }
    }
  }
  .pay__summary {
    margin-top: 100px;
    width: 700px;
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: solid 0.1px lightgray;
    > p {
      font-size: 20px;
      padding: 10px;
      :nth-child(2) {
        strong {
          margin-right: 10px;
          font-size: 30px;
        }
      }
    }
  }
  .pay__button {
    margin-top: 100px;
    width: 700px;
    height: 200px;
    display: flex;
    justify-content: center;
    > button {
      cursor: pointer;
      outline: none;
      width: 200px;
      height: 60px;
      font-size: 20px;
      background-color: orange;
      color: white;
      border: none;
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
  width: 180px;
  height: 50px;
  transition: 0.7s ease-in-out;
  font-size: 15px;
`;

const errorMsg = [
  "",
  "제목을 입력 바랍니다",
  "소개를 입력 바랍니다",
  "내용을 입력 바랍니다",
  "물품 내용을 입력 바랍니다",
  "물품 금액을 입력 바랍니다",
  "물품 수량을 입력 바랍니다",
  "필요물품을 등록 바랍니다",
  "해시태그를 입력 바랍니다",
];

const Pay = ({ match, history }) => {
  const [pay, setPay] = useState("kakaopay");
  const [amount, setAmount] = useState(0);
  const amountInput = useRef(false);
  const [status, setStatus] = useState(false);
  const [pending, setPending] = useState("INIT");
  const [data, setData] = useState({});
  const [error, setError] = useState(false);
  const init = useRef(true);
  const email = useSelector((state) => state.auth.user.email);
  const naverPayObj = useSelector(state=>state.auth.naverPayObj);
  const kakaoPay = async () => {
    
    setPending("WAITING");
    const data = await axios.post("/pay/", {
      campaign_id: match.params.id,
      total_amount: amount,
    });
    window.open(
      `${data.data.data.next_redirect_pc_url}`,
      "HUGUS_pay",
      "width=500,height=500"
    );
  };

  const naverPay = async () => {
    naverPayObj.open({
      "merchantUserKey": "partner-userkey",
      "merchantPayKey": "partnder-orderkey",
      "productName": data.campaign_title ,
      "totalPayAmount": amount,
      "taxScopeAmount": amount,
      "taxExScopeAmount": "0",
      "returnUrl": "http://localhost:3001"
    });
  };

  const payReady = () => {
    if (pay === "kakaopay") {
      if (amount === 0) {
        setError(true);
        amountInput.current.focus();
        return;
      }
      return kakaoPay();
    } else if (pay === "naverpay") {
      if (amount === 0) {
        setError(true);
        amountInput.current.focus();
        return;
      }
      return naverPay();
    } else {
      alert("개발 진행중입니다.");
      return;
    }
  };

  const amountChange = (e) => {
    setAmount(e.target.value);
    setError(false);
  };

  const payTypeChange = useCallback((e) => {
    if (e.target.id === "kakaopay") {
      setPay("kakaopay");
    } else if (e.target.id === "naverpay") {
      setPay("naverpay");
    } else if (e.target.id === "samsungpay") {
      setPay("samsungpay");
    } else if (e.target.id === "card") {
      setPay("card");
    } else {
      setPay("money");
    }
  }, []);

  const loader = async () => {
    const res = await axios.get(`/campaign/${match.params.id}`);
    setData(res.data.data);
    setStatus(true);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (init.current) {
      loader();
      init.current = false;
    }
  }, []);

  if (!status) return <PayLoader />;
  return (
    <>
      {pending === "WAITING" && <Pending />}
      <PaySocket
        pending={pending}
        setPending={setPending}
        email={email}
        history={history}
      />
      <PayStyle pay={pay}>
        <article className="pay__header">
          <p>결제 확인</p>
          <div className="pay__header__contents">
            <div
              className="pay__header__img"
              style={{
                backgroundImage: `url("${data.Campaign_Files[0].file}")`,
              }}
            ></div>
            <div className="pay__header__data">
              <div className="pay__header__top">
                <p>캠페인 명</p>
                <p>기부금액</p>
              </div>
              <div className="pay__header__bottom">
                <p>{data.campaign_title}</p>
                <div>
                  <input
                    ref={amountInput}
                    type="number"
                    value={amount}
                    onChange={amountChange}
                  />
                  <span>원</span>
                </div>
              </div>
              <div className="pay__header__select">
                <div></div>
                <div>
                  <button
                    onClick={() => {
                      setError(false);
                      setAmount(Number(amount) + 1000);
                    }}
                  >
                    +1천원
                  </button>
                  <button
                    onClick={() => {
                      setError(false);
                      setAmount(Number(amount) + 10000);
                    }}
                  >
                    +1만원
                  </button>
                  <button
                    onClick={() => {
                      setError(false);
                      setAmount(Number(amount) + 100000);
                    }}
                  >
                    +1십만원
                  </button>
                </div>
              </div>
            </div>
          </div>
        </article>
        <article className="pay__type">
          <p>결제 방법</p>
          <div>
            <div className="kakaopay">
              <img
                src="/icons/kakaopay.png"
                id="kakaopay"
                onClick={payTypeChange}
              />
            </div>
            <div className="naverpay">
              <img
                src="/icons/naverpay.png"
                id="naverpay"
                onClick={payTypeChange}
              />
            </div>
            <div className="samsungpay">
              <img
                src="/icons/samsungpay2.png"
                id="samsungpay"
                onClick={payTypeChange}
              />
            </div>
            <div className="card">
              <p id="card" onClick={payTypeChange}>
                신용카드
              </p>
            </div>
            <div className="money">
              <p id="money" onClick={payTypeChange}>
                실시간 계좌이체
              </p>
            </div>
          </div>
        </article>
        <article className="pay__summary">
          <p>결제금액</p>
          <p>
            <strong>{amount.toLocaleString()}</strong>원
          </p>
        </article>
        <article className="pay__button">
          <button onClick={payReady}>결제하기</button>
        </article>
      </PayStyle>
      <ErrorBoxStyle error={error}>금액을 입력 바랍니다</ErrorBoxStyle>
    </>
  );
};

export default Pay;
