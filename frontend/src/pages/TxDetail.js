import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { SearchTx, BlockSearch, SearchBlock } from "components";

const TxDetailStyle = styled.section`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding-top: 50px;
  align-items: center;
`;

const TxDetail = ({ match, history }) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  const init = async () => {
    const initData = await axios.get(`/block/search/tx/${match.params.id}`);
    if (initData.data.success === 1) {
      setData(initData.data.data);
    }
    setLoading(false);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    init();
  }, []);

  return (
    <TxDetailStyle>
      <BlockSearch history={history} />
      <SearchTx data={data} loading={loading} />
    </TxDetailStyle>
  );
};

export default TxDetail;
