import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { SearchUserHead, SearchUser, BlockSearch } from "components";

const UserDetailStyle = styled.section`
  padding-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 50px;
  min-height: 70vh;
`;

const UserDetail = ({ match, history }) => {
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [more, setMore] = useState(false);
  const [loading, setLoading] = useState(true);

  const init = async (page) => {
    const initData = await axios.get(
      `/block/search/user/${match.params.id}/${page}`
    );
    if (initData.data.success === 1) {
      setList(initData.data.list);
      setMore(initData.data.more);
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    init(1);
  }, [match]);

  return (
    <UserDetailStyle>
      <BlockSearch history={history} />
      <SearchUserHead setPage={setPage} page={page} init={init} more={more} />
      <SearchUser list={list} history={history} loading={loading} />
    </UserDetailStyle>
  );
};

export default UserDetail;
