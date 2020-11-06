import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { SearchBlock, BlockSearch } from "components";

const BlockDetailStyle = styled.section`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding-top: 50px;
  align-items: center;
`;

const BlockDetail = ({ match, history }) => {
  const [data, setData] = useState();

  const init = async () => {
    const initData = await axios.get(`/block/search/block/${match.params.id}`);
    if (initData.data.success === 1) {
      setData(initData.data.data);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    init();
  }, []);

  return (
    <BlockDetailStyle>
      <BlockSearch history={history} />
      <SearchBlock data={data} />
    </BlockDetailStyle>
  );
};

export default BlockDetail;
