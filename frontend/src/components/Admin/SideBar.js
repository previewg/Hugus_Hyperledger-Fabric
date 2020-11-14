import React from "react";
import styled from "styled-components";
import axios from "axios";

const SideBarStyle = styled.article`
  position: absolute;
  top: 60px;
  transition: width 1s ease-in-out;
  width: 250px;
  min-width: 250px;
  display: grid;
  height: 95vh;
  grid-template-rows: 1fr 2fr;
  transform: translateX(${(props) => (props.open ? 0 : -100)}%);
  transition: all 0.5s ease-in-out;
  .side__top {
    background-color: gray;
    width: 100%;
    display: grid;
    grid-template-rows: 2fr 1fr;
    justify-content: center;
    > div {
      margin-top: 50px;
      width: 120px;
      height: 120px;
      border-radius: 60px;
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
    background-color: white;
    padding-top: 50px;
    width: 100%;
    padding-bottom: 100px;
    display: grid;
    grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr;
    > p {
      transition: color 0.3s ease-in-out;
      text-align: center;
      cursor: pointer;
      :nth-child(${(props) => {
            if (props.type === "summary") return 1;
            else if (props.type === "campaign") return 2;
            else if (props.type === "story") return 3;
            else if (props.type === "act") return 4;
            else if (props.type === "report") return 5;
            else if (props.type === "user") return 6;
            else return 7;
          }}) {
        color: orange;
      }
    }
  }
`;

const SideBar = ({ type, setType, open }) => {
  const urlLoader = async () => {
    const result = await axios.post("/admin/url");
    if (result.data.success === 1) {
      window.open(result.data.url);
    }
  };

  return (
    <SideBarStyle type={type} open={open}>
      <div className="side__top">
        <div style={{ backgroundImage: `url("/icons/hugus_icon.png")` }}></div>
        <p>ADMIN</p>
      </div>
      <div className="side__bottom">
        <p onClick={() => setType("summary")}>개요</p>
        <p onClick={() => setType("campaign")}>캠페인 관리</p>
        <p onClick={() => setType("story")}>스토리 관리</p>
        <p onClick={() => setType("act")}>인증 관리</p>
        <p onClick={() => setType("report")}>신고 관리</p>
        <p onClick={() => setType("user")}>회원 관리</p>
        <p onClick={urlLoader}>블록 정보</p>
      </div>
    </SideBarStyle>
  );
};

export default SideBar;
