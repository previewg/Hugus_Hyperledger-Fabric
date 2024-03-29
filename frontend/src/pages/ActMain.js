import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ClipLoader } from "react-spinners";
import { css } from "@emotion/core";
import { ActList, Search } from "components";

const ActStyle = styled.section`
  padding-top: 30px;
  display: flex;
  justify-content: center;
  margin-bottom: 70px;
  align-items: center;
  flex-direction: column;
  .layout {
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-top: 100px;
    width: 950px;
    .title {
      width: 100%;
      display: flex;
      justify-content: flex-start;
      > p {
        font-size: 30px;
        border-bottom: solid orange 2px;
        padding-bottom: 5px;
      }
    }
  }
`;

const LoaderStyle = styled.div`
  min-height: 100%;
  display: flex;
  align-items: center;
`;

const ActMain = () => {
  const [search, setSearch] = useState("");
  const [clicked, setClicked] = useState(false);
  const [loader, setLoader] = useState(true);

  const Loader = () => {
    return (
      <LoaderStyle>
        <ClipLoader
          css={css`
            margin-top: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
          `}
          size={50}
          color={"#f69a53"}
          loading={true}
        />
      </LoaderStyle>
    );
  };

  return (
    <ActStyle>
      <div className="layout">
        <div className="title">
          <p>전달 스토리</p>
        </div>
        <Search search={search} setSearch={setSearch} setClicked={setClicked} />
        {loader ? (
          <ActList
            search={search}
            setClicked={setClicked}
            setLoader={setLoader}
            clicked={clicked}
          />
        ) : (
          <Loader />
        )}
      </div>
    </ActStyle>
  );
};

export default ActMain;
