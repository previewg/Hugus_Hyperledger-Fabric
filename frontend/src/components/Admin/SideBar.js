import React, { useEffect, useState } from "react";
import styled from "styled-components";

const SideBarStyle = styled.article`
  width: 250px;
  height: 95vh;
  border-right: lightgray 0.1px solid;
  display: grid;
  grid-template-rows: 1fr 2fr;
  .side__top {
    background-color: rgba(0, 0, 0, 0.1);
    width: 100%;
    display: grid;
    grid-template-rows: 2fr 1fr;
    justify-content: center;
    > div {
      margin-top: 25px;
      width: 150px;
      height: 150px;
      border-radius: 75px;
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
    }
    > p {
      text-align: center;
      font-size: 23px;
    }
  }
  .side__bottom {
    align-self: center;
    width: 100%;
    height: 80%;
    display: grid;
    grid-template-rows: 1fr 1fr 1fr 1fr;
    > p {
      transition: color 0.3s ease-in-out;
      text-align: center;
      cursor: pointer;
      :nth-child(${(props) => {
            if (props.type === "summary") return 1;
            else if (props.type === "campaign") return 2;
            else if (props.type === "story") return 3;
            else return 4;
          }}) {
        color: orange;
      }
    }
  }
`;

const SideBar = ({ type, setType }) => {
  return (
    <SideBarStyle type={type}>
      <div className="side__top">
        <div style={{ backgroundImage: `url("/icons/hugus_icon.png")` }}></div>
        <p>ADMIN</p>
      </div>
      <div className="side__bottom">
        <p onClick={() => setType("summary")}>개요</p>
        <p onClick={() => setType("campaign")}>캠페인 관리</p>
        <p onClick={() => setType("story")}>스토리 관리</p>
        <p onClick={() => setType("user")}>회원 관리</p>
      </div>
    </SideBarStyle>
  );
};

export default SideBar;
