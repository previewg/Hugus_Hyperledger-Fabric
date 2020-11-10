import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Summary, SideBar } from "components";

const AdminStyle = styled.section`
  width: 100%;
  padding-top: 60px;
  display: flex;
  .opener {
    position: absolute;
    top: 80px;
    left: ${(props) => (props.open ? 251 : 0)}px;
    background-color: orange;
    width: 40px;
    height: 30px;
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
  useEffect(() => {}, []);

  return (
    <AdminStyle open={open}>
      <div className="opener" onClick={openHandler}>
        열기
      </div>
      <SideBar setType={setType} type={type} open={open} />
      {type === "summary" && <Summary />}
    </AdminStyle>
  );
};

export default Admin;
