import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const TalkListStyle = styled.div`
  width: 100%;
  margin-top: 30px;
  .talk__list__head {
    border-bottom: solid orange 0.1px;
    color: black;
    font-weight: bold;
    padding-bottom: 3px;
    display: grid;
    grid-template-columns: 1fr 4fr 1fr 1fr 2fr;
    p {
      margin-top: 0px;
      margin-bottom: 5px;
      display: flex;
      justify-content: center;
      align-items: center;
      :nth-child(2) {
        display: flex;
        justify-content: start;
      }
    }
  }

  .talk__list__body {
    text-decoration: none;
    border-bottom: solid lightgray 0.1px;
    color: black;
    font-size: 15px;
    transition: 0.1s ease-in-out;
    display: grid;
    grid-template-columns: 1fr 4fr 1fr 1fr 2fr;
    outline: none;
    cursor: pointer;
    :hover {
      background-color: #fffaf4;
    }
    p {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .talk__title {
      display: flex;
      justify-content: start;
      .comment_count {
        padding-left: 5px;
        outline: none;
        font-size: 12px;
        color: #ff4646;
        font-weight: bold;
      }
    }
  }
`;

const ThereIsNoFavorite = styled.p`
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  color: gray;
`;

const TalkList = ({ talkList }) => {
  const visitHandler = async (id) => {
    await axios.put("/talk/visit", { talk_id: id });
  };

  if (talkList.length === 0)
    return <ThereIsNoFavorite>검색 결과가 없습니다</ThereIsNoFavorite>;

  return (
    <TalkListStyle>
      <div className="talk__list__head">
        <p> 번호 </p>
        <p> 제목 </p>
        <p> 작성자 </p>
        <p> 조회수 </p>
        <p> 작성일자 </p>
      </div>

      {talkList.map((talk, key) => {
        return (
          <Link
            to={`/talk/${talk.id}`}
            onClick={() => visitHandler(talk.id)}
            key={key}
            className="talk__list__body"
          >
            <p className="talk__id">{talk.id}</p>
            <p className="talk__title">
              {talk.talk_title}
              <span className="comment_count">[{talk.CCount}]</span>
            </p>
            <p className="nickname">{talk.User.nickname}</p>
            <p className="talk__visited">{talk.visited}</p>
            <p className="created__time">{talk.created_at}</p>
          </Link>
        );
      })}
    </TalkListStyle>
  );
};
export default TalkList;
