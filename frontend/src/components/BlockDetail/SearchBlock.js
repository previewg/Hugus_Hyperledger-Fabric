import React, { useEffect, useState } from "react";
import styled from "styled-components";

import axios from "axios";
import { BlockInfoSearchLoader } from "components";

const SearchBlockStyle = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 70px;    
    input {
      transition: all 1s ease-in-out;
      margin-right: 70px;
      width: ${(props) => (props.isClicked ? "600px" : "320px")};
      height: 40px;
      border-radius: 20px;
      border: solid 0.1px orange;
      outline: none;
      padding-left: 20px;
      font-size: 16px;
    }
    
    p{
      font-size: 20px;
        border-bottom: solid orange 1px;
        padding-bottom: 2px;

    }
  
`;



const SearchBlock = (blockSearch) => { 

// const list

//   useEffect(()=>{

//   })
  
  // if (!list) return <BlockInfoSearchLoader />
  return (<SearchBlockStyle>
  {/* //   <div className="layout">

  //     <div>
  //       <p className="block_height">BLOCK_HEIGHT:{list.block_height}</p>
  //       <p className="block_hash">BLOCK_HASH:{list.block_hash}</p>
  //       <p className="tx_count">TX.COUNT:{list.tx_count}</p>
  //       <p className="timestamp">TIMESTAMP:{list.timestamp}</p>
        
  //     </div>
          
  //     </div> */}
  </SearchBlockStyle>
  );
};

export default SearchBlock;
