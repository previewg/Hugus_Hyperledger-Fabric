import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { css } from "@emotion/core";
import { BlockSearch, BlockInfoList, Pagination } from "components";

const BlockInfoListStyle = styled.section`
    height: 120vh;
   flex-direction: column;
    width: 100%;
  padding-top: 70px;
  display: flex;
  justify-content: center;
  .layout {
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-top: 100px;
    width: 75%;
    .title {
      width: 100%;
      display: flex;
      justify-content: flex-start;
      > p {
        font-size: 30px;
        border-bottom: solid orange 3px;
        padding-bottom: 2px;
      }
    }}
`;

const BlockList = (props) => {
  const init = useRef(true);
  const [list, setList] = useState([]);
  const [data, setData] = useState({ block_total: 0});
  const [total, setTotal] = useState(0);  
  const [search, setSearch] = useState("");
  const [clicked, setClicked] = useState(false);

  const nowPage = async (page) => {
    const data = await axios.get(`/block/list/${page}?keyword=${search}`);    
    setList(data.data.list);
    setTotal(data.data.count);
    setClicked(false);
  };

  
  const Loader = () => {
    return (
      <ClipLoader
        css={css`
          margin-top: 10px;
          display: flex;
          justify-content: center;
          align-items: center;
        `}
        size={50}
        color={"#f69a53"}
        loading={true}
      />
    );
  };

  const initLoad = async () => {
    const initData = await axios.get("/block/list");
    setList(initData.data.list);
  };

  useEffect(() => {
    if (init.current) {
      initLoad().then(() => (init.current = false));
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <BlockInfoListStyle>
      <BlockSearch />
      <BlockInfoList list={list} history={props.history}/>
      <Pagination clicked={clicked} total={total} pageLimit="10" nowPage={nowPage}/>
    </BlockInfoListStyle>
  );
};

export default BlockList;
