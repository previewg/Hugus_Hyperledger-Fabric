import React from "react";
import styled from "styled-components";

const AdminCampaignNavStyle = styled.article`
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

const AdminCampaignNav = ({ type, setType }) => {
  return (
    <AdminCampaignNavStyle type={type}>
      <div>
        <p onClick={() => setType("now")}>모금 진행 중</p>
        <div></div>
      </div>
      <div>
        <p onClick={() => setType("done")}>모금 완료</p>
        <div></div>
      </div>
    </AdminCampaignNavStyle>
  );
};

export default AdminCampaignNav;
