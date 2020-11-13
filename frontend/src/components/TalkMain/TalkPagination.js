import React, { useEffect, useState } from "react";
import styled from "styled-components";

const PaginationStyle = styled.div`
  margin-top: 30px;
  margin-bottom: 50px;
  width: 35%;
  div {
    display: flex;
    justify-content: space-around;
    margin-top: 12px;
    text-align: center;

    > button {
      background-color: transparent;
      outline: none;
      font-weight: bold;
      height: 30px;
      width: 30px;
      border: none;
      border-radius: 50%;
      transition: 0.1s ease-in-out;
      cursor: pointer;
      justify-content: center;
      align-items: center;
      display: flex;
      transition: all 0.3s ease-in-out;
      :hover {
        background-color: lightgray;
      }
    }
  }
`;

const createArr = (n) => {
  const iArr = new Array(n);
  for (let i = 0; i < n; i++) iArr[i] = i + 1;
  return iArr;
};

const Pagination = ({ total, pageLimit, nowPage, clicked }) => {
  const [blockNum, setBlockNum] = useState(0);
  const [currPage, setCurrPage] = useState(1);

  const v = Number(blockNum * pageLimit);
  const iArr = createArr(Number(total));
  const pArr = iArr.slice(v, Number(pageLimit) + v);

  const firstPage = () => {
    setBlockNum(0);
    setCurrPage(1);
  };

  const lastPage = () => {
    setBlockNum(Math.ceil(total / pageLimit) - 1);
    setCurrPage(total);
  };

  const prePage = () => {
    if (currPage <= 1) return;
    if (currPage - 1 <= pageLimit * blockNum) {
      setBlockNum((n) => n - 1);
    }
    setCurrPage((n) => n - 1);
  };

  const nextPage = () => {
    if (currPage >= total) return;
    if (pageLimit * Number(blockNum + 1) < Number(currPage + 1)) {
      setBlockNum((n) => n + 1);
    }
    setCurrPage((n) => n + 1);
  };

  useEffect(() => {
    nowPage(currPage);
  }, [currPage, clicked]);

  return (
    <PaginationStyle>
      <div>
        <button onClick={firstPage}>&lt;&lt;</button>
        <button onClick={prePage}>&lt;</button>
        {pArr.map((n, key) =>
          currPage === n ? (
            <button
              key={key}
              onClick={() => setCurrPage(n)}
              style={{
                backgroundColor: "orange",
                color: "white",
                transform: "scale(1.2)",
              }}
            >
              {n}
            </button>
          ) : (
            <button key={key} onClick={() => setCurrPage(n)}>
              {n}
            </button>
          )
        )}
        <button onClick={nextPage}>&gt;</button>
        <button onClick={lastPage}>&gt;&gt;</button>
      </div>
      <div className="current_show"></div>
    </PaginationStyle>
  );
};

export default Pagination;
