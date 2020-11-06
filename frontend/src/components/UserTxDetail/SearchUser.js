import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { BlockInfoSearchLoader } from "components";
import { Link } from "react-router-dom";
import { blockListSearchLoader } from "../../actions/block";

const BlockSearchUserStyle = styled.div`
   width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .TxList__header {
    display: grid;
    grid-template-columns:  1fr 3fr 1fr 1fr 1fr 1fr 3fr;
    border-top: solid 0.1px orange;
    border-bottom: solid 0.1px lightgray;
    font-size: 15px;
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
    grid-template-columns: 1fr 3fr 1fr 1fr 1fr 1fr 3fr;
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
    :hover {
      background-color: peachpuff;
    }
  }
`;



const BlockInfoUser = () => {

  const dispatch = useDispatch();
  const list = useSelector((state) => state.block.blockSearch.list);
  console.log(list);

  const visitHandler = (list) => {
    dispatch(blockListSearchLoader(list));
  };

  if (!list) return <BlockInfoSearchLoader />
  return (
    <BlockSearchUserStyle >
       <div className="TxList__header">
        <div> block_height/ sender_id </div>
        <div> block_height/ sender_id </div>
        <div> block_height/ sender_id </div>
        <div> block_height/ sender_id </div>
        <div> tx_id/value </div>
        <div>  tx_type </div>
        <div className="acenter"> receiver_id/time </div>
      </div>

      <div >
      {list.map((block, key) => {
        return (
          // <Link
          //   to={`/block/${act.id}`}
          //   onClick={() => visitHandler(block.tx_id)}
          //   key={key}
          // >
            <div className="TxList__body" key={key}>
              <div className="block_height">{block.block_height}</div>
              <div className="tx_id">{block.tx_id}</div>
              <div className="tx_type">{block.tx_type}</div>
              <div className="sender_id">{block.sender_id}</div>
              <div className="receiver_id">{block.receiver_id}</div>
              <div className="value">{block.value}</div>
              <div className="receipt">{block.receipt}</div>
              <div className="timestamp">{block.timestamp}</div>
            </div>
          // </Link>
        );
      })}
      </div>

    </BlockSearchUserStyle>
  );
};

export default BlockInfoUser;
