import React from "react";
import { SyncLoader } from "react-spinners";
import { css } from "@emotion/core";

const Loader = () => {
  return (
    <SyncLoader
      css={css`
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      `}
      size={10}
      color={"#f69a53"}
      loading={true}
    />
  );
};

export default Loader;
