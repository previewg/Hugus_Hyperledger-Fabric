import React from "react";
import styled from "styled-components";

const AdminActNavStyle = styled.article`
  display: flex;
  justify-content: center;
  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    p {
      text-align: center;
      width: 200px;
      color: white;
      font-size: 20px;
      cursor: pointer;
    }
    > div {
      transition: all 0.5s ease-in-out;
      background-color: white;
      height: 1px;
      width: 100%;
    }
  }
`;

const AdminActNav = () => {
  return (
    <AdminActNavStyle>
      <div>
        <p>구매 / 전달 인증</p>
        <div></div>
      </div>
    </AdminActNavStyle>
  );
};

export default AdminActNav;
