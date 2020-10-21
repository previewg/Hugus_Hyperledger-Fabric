import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { ClipLoader } from "react-spinners";
import { css } from "@emotion/core";
import { ActList, Search, Pagination } from "components";

const ActStyle = styled.section`
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
    }
    /* .pagination {
        width:310px;
        display:flex;
        justify-content:space-around;
            >p {
                cursor: pointer;
                display:flex;
                justify-content:center;
                width:25px;
                padding-top:4px;
                border:none;
                background-color: rgba(0, 0, 0, 0.1);
                border-radius: 50%;
            }
            .page-item {
                >p {
                cursor: pointer;
                display:flex;
                justify-content:center;
                width:25px;
                padding-top:4px;
                border:none;
                background-color: rgba(0, 0, 0, 0.1);
                border-radius: 50%;
            }
            }
        } */
    .actWrite_Btn {
      font-size: 1px;
      cursor: pointer;
    }
  }
`;

const ActMain = () => {
  const [total, setTotal] = useState(0);
  const [actList, setActList] = useState([]);
  const [search, setSearch] = useState("");
  const [clicked, setClicked] = useState(false);

  const nowPage = async (page) => {
    const data = await axios.get(`/act/list/${page}?keyword=${search}`);
    setActList(data.data.list);
    setTotal(data.data.count);
    setClicked(false);
  };

//   const onClickHandler = () => {
//     props.history.push("/act/write");
//   };

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

  return (
    <ActStyle>
      <div className="layout">
        <div className="title">
          <p>전달 스토리</p>
        </div>
        <Search search={search} setSearch={setSearch} setClicked={setClicked}/>
        {actList.length !== 0 ? <ActList actList={actList} /> : <Loader />}
        <Pagination clicked={clicked} total={total} pageLimit="5" nowPage={nowPage} />
  
      </div>
    </ActStyle>
  );
};

export default ActMain;
