import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import AdminCampaignNav from "./AdminCampaignNav";
import AdminCampaignList from "./AdminCampaignList";
import AdminCampaignPagination from "./AdminCampaignPagination";

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

const AdminCampaign = ({ open }) => {
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

  return (
    <AdminCampaignStyle open={open} type={type}>
      <AdminCampaignNav setType={setType} type={type} />
      {/*<AdminCampaignList />*/}
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
