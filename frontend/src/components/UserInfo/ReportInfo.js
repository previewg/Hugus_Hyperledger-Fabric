import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const ReportInfoStyle = styled.section`
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

const ReportStyle = styled.div`
  display: flex;
  flex-direction: column;
  .report__body {
    cursor: pointer;
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
      width: 100%;
      padding-left: 10px;
      justify-self: start;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .done {
      color: dodgerblue;
    }
    .waiting {
      color: gray;
    }
    border-bottom: solid 0.1px lightgray;
    padding-bottom: 20px;
  }
  .report__detail {
    display: flex;
    flex-direction: column;
    padding: 10px;
    padding-left: 25px;
    padding-right: 25px;
    background-color: rgba(0, 0, 0, 0.05);
    .report__detail__head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      a {
        color: black;
        text-decoration: none;
        font-size: 13px;
      }
      p {
        white-space: pre-line;
        font-size: 15px;
        color: orange;
        font-weight: bold;
      }
    }

    .line {
      align-self: center;
      width: 100%;
      margin-top: 10px;
      margin-bottom: 10px;
      margin-left: 3px;
      margin-right: 3px;
      height: 1px;
      background-color: #c3c3c3;
    }
    .report__detail__reply {
      display: flex;
      align-items: center;

      img {
        width: 35px;
        height: 35px;
        border-radius: 20px;
      }
      p {
        margin-left: 20px;
        font-size: 15px;
      }
    }
    > p {
      white-space: pre-line;
      font-size: 15px;
      :nth-child(1) {
        color: orange;
        font-weight: bold;
      }
    }
  }
`;

const ReportInfo = ({ reportList, history }) => {
  const Report = ({ report }) => {
    const [clicked, setClicked] = useState(false);

    const onClickHandler = () => {
      if (clicked) setClicked(false);
      else setClicked(true);
    };
    return (
      <ReportStyle clicked={clicked}>
        <div className="report__body" id={report.id} onClick={onClickHandler}>
          <p>
            {report.case_detail.length > 19
              ? `${report.case_detail}...`
              : report.case_detail}
          </p>
          {report.Story_Report_Reply ? (
            <p className="done">답변완료</p>
          ) : (
            <p className="waiting">대기중</p>
          )}
          <p>{getTimeStamp(report.createdAt)}</p>
        </div>
        {clicked && report.Story_Report_Reply && (
          <div className="report__detail">
            <div className="report__detail__head">
              <p>신고 내용</p>
              <Link to={`/story/${report.story_id}`}>스토리보기</Link>
            </div>
            <p>{report.case_detail}</p>
            <p className="line"></p>
            <div className="report__detail__reply">
              <img src={"/icons/hugus_icon.png"} />
              <p>HUGUS - CS팀</p>
            </div>
            <p>{report.Story_Report_Reply.reply}</p>
          </div>
        )}
      </ReportStyle>
    );
  };

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
              <p>상태</p>
              <p>접수일자</p>
            </div>
            {reportList.map((report, key) => {
              return (
                <div key={key}>
                  <Report report={report} />
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
