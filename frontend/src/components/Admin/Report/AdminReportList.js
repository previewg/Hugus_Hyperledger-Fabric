import React, { useState } from "react";
import styled from "styled-components";
import AdminReportWrite from "./AdminReportWrite";

const AdminReportListStyle = styled.article`
  width: 60%;
  height: 470px;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 10px;
  padding: 20px;
  margin-top: 10px;
  .report__head {
    display: grid;
    grid-template-columns: 1fr 6fr 1fr 2fr 2fr 1fr;
    border-bottom: solid 0.1px white;
    margin-bottom: 10px;
    p {
      text-align: center;
      font-size: 18px;
      color: white;
      :nth-child(2) {
        text-align: start;
        margin-left: 10px;
      }
    }
  }
  .report__body {
    display: grid;
    grid-template-columns: 1fr 6fr 1fr 2fr 2fr 1fr;
    align-items: center;
    p {
      justify-self: center;
      margin: 10px;
      font-size: 16px;
      color: white;
      :nth-child(2) {
        justify-self: start;
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    .story__id {
      cursor: pointer;
    }
    .report__control {
      display: grid;
      grid-template-columns: 1fr 1fr;
      align-items: center;
      > button {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: transparent;
        border: none;
        cursor: pointer;
        width: 60px;
        height: 25px;
        border-radius: 5px;
        outline: none;
      }
      .notyet {
        color: #1e90ff;
        :hover {
          background-color: rgba(30, 144, 255, 0.3);
        }
      }
      .done {
        color: #cd5c5c;
        :hover {
          background-color: rgba(205, 92, 92, 0.3);
        }
      }
    }
  }
`;

const NoResult = styled.p`
  height: 40vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  color: gray;
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

const AdminReportList = ({ type, list, loading, history, setClicked }) => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(null);

  const onClickHandler = (report) => {
    setData(report);
    setOpen(true);
  };

  return (
    <>
      {open && (
        <AdminReportWrite
          setOpen={setOpen}
          data={data}
          setClicked={setClicked}
          type={type}
        />
      )}
      <AdminReportListStyle>
        <div className="report__head">
          <p>번호</p>
          <p>내용</p>
          <p>스토리</p>
          <p>작성자</p>
          <p>작성일자</p>
          <p></p>
        </div>
        {!loading && list.length === 0 ? (
          <NoResult>검색 결과가 없습니다</NoResult>
        ) : (
          list.map((report, key) => {
            return (
              <div className="report__body" key={key}>
                <p className="report__id">{report.id}</p>
                <p className="report__detail">{report.case_detail}</p>
                <p
                  className="story__id"
                  onClick={() => history.push(`/story/${report.story_id}`)}
                >
                  {report.story_id}
                </p>
                <p className="nickname">{report.User.nickname}</p>
                <p className="created__at">{getTimeStamp(report.created_at)}</p>
                <div className="report__control">
                  {type === "now" ? (
                    <button
                      className="notyet"
                      onClick={() => onClickHandler(report)}
                    >
                      답변하기
                    </button>
                  ) : (
                    <button
                      className="done"
                      onClick={() => onClickHandler(report)}
                    >
                      답변보기
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </AdminReportListStyle>
    </>
  );
};
export default AdminReportList;
