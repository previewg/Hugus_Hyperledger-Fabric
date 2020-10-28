import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { ClipLoader } from "react-spinners";
import { css } from "@emotion/core";
import { TalkList, TalkSearch, TalkPagination } from "components";
import { signInBtnIsClicked } from "actions/user";

const ActTalkStyle = styled.section`
  width: 100%;
  padding-top: 30px;
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
    .talkWrite_Btn {
      font-size: 1px;
      cursor: pointer;
    }
  }
`;

const ActTalkMain = (props) => {
  const dispatch = useDispatch();
  const isLoggedIn = props.isLoggedIn;

  const [total, setTotal] = useState(0);
  const [talkList, setTalkList] = useState([]);
  const [search, setSearch] = useState("");
  const [clicked, setClicked] = useState(false);

  const nowPage = async (talk_id) => {
    const data = await axios.get(`/talk/list/${talk_id}?keyword=${search}`);
    setTalkList(data.data.list);
    setTotal(data.data.count);
    setClicked(false);
  };

  const onClickHandler = () => {
    if (isLoggedIn) props.history.push("/talk/write");
    else dispatch(signInBtnIsClicked());
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

  return (
    <ActTalkStyle>
      <div className="layout">
        <div className="title">
          <p>수혜자의 이야기</p>
        </div>
        <p className="talkWrite__btn" onClick={onClickHandler}>
        글작성 </p>
        <TalkSearch search={search} setSearch={setSearch} setClicked={setClicked}/>
        {talkList.length !== 0 ? <TalkList talkList={talkList} /> : <Loader />}
        <TalkPagination clicked={clicked} total={total} pageLimit="5" nowPage={nowPage}/>
      </div>
    </ActTalkStyle>
  );
};

export default ActTalkMain;