import React from "react";
import styled from "styled-components";
import { Loader } from "components";

const SearchBlockStyle = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 100px;
  article {
    width: 50%;
    height: 400px;
    padding: 50px;
    min-width: 1000px;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.3);
    .block__detail__header {
      display: flex;
      align-items: flex-end;
      border-bottom: solid 0.1px lightgray;
      padding-bottom: 20px;
      strong {
        font-size: 40px;
        color: orange;
        font-weight: 900;
      }
      p {
        font-size: 20px;
        color: orange;
        margin: 5px;
        margin-left: 10px;
      }
    }
    .block__detail__body {
      display: flex;
      flex-direction: column;
      margin-top: 20px;
      > div {
        display: grid;
        grid-template-columns: 2fr 9fr;
      }
      .body_title {
        font-weight: bold;
        font-size: 20px;
      }
    }
  }
`;

const NoData = styled.p`
  height: 65vh;
  display: flex;
  align-items: center;
  color: gray;
  font-size: 17px;
`;

const getTimeStamp = (date) => {
  let givenDate = new Date(date);
  let newDate =
    leadingZeros(givenDate.getFullYear(), 4) +
    "-" +
    leadingZeros(givenDate.getMonth() + 1, 2) +
    "-" +
    leadingZeros(givenDate.getDate(), 2) +
    " " +
    leadingZeros(givenDate.getHours(), 2) +
    ":" +
    leadingZeros(givenDate.getMinutes(), 2) +
    ":" +
    leadingZeros(givenDate.getSeconds(), 2);
  return newDate;
};

const leadingZeros = (n, digits) => {
  let zero = "";
  n = n.toString();

  if (n.length < digits) {
    for (let i = 0; i < digits - n.length; i++) zero += "0";
  }
  return zero + n;
};

const SearchBlock = ({ data, loading }) => {
  if (loading) return <Loader />;
  if (!data) return <NoData>검색 결과가 없습니다.</NoData>;
  return (
    <SearchBlockStyle>
      <article>
        <div className="block__detail__header">
          <strong>BLOCK</strong>
          <p>#{data.block_height}</p>
        </div>
        <div className="block__detail__body">
          <p className="body_title">Block info</p>
          <div className="block_height">
            <p>BLOCK HEIGHT</p>
            <p>{data.block_height}</p>
          </div>
          <div className="block_hash">
            <p>BLOCK HASH</p>
            <p>{data.block_hash}</p>
          </div>
          <div className="tx_count">
            <p>TRANSACTIONS</p>
            <p>
              <strong>{data.tx_count} Transactions</strong> in this block
            </p>
          </div>
          <div className="timestamp">
            <p>TIMESTAMP</p>
            <p>{getTimeStamp(data.timestamp)}</p>
          </div>
        </div>
      </article>
    </SearchBlockStyle>
  );
};

export default SearchBlock;
