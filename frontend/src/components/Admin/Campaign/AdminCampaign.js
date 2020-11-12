import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import AdminCampaignNav from "./AdminCampaignNav";
import AdminCampaignList from "./AdminCampaignList";
import AdminCampaignPagination from "./AdminCampaignPagination";
import AdminCampaignSearch from "./AdminCampaignSearch";
import { commentDelete } from "../../../actions/comment";

const AdminCampaignStyle = styled.article`
  width: 100%;
  height: 95vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 60px;
  transition: all 0.5s ease-in-out;
  padding-left: ${(props) => (props.open ? 250 : 0)}px;
`;

const AdminCampaign = ({ open, history }) => {
  const [type, setType] = useState("now");
  const [order, setOrder] = useState("date");
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [list, setList] = useState([]);
  const [search, setSearch] = useState("");
  const [clicked, setClicked] = useState(false);

  const nowPage = async (page) => {
    const result = await axios.get(
      `/admin/campaign/${page}?keyword=${search}&type=${type}&order=${order}`
    );
    if (result.data.success === 1) {
      setList(result.data.list);
      setTotal(result.data.count);
    }
    setClicked(false);
    setLoading(false);
  };

  const deleteHandler = async (campaign_id) => {
    setClicked(true);
    const confirmed = window.confirm("삭제하시겠습니까?");
    if (confirmed) {
      const result = await axios.post("/campaign/delete", { id: campaign_id });
      if (result.data.success) alert("삭제가 완료되었습니다");
      else alert("삭제에 실패하였습니다");
    }
    setClicked(false);
  };

  return (
    <AdminCampaignStyle open={open} type={type}>
      <AdminCampaignNav setType={setType} type={type} />
      <AdminCampaignSearch setSearch={setSearch} setClicked={setClicked} />
      <AdminCampaignList
        list={list}
        loading={loading}
        history={history}
        deleteHandler={deleteHandler}
      />
      <AdminCampaignPagination
        nowPage={nowPage}
        pageLimit="10"
        total={total}
        clicked={clicked}
        loading={loading}
        type={type}
      />
    </AdminCampaignStyle>
  );
};

export default AdminCampaign;
