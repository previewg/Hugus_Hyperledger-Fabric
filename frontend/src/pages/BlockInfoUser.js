import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import {
  
  BlockInfoUser,
  BlockSearch,
  
} from "components";

const BlockInfoUserStyle = styled.section`
  width: 100%;

  display: flex;
  flex-direction: column;
  padding-top: 50px;
  align-items: center;
`;

const BlockInfoTx = (props) => {
  const init = useRef(true);
  

  

  useEffect(() => {
    if (init.current) {
      (init.current = false);
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <BlockInfoUserStyle>
      
      <BlockSearch history={props.history} />
      <BlockInfoUser />
    </BlockInfoUserStyle>
  );
};

export default BlockInfoTx;