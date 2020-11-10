import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { SearchUserHead, SearchUser, BlockSearch } from "components";

const UserDetailStyle = styled.section`
  padding-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const UserDetail = ({ match, history }) => {
  const [data, setData] = useState();
  const [userList, setUserList] = useState([]);
  const [txHeight, setTxHeight] = useState(0);
  const [page, setPage] = useState(1);
  const [more, setMore] = useState(false);
  const [loading, setLoading] = useState(false);

  const init = async (page) => {
    const initData = await axios.get(
      `/block/search/user/${match.params.id}/${page}`
    );
    if (initData.data.success === 1) {
      setData(initData.data.data);
      setUserList(initData.data.list);
      setTxHeight(initData.data.height);
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
      <SearchUserHead
        setPage={setPage}
        txHeight={txHeight}
        page={page}
        init={init}
        more={more}
      />
      <SearchUser
        data={data}
        list={userList}
        history={history}
        loading={loading}
      />
    </UserDetailStyle>
  );
};

export default UserDetail;
