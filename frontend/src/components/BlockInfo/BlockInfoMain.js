import React, { useState } from "react";
import styled from "styled-components";
import Flow from "./Flow";

const BlockInfoMainStyle = styled.article`
  margin-top: 50px;
  width: 100%;
  display: flex;
  justify-content: center;
  > div {
    width: 80%;
    display: flex;
    flex-direction: column;
    .BlockInfoMain__title {
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-items: center;
      p:nth-child(1) {
        font-size: 20px;
      }
    }

    .BlockInfoMain__header {
      display: grid;
      grid-template-columns: 1fr 4fr 1fr 1fr 2fr 2fr;
      border-top: solid 0.1px orange;
      border-bottom: solid 0.1px lightgray;
      > p {
        justify-self: center;
      }
    }

    .BlockInfoMain__body {
      transition: background-color 0.2s ease-in-out;
      display: grid;
      align-items: center;
      grid-template-columns: 1fr 4fr 1fr 1fr 2fr 2fr;
      > p,
      span {
        justify-self: center;
        margin: 5px;
        input {
          outline: none;
          border: none;
          background: transparent;
          width: 200px;
        }
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
      p:nth-child(2) {
        display: flex;
        align-items: center;
      }
      :hover {
        background-color: #c5e8f6;
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

const BlockInfoMain = ({ list, history }) => {
  const onClickHandler = () => {
    history.push("/Block/List");
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
    <BlockInfoMainStyle>
      <div>
        <div className="BlockInfoMain__title">
          <p>Blocks & Transactions</p>
          <p className="BlockViewAll__btn" onClick={onClickHandler}>
            View All
          </p>
        </div>
        <div className="BlockInfoMain__header">
          <p className="block_height">BLOCK HEIGHT</p>
          <p className="tx_id">TX HASH</p>
          <p className="tx_type">TX TYPE</p>
          <p className="age">AGE</p>
          <p className="sender_id">FROM</p>
          <p className="receiver_id">TO</p>
        </div>

        {list.map((block, key) => {
          return (
            <div className="BlockInfoMain__body" key={key}>
              <p className="block_height">{block.block_height}</p>
              <p>
                <input
                  readOnly
                  className="tx_id"
                  id={block.tx_id}
                  value={block.tx_id}
                />
                ...
                <CopiedAlert id={block.tx_id} />
              </p>
              <p className="tx_type">{block.tx_type}</p>
              <Flow className="age" block_time={block.timestamp} />
              <p className="sender_id">{block.sender_id}</p>
              <p className="receiver_id">{block.receiver_id}</p>
            </div>
          );
        })}
      </div>
    </BlockInfoMainStyle>
  );
};

export default BlockInfoMain;
