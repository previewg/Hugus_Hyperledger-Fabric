import React from "react";
import { ClipLoader } from "react-spinners";
import { css } from "@emotion/core";
import styled from "styled-components";

const LoaderStyle = styled.section`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.2);
`;

const Loader = () => {
  return (
    <LoaderStyle>
      <ClipLoader
        css={css`
          display: flex;
          justify-content: center;
          align-items: center;
        `}
        size={60}
        color={"#f69a53"}
        loading={true}
      />
    </LoaderStyle>
  );
};

export default Loader;
