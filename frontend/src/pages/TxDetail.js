import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import {  SearchTx, BlockSearch } from "components";

const TxDetailStyle = styled.section`
  width: 100%;

  display: flex;
  flex-direction: column;
  padding-top: 50px;
  align-items: center;
`;

const TxDetail = ({ match, history }) => {
  const [data, setData] = useState();

  const init = async () => {
    const initData = await axios.get(`/block/search/tx/${match.params.id}`);
    if (initData.data.success === 1) {
      setData(initData.data.data);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    init();
  }, []);

  return (
    <TxDetailStyle>
      <BlockSearch history={history} />
      <SearchTx data ={data}/>
    </TxDetailStyle>
  );
};

export default TxDetail;
