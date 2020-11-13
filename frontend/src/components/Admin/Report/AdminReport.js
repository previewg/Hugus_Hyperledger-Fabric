import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import AdminReportNav from "./AdminReportNav";
import AdminReportList from "./AdminReportList";
import AdminReportPagination from "./AdminReportPagination";
import AdminReportSearch from "./AdminReportSearch";

const AdminReportStyle = styled.article`
  width: 100%;
  height: 95vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 60px;
  transition: all 0.5s ease-in-out;
  padding-left: ${(props) => (props.open ? 250 : 0)}px;
`;

const AdminReport = ({ open, history }) => {
  const [type, setType] = useState("now");
  const [order, setOrder] = useState("date");
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [list, setList] = useState([]);
  const [search, setSearch] = useState("");
  const [clicked, setClicked] = useState(false);

  const nowPage = async (page) => {
    const result = await axios.get(
      `/admin/report/${page}?keyword=${search}&type=${type}&order=${order}`
    );
    if (result.data.success === 1) {
      setList(result.data.list);
      setTotal(result.data.count);
    }
    setClicked(false);
    setLoading(false);
  };

  const deleteHandler = async (report_id) => {
    setClicked(true);
    const confirmed = window.confirm("삭제하시겠습니까?");
    if (confirmed) {
      const result = await axios.post("/story/delete", { id: report_id });
      if (result.data.success === 1) {
        alert("삭제가 완료되었습니다");
        setClicked(false);
      } else alert("삭제에 실패하였습니다");
    }
  };

  return (
    <AdminReportStyle open={open} type={type}>
      <AdminReportNav setType={setType} type={type} />
      <AdminReportSearch setSearch={setSearch} setClicked={setClicked} />
      <AdminReportList
        list={list}
        loading={loading}
        history={history}
        deleteHandler={deleteHandler}
      />
      <AdminReportPagination
        nowPage={nowPage}
        pageLimit="10"
        total={total}
        clicked={clicked}
        loading={loading}
        type={type}
      />
    </AdminReportStyle>
  );
};

export default AdminReport;
