import React, { useState } from "react";
import styled from "styled-components";


const ReportInfoStyle = styled.section`
  display: grid;
  grid-template-columns: 1fr 2fr;
  align-items: center;
  .report__info__own {
    display: flex;
    flex-direction: column;
    p {
      margin-top: 0px;
      font-size: 23px;
      color: orange;
    }
    button {
      height: 50px;
      background-color: transparent;
      box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.15);
      outline: none;
      border: none;
      cursor: pointer;
      text-align: start;
      padding: 5px;
      margin-bottom: 10px;
      border-radius: 5px;
      :hover {
        border: solid 0.1px orange;
      }
    }
  }
  
`;

const ReportInfo = ({ reportList,history}) => {
  if ( !reportList)
  return <ReportInfoStyle>검색 결과가 없습니다</ReportInfoStyle>;
  
  return (
    <ReportInfoStyle>
      <div className="report__info__own">
        <p>신고 리스트</p>
        {reportList.map((report, key) => {
          return (
            <button 
              readOnly
            id={report.id}
            value={report.id}
            onClick={() => history.push(`/story/${report.id}`)}>
              스토리번호:{report.id} 신고내용:{report.case_detail}
            </button>
          );
        })}
      </div>
      
    </ReportInfoStyle>
  );
};
export default ReportInfo;
