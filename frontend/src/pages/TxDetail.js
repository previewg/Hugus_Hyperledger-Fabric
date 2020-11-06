import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { BlockInfoSearchLoader, SearchTx, BlockSearch } from "components";

const TxDetailStyle = styled.section`
  width: 100%;

  display: flex;
  flex-direction: column;
  padding-top: 50px;
  align-items: center;
`;

const TxDetail = ({ history, match }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <TxDetailStyle>
      <BlockSearch history={history} />
      <SearchTx />
    </TxDetailStyle>
  );
};

export default TxDetail;
