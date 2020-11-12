import React from "react";
import { HashLoader } from "react-spinners";
import { css } from "@emotion/core";
import styled from "styled-components";

const LoaderStyle = styled.section`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 25px;
  position: fixed;
  top: 0;
`;

const Loader = () => {
  return (
    <LoaderStyle>
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
      <p>로딩중입니다...</p>
    </LoaderStyle>
  );
};

export default Loader;
