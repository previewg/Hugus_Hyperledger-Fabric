import React, { useEffect } from "react";
import styled from "styled-components";

const BlockInfoUserHeadStyle = styled.article`
  width: 80%;
  min-width: 1000px;
  display: flex;
  flex-direction: column;
  .BlockUser_title {
    font-size: 40px;
    color: orange;
    font-weight: 900;
  }
  .BlockUser_head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .BlockUser_pagination {
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

const BlockInfoUserHead = ({ txHeight, setPage, page, more, load }) => {
  const pageInfo = () => {
    let lastPage = page * 20;
    if (page * 20 > txHeight) lastPage = txHeight;
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
    <BlockInfoUserHeadStyle more={more} page={page}>
      <p className="BlockUser_title">USER TRANSACTIONS</p>
      <div className="BlockUser_head">
        <p>
          <strong>{pageInfo()}</strong> of <strong>{txHeight}</strong>{" "}
          transactions
        </p>
        <div className="BlockUser_pagination">
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
    </BlockInfoUserHeadStyle>
  );
};

export default BlockInfoUserHead;
