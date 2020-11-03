import React, { useState } from "react";
import styled from "styled-components";
import BlockList from "./BlockList";
import TransactionList from "./TransactionList";

const BlockInfoMainStyle = styled.article`
  margin-top: 50px;
  width: 83%;
  display: flex;
  justify-content: space-between;
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

const BlockInfoMain = ({ txList, blockList, history }) => {
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
      <BlockList blockList={blockList} history={history} />
      <TransactionList txList={txList} history={history} />
    </BlockInfoMainStyle>
  );
};

export default BlockInfoMain;
