import React, { useState } from "react";
import styled from "styled-components";

const ReportInfoStyle = styled.section`
  display: flex;
  display: flex;
  flex-direction: column;
  > p {
    width: 700px;
    min-width: 700px;
    margin-top: 0px;
    font-size: 23px;
    color: orange;
  }
  .report__list {
    display: flex;
    > p {
      margin-top: 50px;
      color: gray;
    }
    .report {
      margin-top: 50px;

      width: 700px;
      min-width: 700px;
      display: flex;
      flex-direction: column;
      .report__head {
        height: 30px;
        display: grid;
        grid-template-columns: 5fr 1fr 2fr;
        p:nth-child(2) {
          justify-self: center;
        }
        p:nth-child(3) {
          justify-self: center;
        }
        border-bottom: solid 0.1px lightgray;
        padding-bottom: 20px;
      }
      .report__body {
        height: 30px;
        display: grid;
        grid-template-columns: 5fr 1fr 2fr;
        p:nth-child(2) {
          justify-self: center;
        }
        p:nth-child(3) {
          justify-self: center;
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

const ReportInfo = ({ reportList, history }) => {
  console.log(reportList);
  return (
    <ReportInfoStyle>
      <p>신고 내역</p>
      <div className="report__list">
        {reportList.length === 0 ? (
          <p>신고 내역이 없습니다</p>
        ) : (
          <div className="report">
            <div className="report__head">
              <p>신고내용</p>
              <p>스토리</p>
              <p>접수일자</p>
            </div>
            {reportList.map((report, key) => {
              return (
                <div className="report__body" key={key} id={report.id}>
                  <p>{report.case_detail}</p>
                  <p>{report.story_id}</p>
                  <p>{getTimeStamp(report.createdAt)}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </ReportInfoStyle>
  );
};
export default ReportInfo;
