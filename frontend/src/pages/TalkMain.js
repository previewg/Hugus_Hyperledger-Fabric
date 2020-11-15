import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { ClipLoader } from "react-spinners";
import { css } from "@emotion/core";
import { TalkList, TalkSearch, TalkPagination } from "components";
import { signInBtnIsClicked } from "actions/user";

const TalkStyle = styled.section`
  width: 100%;
  padding-top: 30px;
  display: flex;
  justify-content: center;
  min-height: 80vh;
  .layout {
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-top: 100px;
    width: 950px;
    .title {
      width: 100%;
      display: flex;
      justify-content: flex-start;
      > p {
        font-size: 30px;
        border-bottom: solid orange 2px;
        padding-bottom: 5px;
      }
    }
    .write {
      margin-right: 20px;
      margin-top: 20px;
      width: 100%;
      display: flex;
      justify-content: flex-end;
      .talkWrite__btn {
        font-size: 15px;
        font-weight: bold;
        cursor: pointer;
        :hover {
          color: orange;
        }
      }
    }
  }
`;

const LoaderStyle = styled.div`
  min-height: 464px;
  display: flex;
  align-items: center;
`;

const TalkMain = (props) => {
  const [total, setTotal] = useState(0);
  const [talkList, setTalkList] = useState([]);
  const [search, setSearch] = useState("");
  const [clicked, setClicked] = useState(false);
  const [loading, setLoading] = useState(true);

  const nowPage = async (page) => {
    const data = await axios.get(`/talk/list/${page}?keyword=${search}`);
    setTalkList(data.data.list);
    setTotal(data.data.count);
    setClicked(false);
    setLoading(false);
  };

  const Loader = () => {
    return (
      <LoaderStyle>
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
      </LoaderStyle>
    );
  };

  return (
    <TalkStyle>
      <div className="layout">
        <div className="title">
          <p>수혜자의 이야기</p>
        </div>

        <TalkSearch
          search={search}
          setSearch={setSearch}
          setClicked={setClicked}
        />
        {!loading ? <TalkList talkList={talkList} /> : <Loader />}
        <TalkPagination
          clicked={clicked}
          total={total}
          pageLimit="5"
          nowPage={nowPage}
        />
      </div>
    </TalkStyle>
  );
};

export default TalkMain;
