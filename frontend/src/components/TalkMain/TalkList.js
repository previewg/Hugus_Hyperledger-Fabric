import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const TalkListStyle = styled.div`
  width: 100%;
  margin-top: 30px;
  a {
    text-decoration: none;
  }
  .list_tit {
    border-bottom: solid orange 2px;
    color: black;
    font-weight: bold;
    padding-bottom: 3px;
  }
  .list_grid {
    display: grid;
    grid-template-columns: 10% 45% 15% 13% 17%;
  }
  .acenter {
    text-align: center;
  }
  .list_data {
    width: 100%;
    line-height: 40px;
    border-bottom: solid gray 0.1px;
    color: black;
    font-size: 15px;
    transition: 0.1s ease-in-out;
    outline: none;
    cursor: pointer;
    :hover {
      background-color: #faf1e5;
    }
    .talk__id {
      margin-left: 2px;
      width: 20%;
      display: flex;
      justify-content: center;
    }
    .talk__title {
      display: flex;
      .comment_count {
        outline: none;
        font-size: 12px;
        color: red;
        font-weight: bold;
      }
    }
    .talk__visit {
      margin-left: 13px;
    }
    .create__time {
      display: flex;
      justify-content: center;
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
      <div className="list_grid list_tit">
        <div> 번호 </div>
        <div> 제목 </div>
        <div className="writer"> 작성자 </div>
        <div> 조회수 </div>
        <div className="acenter"> 작성일자 </div>
      </div>

      {talkList.map((talk, key) => {
        return (
          <Link
            to={`/talk/${talk.id}`}
            onClick={() => visitHandler(talk.id)}
            key={key}
          >
            <div className="list_grid list_data" key={key}>
              <div className="talk__id">{talk.id}</div>

              <div className="talk__title">
                {talk.talk_title}
                &nbsp;&nbsp;
                <div className="comment_count">[{talk.CCount}]</div>
              </div>
              <div className="nickname">{talk.User.nickname}</div>
              <div className="talk__visit">{talk.visited}</div>
              <div className="create__time">{talk.created_at}</div>
            </div>
          </Link>
        );
      })}
    </TalkListStyle>
  );
};
export default TalkList;
