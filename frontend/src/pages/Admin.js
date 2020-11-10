import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Summary, SideBar } from "components";

const AdminStyle = styled.section`
  width: 100%;
  padding-top: 60px;
`;

const Admin = (props) => {
  const [type, setType] = useState("summary");

  useEffect(() => {}, []);

  return (
    <AdminStyle>
      <SideBar setType={setType} type={type} />
      {type === "summary" && <Summary />}
    </AdminStyle>
  );
};

export default Admin;
