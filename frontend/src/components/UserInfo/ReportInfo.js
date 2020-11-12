import React, { useState } from "react";
import styled from "styled-components";
import { CanvasJSChart } from "canvasjs-react-charts";

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
  .report__info__other {
    display: flex;
    flex-direction: column;
  }
  .report__info__chart {
    position: fixed;
    top: 250px;
    left: 1200px;
  }
  .report__info__detail {
    position: fixed;
    display: flex;
    flex-direction: column;
    top: 295px;
    left: 1225px;
    z-index: 2;
    align-items: center;
    > div {
      width: 310px;
      height: 310px;
      border-radius: 155px;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      > div {
        background-color: rgba(0, 0, 0, 0.1);
        width: 310px;
        height: 310px;
        border-radius: 155px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        > strong {
          color: white;
          font-size: 25px;
        }
        > p {
          color: white;
          font-size: 16px;
        }
      }
    }
    > p {
      margin-top: 30px;
    }
  }
  .watermark__del {
    width: 500px;
    height: 15px;
    position: fixed;
    top: 635px;
    left: 1000px;
    z-index: 1;
    background-color: white;
  }
`;

const ReportInfo = ({ reportList}) => {
  const [data, setData] = useState(reportList[0]);
  console.log(reportList);
  const options = {
    interactivityEnabled: false,
    animationEnabled: true,
    width: 360,
    data: [
      {
        startAngle: -90,
        innerRadius: "95%",
        type: "doughnut",
        dataPoints: [
          { name: "현재 득표수", y: data.story_vote, color: "orange" },
          { name: "목표 득표수", y: data.story_goal, color: "antiquewhite" },
        ],
      },
    ],
  };
  const onClickHandler = (type, key) => {
    if (type === "own") setData(reportList[key]);
  };
  return (
    <ReportInfoStyle>
      <div className="report__info__own">
        <p>신고 리스트</p>
        {reportList.map((report, key) => {
          return (
            <button key={key} onClick={() => onClickHandler("own", key)}>
              {report.case_detail}
            </button>
          );
        })}
      </div>
      <div className="report__info__other"></div>
      <div className="report__info__chart">
        <CanvasJSChart options={options} />
      </div>
      
      <div className="watermark__del"></div>
    </ReportInfoStyle>
  );
};
export default ReportInfo;
