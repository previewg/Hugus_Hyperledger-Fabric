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

const BlockSearchBlock = ({match}) => {
  const init = useRef(true);
  //  match.params.id

  

  useEffect(() => {
    if (init.current) {
     (init.current = false);
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <BlockInfoBlockStyle>
      
      <BlockSearch />
      <BlockInfoBlock />
    </BlockInfoBlockStyle>
  );
};

export default BlockSearchBlock;