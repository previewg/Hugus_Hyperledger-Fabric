import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import {  
  BlockInfoSearchLoader,
  SearchTx,
  BlockSearch,  
} from "components";

const TxDetailStyle = styled.section`
  width: 100%;

  display: flex;
  flex-direction: column;
  padding-top: 50px;
  align-items: center;
`;

const TxDetail = (props) => {
  const init = useRef(true);
  



  useEffect(() => {
    if (init.current) {
      (init.current = false);
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <TxDetailStyle>      
      <BlockSearch history={props.history} />
      <BlockInfoSearchLoader />
      <SearchTx />
    </TxDetailStyle>
  );
};

export default TxDetail;