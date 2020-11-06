import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { BlockInfoSearchLoader } from "components";
import { Link } from "react-router-dom";
import { blockListSearchLoader } from "../../actions/block";

const BlockSearchUserStyle = styled.div`
   margin-top: 50px;
  width: 100%;
  a {
    text-decoration: none;
  }
  .list_tit {
    border-bottom: solid orange 2px;
    color: black;
    font-weight: bold;
    padding-bottom: 3px;
  }
  .list_grid {
    display: grid;
    grid-template-columns: 20% 50% 10% 20%;
  }
  .acenter {
    text-align: center;
  }
  .list_data {
    width: 100%;
    line-height: 40px;
    border-bottom: solid gray 0.1px;
    color: black;
    font-size: 17px;
    transition: 0.1s ease-in-out;
    outline: none;
    cursor: pointer;
    :hover {
      color: orange;
    }
    .act__id {
      width: 20%;
      display: flex;
      justify-content: center;
    }
    .act__title {
    }
    .act__visit {
      margin-left: 13px;
    }
    .create__time {
      display: flex;
      justify-content: center;
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
       <div className="list_grid list_tit">
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
            <div className="list_grid list_data" key={key}>
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
