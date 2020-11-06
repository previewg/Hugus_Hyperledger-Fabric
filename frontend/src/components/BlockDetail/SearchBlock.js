import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Loader } from "components";

const SearchBlockStyle = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 70px;
`;

const SearchBlock = ({ data }) => {
  if (!data) return <Loader />;
  return (
    <SearchBlockStyle>
      <div>
        <p className="block_height">BLOCK_HEIGHT:{data.block_height}</p>
        <p className="block_hash">BLOCK_HASH:{data.block_hash}</p>
        <p className="tx_count">TX.COUNT:{data.tx_count}</p>
        <p className="timestamp">TIMESTAMP:{data.timestamp}</p>
      </div>
    </SearchBlockStyle>
  );
};

export default SearchBlock;
