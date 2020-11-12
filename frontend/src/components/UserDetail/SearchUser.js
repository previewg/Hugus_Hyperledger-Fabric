import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { TxAllLoader } from "components";
import Flow from "../BlockInfo/Flow";

const SearchUserStyle = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  .TxList__header {
    align-items: center;
    display: grid;
    grid-template-columns: 3fr 1fr 1fr 1fr;
    border-top: solid 0.1px orange;
    border-bottom: solid 0.1px lightgray;
    font-size: 15px;
    height: 50px;
    > p {
      justify-self: center;
    }
    .tx_id {
      justify-self: start;
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
    .Tx_id {
      justify-self: start;
      display: flex;
      align-items: center;
      input {
        outline: none;
        border: none;
        background: transparent;
        width: 520px;
        font-size: 15px;
      }
    }
    .sender_id {
      input {
        cursor: pointer;
        outline: none;
        border: none;
        background: transparent;
        width: 100px;
        font-size: 15px;
      }
    }
    .receiver_id {
      input {
        cursor: pointer;
        outline: none;
        border: none;
        background: transparent;
        width: 100px;
        font-size: 15px;
      }
    }
    :hover {
      background-color: peachpuff;
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

const SearchUser = ({ list, history, loading }) => {
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
    <SearchUserStyle>
      <div className="TxList__header">
        <p className="tx_id">TX HASH</p>
        <p className="age">AGE</p>
        <p className="sender_id">FROM</p>
        <p className="receiver_id">TO</p>
      </div>
      {loading ? (
        <TxAllLoader />
      ) : (
        list.map((block, key) => {
          return (
            <div className="TxList__body" key={key}>
              <p className="Tx_id">
                <input
                  readOnly
                  id={block.tx_id}
                  value={block.tx_id}
                  onClick={() => history.push(`/search/tx/${block.tx_id}`)}
                />
                <CopiedAlert id={block.tx_id} />
              </p>
              <Flow className="timestamp" block_time={block.timestamp} />
              <p className="sender_id">
                <input
                  readOnly
                  id={block.sender_id}
                  value={block.sender_id}
                  onClick={() =>
                    history.push(`/search/user/${block.sender_id}`)
                  }
                />
              </p>
              <p className="receiver_id">
                <input
                  readOnly
                  id={block.receiver_id}
                  value={block.receiver_id}
                  onClick={() =>
                    history.push(`/search/user/${block.receiver_id}`)
                  }
                />
              </p>
            </div>
          );
        })
      )}
    </SearchUserStyle>
  );
};

export default SearchUser;
