import React, { useState } from "react";
import styled from "styled-components";
import Flow from "./Flow";

const TransactionListStyle = styled.div`
  min-width: 900px;
  width: 60%;
  display: flex;
  justify-content: center;
  > div {
    width: 90%;
    display: flex;
    flex-direction: column;
    .TxList__title {
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-items: center;
      p:nth-child(1) {
        font-size: 23px;
      }
      .TransactionViewAll__btn {
        cursor: pointer;
      }
    }
    .TxList__header {
      display: grid;
      grid-template-columns: 3fr 1fr 1fr 1fr;
      border-top: solid 0.1px orange;
      border-bottom: solid 0.1px lightgray;
      font-size: 15px;
      > p {
        justify-self: center;
      }
    }
    .TxList__body {
      transition: background-color 0.2s ease-in-out;
      display: grid;
      align-items: center;
      grid-template-columns: 3fr 1fr 1fr 1fr;
      font-size: 15px;
      > p,
      span {
        justify-self: center;
        margin: 5px;
        button {
          background: transparent;
          outline: none;
          color: gray;
          border: none;
          cursor: pointer;
          transition: color 0.2s ease-in-out;
          :hover {
            color: #0c7eff;
            font-weight: bold;
          }
        }
      }
      .tx_id {
        justify-self: center;
        display: flex;
        align-items: center;
        input {
          outline: none;
          border: none;
          background: transparent;
          width: 200px;
          font-size: 15px;
        }
      }
      :hover {
        background-color: peachpuff;
      }
    }
  }
`;

const CopiedAlertStyle = styled.span`
  display: flex;
  align-items: center;
  .time {
    transition: opacity 0.3s ease-in-out;
    opacity: ${(props) => (props.time ? 1 : 0)};
    font-size: 13px;
  }
`;

const TransactionList = ({ txList, history }) => {
  const onClickHandler = () => {
    history.push("/block/all/tx");
  };
  const CopiedAlert = ({ id }) => {
    const [time, setTime] = useState(false);
    const copyTx = () => {
      setTime(true);
      setTimeout(() => setTime(false), 1000);
      const tx_id = document.getElementById(id);
      tx_id.select();
      document.execCommand("Copy");
    };

    return (
      <CopiedAlertStyle time={time}>
        <button onClick={copyTx}>복사</button>
        <span className="time">복사완료!</span>
      </CopiedAlertStyle>
    );
  };

  return (
    <TransactionListStyle>
      <div>
        <div className="TxList__title">
          <p>Transactions</p>
          <p className="TransactionViewAll__btn" onClick={onClickHandler}>
            View All
          </p>
        </div>
        <div className="TxList__header">
          <p className="tx_id">TX HASH</p>
          <p className="age">AGE</p>
          <p className="sender_id">FROM</p>
          <p className="receiver_id">TO</p>
        </div>
        {txList.map((tx, key) => {
          return (
            <div className="TxList__body" key={key}>
              <p className="tx_id">
                <input readOnly id={tx.tx_id} value={tx.tx_id} />
                ...
                <CopiedAlert id={tx.tx_id} />
              </p>
              <Flow className="age" block_time={tx.timestamp} />
              <p className="sender_id">{tx.sender_id}</p>
              <p className="receiver_id">{tx.receiver_id}</p>
            </div>
          );
        })}
      </div>
    </TransactionListStyle>
  );
};

export default TransactionList;
