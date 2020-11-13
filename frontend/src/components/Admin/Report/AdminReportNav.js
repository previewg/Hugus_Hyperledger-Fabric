import React from "react";
import styled from "styled-components";

const AdminReportNavStyle = styled.article`
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

const AdminReportNav = ({ type, setType }) => {
  return (
    <AdminReportNavStyle type={type}>
      <div>
        <p onClick={() => setType("now")}>답변 대기중</p>
        <div></div>
      </div>
      <div>
        <p onClick={() => setType("done")}>답변 완료</p>
        <div></div>
      </div>
    </AdminReportNavStyle>
  );
};

export default AdminReportNav;
