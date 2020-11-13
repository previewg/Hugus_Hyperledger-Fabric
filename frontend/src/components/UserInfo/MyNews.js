import React, { useState } from "react";
import styled from "styled-components";
import { CanvasJSChart } from "canvasjs-react-charts";

const MyNewsStyle = styled.section`
  display: grid;
  grid-template-columns: 1fr 2fr;
  align-items: center;
  .my__news__own {
    width: 500px;
    min-width: 500px;
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
  .my__news__other {
    display: flex;
    flex-direction: column;
  }
  .my__news__chart {
    position: fixed;
    top: 250px;
    left: 1160px;
  }
  .my__news__detail {
    position: fixed;
    display: flex;
    flex-direction: column;
    top: 295px;
    left: 1185px;
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

const MyNews = ({ storyList }) => {
  const [data, setData] = useState(storyList[0] || null);
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
          {
            name: "현재 득표수",
            y: data ? data.story_vote : 0,
            color: "orange",
          },
          {
            name: "목표 득표수",
            y: data ? data.story_goal : 0,
            color: "antiquewhite",
          },
        ],
      },
    ],
  };
  const onClickHandler = (type, key) => {
    if (type === "own") setData(storyList[key]);
  };
  return (
    <MyNewsStyle>
      <div className="my__news__own">
        <p>나의 스토리</p>
        {storyList ? (
          storyList.map((story, key) => {
            return (
              <button key={key} onClick={() => onClickHandler("own", key)}>
                {story.story_title}
              </button>
            );
          })
        ) : (
          <p>작성한 글이 없습니다</p>
        )}
      </div>
      <div className="my__news__other"></div>
      <div className="my__news__chart">
        <CanvasJSChart options={options} />
      </div>
      {data && (
        <div className="my__news__detail">
          <div
            style={{
              backgroundImage: `url(${
                data.Story_Files[0].file || "http://localhost:3000/HUGUS.png"
              })`,
            }}
          >
            <div>
              {" "}
              <strong>{data.story_vote / data.story_goal.toFixed(1)}%</strong>
              <p>
                {data.story_vote}/{data.story_goal}
              </p>
            </div>
          </div>
          <p>{data.story_title}</p>
        </div>
      )}
      <div className="watermark__del"></div>
    </MyNewsStyle>
  );
};
export default MyNews;
