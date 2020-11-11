import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import {
  BlockInfoHead,
  BlockInfoMain,
  BlockSearch,
  BlockSocket,
  UserInfoLoader,
} from "components";

const BlockInfoStyle = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 50px;
  align-items: center;
  min-height: 85vh;
  margin-bottom: 100px;
`;

const BlockInfo = (props) => {
  const init = useRef(true);
  const [txList, setTxList] = useState([]);
  const [blockList, setBlockList] = useState([]);
  const [txHeight, setTxHeight] = useState(0);
  const [blockHeight, setBlockHeight] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(true);

  const initLoad = useCallback(async () => {
    const initData = await axios.get("/block/init");
    setTxList(initData.data.txList);
    setBlockList(initData.data.blockList);
    setTxHeight(initData.data.txHeight);
    setBlockHeight(initData.data.blockHeight);
    setTotalAmount(initData.data.totalAmount);
    setLoading(false);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (init.current) {
      initLoad();
      init.current = false;
    }
  }, []);

  return (
    <BlockInfoStyle>
      <BlockSocket
        txList={txList}
        setTxList={setTxList}
        blockList={blockList}
        setBlockList={setBlockList}
      />
      <BlockSearch history={props.history} />
      <BlockInfoHead
        txHeight={txHeight}
        blockHeight={blockHeight}
        totalAmount={totalAmount}
      />
      <BlockInfoMain
        txList={txList}
        blockList={blockList}
        history={props.history}
      />
      {loading && <UserInfoLoader />}
    </BlockInfoStyle>
  );
};

export default BlockInfo;
