import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  AdminSummary,
  AdminCampaign,
  AdminStory,
  AdminAct,
  AdminReport,
  SideBar,
} from "components";

const AdminStyle = styled.section`
  width: 100%;
  height: 95vh;
  padding-top: 60px;
  display: flex;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: bottom;
  .opener {
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    position: absolute;
    top: 145px;
    transition: all 0.5s ease-in-out;
    left: ${(props) => (props.open ? 250 : 0)}px;
    background-color: rgba(255, 255, 255, 0.2);
    background-image: url(${(props) =>
      props.open ? "/icons/Backicon-white.png" : "/icons/Nexticon-white.png"});
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    width: 30px;
    height: 40px;
    cursor: pointer;
  }
`;

const Admin = (props) => {
  const [type, setType] = useState("summary");
  const [open, setOpen] = useState(true);

  const openHandler = () => {
    if (open) setOpen(false);
    else setOpen(true);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <AdminStyle
      open={open}
      style={{ backgroundImage: 'url("/pics/admin.jpg")' }}
    >
      <div className="opener" onClick={openHandler}></div>
      <SideBar setType={setType} type={type} open={open} />
      {type === "summary" && <AdminSummary open={open} />}
      {type === "campaign" && (
        <AdminCampaign open={open} history={props.history} />
      )}
      {type === "story" && <AdminStory open={open} history={props.history} />}
      {type === "act" && <AdminAct open={open} history={props.history} />}
      {type === "report" && <AdminReport open={open} history={props.history} />}
    </AdminStyle>
  );
};

export default Admin;
