import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import {
  
  BlockInfoBlock,
  BlockSearch,
  
} from "components";

const BlockInfoBlockStyle = styled.section`
  width: 100%;

  display: flex;
  flex-direction: column;
  padding-top: 50px;
  align-items: center;
`;

const BlockSearchBlock = (props) => {
  const init = useRef(true);
  

  

  useEffect(() => {
    if (init.current) {
     (init.current = false);
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <BlockInfoBlockStyle>
      
      <BlockSearch history={props.history} />
      <BlockInfoBlock />
    </BlockInfoBlockStyle>
  );
};

export default BlockSearchBlock;