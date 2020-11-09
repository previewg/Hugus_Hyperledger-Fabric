import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Loader } from "components";
const SearchUserStyle = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .TxList__header {    
    justify-content: space-between;
    align-items: center;
    display: grid;
    grid-template-columns: 50% 10% 10% 10% 20%;
    border-top: solid 0.1px orange;
    border-bottom: solid 0.1px lightgray;
    font-size: 20px;
    height:50px;    
      justify-self: center;
    > p {
    }
  }
  .TxList__body {
    transition: background-color 0.2s ease-in-out;
    display: grid;
    align-items: center;
    grid-template-columns: 50% 10% 10% 10% 20%;
    font-size: 20px;
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
        font-size: 20px;
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

const SearchUser = ({ list, history }) => {
  console.log(list)
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
  if (!list) return <Loader />;
  return (
    <SearchUserStyle>
      <div className="TxList__header">
        
        <div> TX_ID </div>
        <div> TX_TYPE </div>
        <div> SENDER_ID</div>
        <div> RECEIVER_ID </div>        
        <div> AGE</div>
      </div>

      <div>
        {list.map((block, key) => {
          return (
            <div className="TxList__body" key={key}>
             
              <p className="Tx_id">
                <input
                  readOnly
                  id={block.tx_id}
                  value={block.tx_id}
                  onClick={() =>
                    history.push(`/search/tx/${block.tx_id}`)
                  }
                />
                <CopiedAlert id={block.tx_id} />
              </p>
              <div className="tx_type">{block.tx_type}</div>
              <div className="sender_id">{block.sender_id}</div>
              <div className="receiver_id">{block.receiver_id}</div>              
              <div className="timestamp">{block.timestamp}</div>
            </div>
          );
        })}
      </div>
    </SearchUserStyle>
  );
};

export default SearchUser;
