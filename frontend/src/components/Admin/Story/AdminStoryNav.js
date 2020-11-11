import React from "react";
import styled from "styled-components";

const AdminStoryNavStyle = styled.article`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 800px;
  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    p {
      color: white;
      font-size: 20px;
      cursor: pointer;
    }
    > div {
      transition: all 0.5s ease-in-out;
      background-color: white;
      height: 1px;
      width: 0%;
    }
    :nth-child(${(props) => {
          if (props.type === "now") return 1;
          else return 2;
        }}) {
      > div {
        width: 50%;
      }
    }
  }
`;

const AdminStoryNav = ({ type, setType }) => {
  return (
    <AdminStoryNavStyle type={type}>
      <div>
        <p onClick={() => setType("now")}>투표 진행 중</p>
        <div></div>
      </div>
      <div>
        <p onClick={() => setType("done")}>투표 종료</p>
        <div></div>
      </div>
    </AdminStoryNavStyle>
  );
};

export default AdminStoryNav;
