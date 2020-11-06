import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import {
  BlockInfoSearchLoader,
  SearchUserHead,
  SearchUser,
  BlockSearch,
  
} from "components";

const BlockInfoUserStyle = styled.section`
    padding-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BlockInfoUserList = (props,{match,history}) => {
  const init = useRef(true);
  const [List, setList] = useState([]);
  const [txHeight, setTxHeight] = useState(0);
  const [page, setPage] = useState(1);
  const [more, setMore] = useState(false);
  const [loading, setLoading] = useState(false);
  

  const load = async (page) => {
    setLoading(true);
    const list = await axios.get(`/block/search/user/${page}`);
    if (list.data.success === 1) {
      setList(list.data.list);
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
    <BlockInfoUserStyle>      
      <BlockSearch history={props.history} />
      <BlockInfoSearchLoader />
      <SearchUserHead
      setPage={setPage}
      txHeight={txHeight}
      page={page}
      more={more}
      load={load}
      />
      <SearchUser history = {history} />
    </BlockInfoUserStyle>
  );
};

export default BlockInfoUserList;