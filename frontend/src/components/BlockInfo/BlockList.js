import React, { useState } from "react";
import styled from "styled-components";
import Flow from "./Flow";

const BlockListStyle = styled.div`
  min-width: 700px;
  width: 40%;
  display: flex;
  justify-content: center;
  > div {
    width: 90%;
    display: flex;
    flex-direction: column;
    .BlockList__title {
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-items: center;
      p:nth-child(1) {
        font-size: 20px;
      }
    }
    .BlockList__header {
      display: grid;
      grid-template-columns: 1fr 3fr 1fr 1fr;
      border-top: solid 0.1px orange;
      border-bottom: solid 0.1px lightgray;
      font-size: 15px;
      > p {
        justify-self: center;
      }
    }
    .BlockList__body {
      transition: background-color 0.2s ease-in-out;
      display: grid;
      align-items: center;
      grid-template-columns: 1fr 3fr 1fr 1fr;
      font-size: 15px;
      > p,
      span {
        justify-self: center;
        margin: 5px;
        input {
          outline: none;
          border: none;
          background: transparent;
          width: 150px;
          font-size: 15px;
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
      .block_hash {
        justify-self: right;
        display: flex;
        align-items: center;
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

const BlockList = ({ blockList, history }) => {
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
    <BlockListStyle>
      <div>
        <div className="BlockList__title">
          <p>Blocks</p>
          <p className="BlockViewAll__btn" onClick={onClickHandler}>
            View All
          </p>
        </div>
        <div className="BlockList__header">
          <p className="block_height">BLOCK HEIGHT</p>
          <p className="block_hash">BLOCK HASH</p>
          <p className="age">AGE</p>
          <p className="tx_count">TX COUNT</p>
        </div>

        {blockList.map((block, key) => {
          return (
            <div className="BlockList__body" key={key}>
              <p className="block_height">{block.block_height}</p>
              <p className="block_hash">
                <input
                  readOnly
                  id={block.block_hash}
                  value={block.block_hash}
                />
                ...
                <CopiedAlert id={block.block_hash} />
              </p>
              <Flow className="age" block_time={block.timestamp} />
              <p className="tx_count">{block.tx_count}</p>
            </div>
          );
        })}
      </div>
    </BlockListStyle>
  );
};

export default BlockList;
