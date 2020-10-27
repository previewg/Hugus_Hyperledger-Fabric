import React from "react";
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
      display: grid;
      grid-template-columns: 1fr 4fr 1fr 1fr 2fr 2fr;
      > p {
        justify-self: center;
      }
    }
  }
`;

const BlockInfoMain = ({ list }) => {
  return (
    <BlockInfoMainStyle>
      <div>
        <div className="BlockInfoMain__title">
          <p>Blocks & Transactions</p>
          <p>View All</p>
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
              <p className="tx_id">{block.tx_id.slice(0, 40)}...</p>
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
