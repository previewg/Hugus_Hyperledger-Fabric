import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const News = styled.section`
  display: flex;
  .section_intro {
    font-size: xx-large;
  }
  .section_middle {
    margin-top: 40px;
    border-style: solid;
    padding: 70px;
  }
`;
const MyNews = () => {
  const username = useSelector((state) => state.auth.user.nickname);
  return (
    <>
      <News>
        <div className="section_intro">
          {username}님께서 참여하신 캠페인 소식을 전해드립니다.
        </div>
        <div className="section_middle">참여 스토리 들어갈 예쩡</div>
      </News>
    </>
  );
};
export default MyNews;
