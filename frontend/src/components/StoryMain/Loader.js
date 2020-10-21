import React from "react";
import styled from "styled-components";
import { ClipLoader } from "react-spinners";
import { css } from "@emotion/core";

const LoaderStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 290px;
`;

const Loader = () => {
  return (
    <LoaderStyle>
      <ClipLoader size={50} color={"#f69a53"} loading={true} />
    </LoaderStyle>
  );
};

export default Loader;
