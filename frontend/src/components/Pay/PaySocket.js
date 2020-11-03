import React, { useEffect } from "react";
import socketIOClient from "socket.io-client";

const PaySocket = ({ pending, setPending, history, email }) => {
  useEffect(() => {
    const socket = socketIOClient("http://localhost:3333");
    console.log("socket is opened");
    socket.on(email, (res) => {
      console.log(res);
      if (res === "SUCCESS") history.push("/my");
      else if (res === "CANCELED") setPending("INIT");
    });
    return () => {
      socket.close();
      console.log("socket is closed");
    };
  }, [pending]);
  return null;
};

export default React.memo(PaySocket);
