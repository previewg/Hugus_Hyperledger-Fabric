import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import {
  BlockInfoSearchLoader,
  SearchBlock,
  BlockSearch,
  
} from "components";

const BlockDetailStyle = styled.section`
  width: 100%;

  display: flex;
  flex-direction: column;
  padding-top: 50px;
  align-items: center;
`;

const BlockDetail = (props,{match}) => {
  const init = useRef(true);
  //  match.params.id

  

  useEffect(() => {
    if (init.current) {
     (init.current = false);
      window.scrollTo(0, 0);

    }
  }, []);

  return (
    <BlockDetailStyle>
      
      <BlockSearch history={props.history} />
      <BlockInfoSearchLoader />
      <SearchBlock />
    </BlockDetailStyle>
  );
};

export default BlockDetail;