import React from "react";
import styled from "styled-components";

const MyNewsStyle = styled.section`
  display: flex;
  flex-direction: column;
  .my__news__own {
    display: flex;
    flex-direction: column;
  }
  .my__news__other {
    display: flex;
    flex-direction: column;
  }
`;

const MyNews = () => {
  return (
    <MyNewsStyle>
      <div className="my__news__own">
        <p>나의 스토리</p>
      </div>
      <div className="my__news__other"></div>
    </MyNewsStyle>
  );
};
export default MyNews;
