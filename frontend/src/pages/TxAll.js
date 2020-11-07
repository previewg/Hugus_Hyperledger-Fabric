import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { BlockSearch, TxAllHead, TxAllMain } from "components";
import axios from "axios";

const TxAllStyle = styled.section`
  padding-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TxAll = ({ history }) => {
  const init = useRef(true);
  const [txList, setTxList] = useState([]);
  const [txHeight, setTxHeight] = useState(0);
  const [page, setPage] = useState(1);
  const [more, setMore] = useState(false);
  const [loading, setLoading] = useState(false);

  const load = async (page) => {
    setLoading(true);
    const list = await axios.get(`/block/list/${page}?type=tx`);
    if (list.data.success === 1) {
      setTxList(list.data.list);
      setTxHeight(list.data.height);
      setMore(list.data.more);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (init.current) {
      load(1);
      init.current = false;
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <TxAllStyle>
      <BlockSearch />
      <TxAllHead
        setPage={setPage}
        txHeight={txHeight}
        page={page}
        more={more}
        load={load}
      />

      <TxAllMain txList={txList} history={history} loading={loading} />
    </TxAllStyle>
  );
};

export default TxAll;
