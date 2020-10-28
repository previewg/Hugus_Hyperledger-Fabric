import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import socketIOClient from "socket.io-client";
import axios from "axios";
import { BlockInfoHead, BlockInfoMain, BlockSearch } from "components";

const BlockInfoStyle = styled.section`
  width: 100%;
  height: 120vh;
  display: flex;
  flex-direction: column;
  padding-top: 50px;
`;

const BlockInfo = () => {
  const init = useRef(true);
  const [list, setList] = useState([]);
  const [data, setData] = useState({
    block_total: 0,
  });

  const Socket = () => {
    useEffect(() => {
      const socket = socketIOClient("http://localhost:2002");
      console.log("socket is opened");
      socket.on("hugus", (res) => {
        list.unshift(JSON.parse(res));
        setList(list.slice(0, 10));
      });
      return () => {
        socket.close();
        console.log("socket is closed");
      };
    }, []);
    return null;
  };

  const initLoad = async () => {
    const initData = await axios.get("/block/init");
    setList(initData.data.list);
  };

  useEffect(() => {
    if (init.current) {
      initLoad().then(() => (init.current = false));
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <BlockInfoStyle>
      <Socket />
      <BlockSearch />
      <BlockInfoHead />
      <BlockInfoMain list={list} />
    </BlockInfoStyle>
  );
};

export default BlockInfo;
