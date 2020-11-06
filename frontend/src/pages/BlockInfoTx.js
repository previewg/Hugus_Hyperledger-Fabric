import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import {  
  BlockInfoTx,
  BlockSearch,  
} from "components";

const BlockInfoTxStyle = styled.section`
  width: 100%;

  display: flex;
  flex-direction: column;
  padding-top: 50px;
  align-items: center;
`;

const BlockSearchTx = (props) => {
  const init = useRef(true);
  



  useEffect(() => {
    if (init.current) {
      (init.current = false);
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <BlockInfoTxStyle>      
      <BlockSearch history={props.history} />
      <BlockInfoTx />
    </BlockInfoTxStyle>
  );
};

export default BlockSearchTx;