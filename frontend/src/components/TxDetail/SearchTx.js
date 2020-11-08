import React from "react";
import styled from "styled-components";
import { Loader } from "components";

const SearchTxStyle = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 70px;
  article {
    width: 50%;
    padding: 50px;
    min-width: 1000px;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.3);
    .tx__detail__header {
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
    .tx__detail__body {
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
      p {
        margin: 13px;
      }
    }
  }
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

const NoData = styled.p`
  height: 65vh;
  display: flex;
  align-items: center;
  color: gray;
  font-size: 17px;
`;

const leadingZeros = (n, digits) => {
  let zero = "";
  n = n.toString();

  if (n.length < digits) {
    for (let i = 0; i < digits - n.length; i++) zero += "0";
  }
  return zero + n;
};

const SearchTx = ({ data, loading }) => {
  if (loading) return <Loader />;
  if (!data) return <NoData>검색 결과가 없습니다.</NoData>;
  return (
    <SearchTxStyle>
      <article>
        <div className="tx__detail__header">
          <strong>TRANSACTION</strong>
        </div>
        <div className="tx__detail__body">
          <p className="body_title">Tx info</p>
          <div className="block_height">
            <p>BLOCK HEIGHT</p>
            <p>{data.block_height}</p>
          </div>
          <div className="tx_id">
            <p>TX ID</p>
            <p>{data.tx_id}</p>
          </div>
          <div className="tx_type">
            <p>TX TYPE</p>
            <p>{data.tx_type}</p>
          </div>
          <div className="sender_id">
            <p>SENDER</p>
            <p>{data.sender_id}</p>
          </div>
          <div className="receiver_id">
            <p>RECEIVER</p>
            <p>{data.receiver_id}</p>
          </div>
          <div className="value">
            <p>VALUE</p>
            <p>{data.value}</p>
          </div>
          {data.tx_type === "donate" && (
            <div className="receipt">
              <p>RECEIPT</p>
              <p>{data.receipt}</p>
            </div>
          )}
          <div className="timestamp">
            <p>TIMESTAMP</p>
            <p>{getTimeStamp(data.timestamp)}</p>
          </div>
        </div>
      </article>
    </SearchTxStyle>
  );
};

export default SearchTx;
