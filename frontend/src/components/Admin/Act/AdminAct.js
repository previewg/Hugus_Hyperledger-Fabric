import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import AdminActNav from "./AdminActNav";
import AdminActList from "./AdminActList";
import AdminActPagination from "./AdminActPagination";
import AdminActSearch from "./AdminActSearch";

const AdminActStyle = styled.article`
  width: 100%;
  height: 95vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 60px;
  transition: all 0.5s ease-in-out;
  padding-left: ${(props) => (props.open ? 250 : 0)}px;
`;

const AdminAct = ({ open }) => {
  const [order, setOrder] = useState("date");
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [list, setList] = useState([]);
  const [search, setSearch] = useState("");
  const [clicked, setClicked] = useState(false);

  const nowPage = async (page) => {
    const result = await axios.get(
      `/admin/act/${page}?keyword=${search}&order=${order}`
    );
    if (result.data.success === 1) {
      setList(result.data.list);
      setTotal(result.data.count);
    }
    setClicked(false);
    setLoading(false);
  };

  return (
    <AdminActStyle open={open}>
      <AdminActNav />
      <AdminActSearch setSearch={setSearch} setClicked={setClicked} />
      <AdminActList list={list} loading={loading} />
      <AdminActPagination
        nowPage={nowPage}
        pageLimit="10"
        total={total}
        clicked={clicked}
        loading={loading}
      />
    </AdminActStyle>
  );
};

export default AdminAct;
