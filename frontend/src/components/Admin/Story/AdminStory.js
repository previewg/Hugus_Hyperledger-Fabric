import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import AdminStoryNav from "./AdminStoryNav";
import AdminStoryList from "./AdminStoryList";
import AdminStoryPagination from "./AdminStoryPagination";
import AdminStorySearch from "./AdminStorySearch";

const AdminStoryStyle = styled.article`
  width: 100%;
  height: 95vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 60px;
  transition: all 0.5s ease-in-out;
  padding-left: ${(props) => (props.open ? 250 : 0)}px;
`;

const AdminStory = ({ open, history }) => {
  const [type, setType] = useState("now");
  const [order, setOrder] = useState("date");
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [list, setList] = useState([]);
  const [search, setSearch] = useState("");
  const [clicked, setClicked] = useState(false);

  const nowPage = async (page) => {
    const result = await axios.get(
      `/admin/story/${page}?keyword=${search}&type=${type}&order=${order}`
    );
    if (result.data.success === 1) {
      setList(result.data.list);
      setTotal(result.data.count);
    }
    setClicked(false);
    setLoading(false);
  };

  const deleteHandler = async (story_id) => {
    setClicked(true);
    const confirmed = window.confirm("삭제하시겠습니까?");
    if (confirmed) {
      const result = await axios.post("/story/delete", { id: story_id });
      if (result.data.success) {
        alert("삭제가 완료되었습니다");
        setClicked(false);
      } else alert("삭제에 실패하였습니다");
    }
  };

  return (
    <AdminStoryStyle open={open} type={type}>
      <AdminStoryNav setType={setType} type={type} />
      <AdminStorySearch setSearch={setSearch} setClicked={setClicked} />
      <AdminStoryList
        list={list}
        loading={loading}
        history={history}
        deleteHandler={deleteHandler}
      />
      <AdminStoryPagination
        nowPage={nowPage}
        pageLimit="10"
        total={total}
        clicked={clicked}
        loading={loading}
        type={type}
      />
    </AdminStoryStyle>
  );
};

export default AdminStory;
