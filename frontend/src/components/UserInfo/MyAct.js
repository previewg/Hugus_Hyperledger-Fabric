import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const MyActStyle = styled.section`
  display: flex;
  flex-direction: column;
  margin-bottom: 100px;
  > p {
    width: 700px;
    min-width: 700px;
    margin-top: 0px;
    font-size: 23px;
    color: orange;
  }
  .act__list {
    display: flex;
    > p {
      margin-top: 50px;
      color: gray;
    }
    .act {
      margin-top: 50px;
      width: 700px;
      min-width: 700px;
      display: flex;
      flex-direction: column;
      .act__head {
        height: 30px;
        display: grid;
        grid-template-columns: 3fr 1fr 1fr;
        p {
          font-size: 17px;
          justify-self: center;
        }
        p:nth-child(1) {
          padding-left: 10px;
          justify-self: start;
        }
        border-bottom: solid 2px orange;
        padding-bottom: 20px;
      }
      .act__body {
        height: 30px;
        display: grid;
        grid-template-columns: 3fr 1fr 1fr;
        :hover {
          box-shadow: ${(props) =>
            props.clicked ? "none" : "0px 0px 10px 0px rgba(0, 0, 0, 0.2);"};
        }
        p {
          justify-self: center;
        }
        p:nth-child(1) {
          cursor: pointer;
          padding-left: 10px;
          justify-self: start;
        }
        .done {
          color: dodgerblue;
        }
        .waiting {
          color: gray;
        }
        border-bottom: solid 0.1px lightgray;
        padding-bottom: 20px;
        button {
          background-color: transparent;
          border: none;
          outline: none;
          cursor: pointer;
        }
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
    leadingZeros(givenDate.getDate(), 2);
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

const MyAct = ({ actList, history }) => {
  console.log(actList);
  return (
    <MyActStyle>
      <p>수혜 내역</p>
      <div className="act__list">
        {actList.length === 0 ? (
          <p>수혜 내역이 없습니다</p>
        ) : (
          <div className="act">
            <div className="act__head">
              <p>캠페인</p>
              <p>접수일자</p>
              <p>후기</p>
            </div>
            {actList.map((act, key) => {
              return (
                <div className="act__body" key={key}>
                  <p onClick={() => history.push(`/act/${act.id}`)}>
                    {act.act_title}
                  </p>
                  <p>{getTimeStamp(act.created_at)}</p>
                  <button
                    onClick={() =>
                      history.push(`/talk/write/${act.campaign_id}`)
                    }
                  >
                    작성하기
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </MyActStyle>
  );
};
export default MyAct;
