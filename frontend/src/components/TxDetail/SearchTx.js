import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { Loader } from "components";

const SearchTxStyle = styled.div`
   width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 70px;
`;

const SearchTx = ({ data }) => {
  if (!data) return <Loader />;
  return (
    <SearchTxStyle>
      <div>
        <div className="BlockInfoMain__body" key={data._id}>
          <p className="block_height">BLOCK_HEIGHT:{data.block_height}</p>
          <p className="tx_id">TX.ID:{data.tx_id}</p>
          <p className="tx_type">TX.TYPE:{data.tx_type}</p>
          <p className="sender_id">SENDER.ID:{data.sender_id}</p>
          <p className="receiver_id">RECEIVER.ID:{data.receiver_id}</p>
          <p className="value">VALUE:{data.value}</p>
          <p className="receipt">RECEIPT:{data.receipt}</p>
          <p className="age">AGE:{data.timestamp}</p>
        </div>
      </div>
    </SearchTxStyle>
  );
};

export default SearchTx;
