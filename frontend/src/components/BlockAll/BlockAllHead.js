import React, { useCallback, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const BlockAllHeadStyle = styled.article`
  width: 80%;
  min-width: 1000px;
  display: flex;
  flex-direction: column;
  .blockAll_title {
    font-size: 40px;
    color: orange;
    font-weight: 900;
  }
  .blockAll_head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .blockAll_pagination {
      > button {
        transition: all 0.3s ease-in-out;
        outline: none;
        margin: 10px;
        background-color: transparent;
        cursor: pointer;
        width: 40px;
        height: 40px;
        border-radius: 20px;
        background-position: center center;
        background-repeat: no-repeat;
        background-size: 70%;
        border: solid 0.1px #a7a7a7;
        :nth-child(1) {
          border: solid 0.1px
            ${(props) => (props.page != 1 ? "orange" : "#a7a7a7")};
        }
        :nth-child(2) {
          border: solid 0.1px ${(props) => (props.more ? "orange" : "#a7a7a7")};
        }
      }
    }
  }
`;

const BlockAllHead = ({ blockHeight, setPage, page, more, load }) => {
  const pageInfo = () => {
    let lastPage = page * 20;
    if (page * 20 > blockHeight) lastPage = blockHeight;
    return `${(page - 1) * 20 + 1} - ${lastPage}`;
  };

  const prevHandler = () => {
    if (page !== 1) {
      load(page - 1);
      setPage((page) => page - 1);
    }
  };

  const nextHandler = () => {
    if (more) {
      load(page + 1);
      setPage((page) => page + 1);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <BlockAllHeadStyle more={more} page={page}>
      <p className="blockAll_title">BLOCKS</p>
      <div className="blockAll_head">
        <p>
          <strong>{pageInfo()}</strong> of <strong>{blockHeight}</strong> blocks
        </p>
        <div className="blockAll_pagination">
          <button
            style={{ backgroundImage: `url("/icons/Backicon.png") ` }}
            onClick={prevHandler}
          ></button>
          <button
            style={{ backgroundImage: `url("/icons/Nexticon.png") ` }}
            onClick={nextHandler}
          ></button>
        </div>
      </div>
    </BlockAllHeadStyle>
  );
};

export default BlockAllHead;
