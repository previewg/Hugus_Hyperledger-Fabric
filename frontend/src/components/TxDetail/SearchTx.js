import { blockListSearchLoader } from "../../actions/block";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState, useRef } from "react";
import { BlockInfoSearchLoader } from "components";
import styled from "styled-components";
import axios from "axios";


const BlockSearchTxStyle = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;    
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



const BlockInfoTx = () => {
  const dispatch = useDispatch();
  const list = useSelector((state) => state.block.blockSearch.list);
  
  console.log(list);
 


  if (!list) return <BlockInfoSearchLoader />
  return (
    <BlockSearchTxStyle>
      <div >
        <div >      
            
              <div className="BlockInfoMain__body" key={list._id}>
                <p className="tx_id">
                  {/* <button onClick={copyTx}>복사</button> */}
                </p>
                <p className="block_height">BLOCK_HEIGHT:{list.block_height}</p>
                <p className="tx_id">TX.ID:{list.tx_id}</p>                
                <p className="tx_type">TX.TYPE:{list.tx_type}</p>
                <p className="sender_id">SENDER.ID:{list.sender_id}</p>
                <p className="receiver_id">RECEIVER.ID:{list.receiver_id}</p>
                <p className="value">VALUE:{list.value}</p>
                <p className="receipt">RECEIPT:{list.receipt}</p>
                <p className="age" >AGE:{list.timestamp}</p>

              </div>
            
          
        </div>



      </div>

    </BlockSearchTxStyle>
  );
};

export default BlockInfoTx;
