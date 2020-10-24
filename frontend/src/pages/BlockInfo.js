import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import styled from "styled-components";
import socketIOClient from "socket.io-client";
import {blockListLoader} from "../actions/block";
import Flow from "./flow";


const BlockInfoStyle = styled.section`
    width:100%;
    height: 100%;
    padding-top:70px;
    display:flex;
    flex-direction: column;
    background-color: #12253f ;
    .title {
        font-weight: bolder;
        margin-top : 50px;
        margin-right: 60px;
        height: 18%;
        align-self: flex-end;
            >span {
            color:#05b9c1;
            font-size:30px;
            border-bottom:solid orange 3px;
            padding : 5px 15px 5px;
            }
        }
    .layout {
    display:flex;
    align-items:center;
    flex-direction:column;
    margin-top: 100px;
    width:100%;
      .underline{
      width: 100%;
      height: 1px;
      margin-bottom: 10px;
      background-color: #05b9c1;
      transition: all .5s ease-in-out;
      }
        .block__title{
          display:grid;
          width: 100%;
          font-size: 32px;
          color: lightgray;
          grid-template-columns: 1.25fr 1fr 1fr 1fr 1fr 1.1fr ;
          margin-bottom: 20px;
          justify-items: center;
              .title__tx{
              color: #05b9c1;
              }
        }
        .block__list{
          border: none;
          color: lightgray;
          font-size: 16px;
          border-bottom: gray solid 0.1px;
          margin-top: 18px;
          display:grid;
          justify-items: center;
          height: 100%;
          width: 100%;
          grid-template-columns: 1.25fr 1fr 1fr 1fr 1fr 1.1fr ;
          .hover_tx{
          display: none;
          }
          .tx__{
          color: #05b9c1;
          }
          :hover{
          .tx__{
          display: none;
          }
          .hover_tx{
              display: flex; 
               color: #05b9c1;
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
                <span>HUGUS CHAIN</span>
            </div>
            <div className="layout">
                <div className='block__title'>
                    <div className={'title__tx'}> TX_ID</div>
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
                            <Flow className='timestamp' block_time={block.timestamp}/>
                        </div>
                    )
                })}
            </div>
        </BlockInfoStyle>
    );
};

export default BlockInfo;