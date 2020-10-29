import React from "react";
import styled from "styled-components";
import axios from "axios";

const PayStyle = styled.section`
  padding-top: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .pay__header {
    width: 800px;
    display: flex;
    flex-direction: column;
    > p {
      font-size: 23px;
      padding: 10px;
      border-bottom: solid orange 0.1px;
    }
    .pay__header__top {
      height: 30px;
      display: grid;
      align-items: center;
      grid-template-columns: 2fr 4fr 1fr;
      div:nth-child(1) {
        justify-self: center;
      }
    }
    .pay__header__bottom {
      width: 100%;
      height: 100px;
      display: grid;
      align-items: center;
      grid-template-columns: 2fr 4fr 1fr;
      div:nth-child(1) {
        justify-self: center;
      }
    }
  }

  .pay__type {
    margin-top: 100px;
    width: 800px;
    display: flex;
    flex-direction: column;
    > p {
      font-size: 23px;
      padding: 10px;
      border-bottom: solid orange 0.1px;
    }
    > div {
      .kakaopay {
        display: flex;
        align-items: center;
        img {
          width: 70px;
        }
        input {
          width: 15px;
          height: 15px;
          margin-right: 10px;
        }
      }
    }
  }
`;

const Pay = ({ match }) => {
  const payHandler = async () => {
    const data = await axios.post("/pay/", {
      campaign_id: match.params.id,
      total_amount: 370000,
    });
    window.open(
      `${data.data.data.next_redirect_pc_url}`,
      "HUGUS_pay",
      "width=430,height=500"
    );
  };

  return (
    <PayStyle>
      <article className="pay__header">
        <p>결제</p>
        <div className="pay__header__top">
          <div></div>
          <div>여기 캠페인 제목</div>
          <div>여기 희망기부금액</div>
        </div>
        <div className="pay__header__bottom">
          <div>사진</div>
          <div>테스트1</div>
          <div>100000</div>
        </div>
      </article>
      <article className="pay__type">
        <p>결제 수단 선택</p>
        <div>
          <div className="kakaopay">
            <input id="kakaopay" type="radio" />
            <img src="/icons/kakaopay.png" />
          </div>
        </div>
      </article>
      <article className="pay__button">
        <button>결제하기</button>
      </article>
    </PayStyle>
  );
};

export default Pay;
