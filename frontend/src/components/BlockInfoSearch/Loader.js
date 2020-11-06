import React from "react";
import { HashLoader } from "react-spinners";
import { css } from "@emotion/core";
import styled from "styled-components";

const LoaderStyle = styled.section`
  width: 100%;
  height: 60vh;
  display: flex;
  justify-content: center;
  align-items: center;
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
    </LoaderStyle>
  );
};

export default Loader;
