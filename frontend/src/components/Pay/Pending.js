import React from "react";
import { HashLoader } from "react-spinners";
import { css } from "@emotion/core";
import styled from "styled-components";

const PendingStyle = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 25px;
  position: fixed;
`;

const Pending = () => {
  return (
    <PendingStyle>
      <HashLoader
        css={css`
          display: flex;
          justify-content: center;
          align-items: center;
        `}
        size={60}
        color={"#f69a53"}
        loading={true}
      />
      <p>결제가 진행중입니다...</p>
    </PendingStyle>
  );
};

export default Pending;
