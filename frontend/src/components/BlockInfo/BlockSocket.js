import React, { useEffect } from "react";
import socketIOClient from "socket.io-client";

const BlockSocket = ({ txList, setTxList, blockList, setBlockList }) => {
  useEffect(() => {
    const socket = socketIOClient("http://localhost:2002");
    console.log("socket is opened");
    socket.on("hugus_tx", (res) => {
      txList.unshift(JSON.parse(res));
      setTxList(txList.slice(0, 10));
    });
    socket.on("hugus_block", (res) => {
      blockList.unshift(JSON.parse(res));
      setBlockList(blockList.slice(0, 10));
    });
    return () => {
      socket.close();
      console.log("socket is closed");
    };
  }, [txList, blockList]);
  return null;
};

export default React.memo(BlockSocket);
