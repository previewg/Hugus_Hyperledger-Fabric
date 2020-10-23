import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import styled from "styled-components";
import socketIOClient from "socket.io-client";
import {blockListLoader} from "../actions/block";
import Flow from "./flow";


const BlockInfoStyle = styled.section`
    width:100%;
    padding-top:70px;
    display:flex;
    justify-content:center;
    .layout {
    display:flex;
    align-items:center;
    flex-direction:column;
    margin-top: 100px;
    width:85%;
        .title {
        width:100%;
            >span {
            font-size:30px;
            border-bottom:solid orange 3px;
            padding : 5px 5px 15px 5px;
            
            }
        }
       .underline{
     
      width: 100%;
      height: 2px;
      background-color: lightgrey;
      transition: all .5s ease-in-out;
      }
        .block__title{
        
          display:grid;
          width: 100%;
          font-size: 20px;
          grid-template-columns: 1.25fr 1fr 1fr 1fr 1fr 1.1fr ;
          margin-bottom: 20px;
          justify-items: center;
        }
        .block__list{
          margin-top: 20px;
          display:grid;
          justify-items: center;

          width: 100%;
          grid-template-columns: 1.25fr 1fr 1fr 1fr 1fr 1.1fr ;
          .hover_tx{
          display: none;
          }
          :hover{
          .tx__{
          display: none;
          }
          .hover_tx{
              display: flex; 
              background: white;         
          }
          }
        }
        
        
    }
`;

const BlockInfo = (props) => {
    const dispatch = useDispatch();
    const blockList = useSelector(
        (state) => state.block.blockList.list
    )
    const blockStatus = useSelector(
        (state) => state.block.blockList.status
    )
    const [data, setData] = useState([])



    const Socket = () => {

        useEffect(() => {
            const socket = socketIOClient("http://192.168.0.145:2002");
            socket.on("hugus", (res) => {
                let newData = data.concat(JSON.parse(res))
                setData(newData)
                dispatch(blockListLoader())
            });
            return () => socket.close();
        }, [])
        return null;
    }

useEffect(()=>{
    dispatch(blockListLoader())
},[])

    return (
        <BlockInfoStyle>
            <Socket/>
            <div className="title">
                <span>BLOCKINFO</span>
            </div>
            <div className="layout">
                <div className='block__title'>
                    <div> TX_ID</div>
                    <div> TYPE</div>
                    <div> SENDER</div>
                    <div> RECEIVER</div>
                    <div> AMOUNT</div>
                    <div> TIME</div>
                </div>
                <div className="underline" ></div>
                {blockList.map((block, key) => {
                    return (
                        <div className='block__list' key={key}>

                            <div className="tx__">{(block.tx_id).slice(0, 15)}.....</div>
                            <div className="hover_tx">{block.tx_id} </div>
                            <div className="tx__type">{block.tx_type}</div>
                            <div className="act__visit">{block.sender_id}</div>
                            <div className='receiver_id'>{block.receiver_id}</div>
                            <div className='amount'>{block.amount}</div>
                            <Flow block_time={block.timestamp}/>
                        </div>
                    )
                })}
            </div>
        </BlockInfoStyle>

    );
};

export default BlockInfo;