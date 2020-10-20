import React, { useState } from 'react';
import styled from "styled-components";

const Paginationstyle = styled.div`
  width: 40%;
    div {
    display: flex;
    justify-content: space-around;
    margin-top: 12px;
    text-align: center;

    >button {
      font-weight: bold;
      height: 32px;
      width: 35px;
      border: none;
      border-radius: 50%;
      transition: 0.1s ease-in-out;
      cursor: pointer;
      :hover {
        background-color: orange;
      }
    }

  }  
`;

const createArr = (n) => {
  const iArr = new Array(n);
  for(var i = 0; i < n; i ++) iArr[i] = i +1;
  return iArr;
};

const Pagination = ({ total, maxPage, pageLimit }) => {
  const [blockNum, setBlockNum] = useState(0);
  const [currPage, setCurrPage] = useState(1); 

  const v = Number (blockNum * pageLimit);
  const iArr = createArr(Number(maxPage));
  const pArr = iArr.slice(v, Number(pageLimit)+ v); 

  const firstPage = () => {
    setBlockNum(0);
    setCurrPage(1);
  };

  const lastPage = () => {
    setBlockNum( Math.ceil(maxPage/pageLimit) -1 );
    setCurrPage(maxPage);
  }

  const prePage = () => {
    if ( currPage <= 1 )
      return;
    if (( currPage - 1 ) <= pageLimit * blockNum) {
      setBlockNum( n => n - 1 );
    }
    setCurrPage( n => n - 1 );
    }
  const nextPage = () => {
    if( currPage >= maxPage )
    return;
    if(pageLimit * Number( blockNum + 1 ) < Number(currPage + 1)) {
      setBlockNum( n => n + 1 );
    }
    setCurrPage( n => n + 1 );
  };
  return (
    <Paginationstyle>
        <p>currPage : {currPage}</p>
        <p>blockNum : {blockNum}</p>
        <div>
        <button onClick={firstPage}>&lt;&lt;</button>
        <button onClick={prePage}>&lt;</button>
        {
          pArr.map(n => (
            <button>
              {n}
            </button>
          ))
        }
        <button onClick={nextPage}>&gt;</button>
        <button onClick={lastPage}>&gt;&gt;</button>
        </div>
    </Paginationstyle>
  );
}


export default Pagination;