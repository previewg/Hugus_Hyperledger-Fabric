import React, { useState } from "react";
import styled from "styled-components";
import { CanvasJSChart } from "canvasjs-react-charts";

const MyNewsStyle = styled.section`
  display: grid;
  grid-template-columns: 1fr 2fr;
  align-items: center;
  article {
    display: flex;
    flex-direction: column;
    .my__news__own {
      min-height: 170px;
      width: 500px;
      min-width: 500px;
      display: flex;
      flex-direction: column;
      > p {
        margin-top: 0px;
        font-size: 23px;
        color: orange;
        :nth-child(2) {
          margin-top: 20px;
          color: gray;
          font-size: 16px;
        }
      }
      button {
        height: 50px;
        background-color: transparent;
        box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.15);
        font-size: 15px;
        outline: none;
        border: none;
        cursor: pointer;
        text-align: start;
        padding-left: 15px;
        margin-bottom: 15px;
        border-radius: 5px;
        :hover {
          border: solid 0.1px orange;
        }
      }
    }
    .my__news__other {
      min-height: 170px;
      margin-top: 70px;
      width: 500px;
      min-width: 500px;
      display: flex;
      flex-direction: column;
      > p {
        margin-top: 0px;
        font-size: 23px;
        color: orange;
        :nth-child(2) {
          margin-top: 20px;
          color: gray;
          font-size: 16px;
        }
      }
      > button {
        height: 50px;
        background-color: transparent;
        box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.15);
        outline: none;
        border: none;
        cursor: pointer;
        text-align: start;
        padding-left: 15px;
        margin-bottom: 10px;
        border-radius: 5px;
        font-size: 15px;
        :hover {
          border: solid 0.1px orange;
        }
      }
    }
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
      font-size: 17px;
      cursor: pointer;
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

const MyNews = ({ storyList, votedList, history }) => {
  const [data, setData] = useState(storyList[0] || votedList[0] || null);
  const [now, setNow] = useState({ type: "", idx: 0 });
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
    if (type === "own") {
      setData(storyList[key]);
      setNow({ type: "own", idx: key });
    } else if (type === "other") {
      setData(votedList[key]);
      setNow({ type: "other", idx: key });
    }
  };
  return (
    <MyNewsStyle now={now}>
      <article>
        <div className="my__news__own">
          <p>나의 스토리</p>
          {storyList.length !== 0 ? (
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
        <div className="my__news__other">
          <p>내가 투표한 스토리</p>
          {votedList.length !== 0 ? (
            votedList.map((voted, key) => {
              return (
                <button key={key} onClick={() => onClickHandler("other", key)}>
                  {voted.story_title}
                </button>
              );
            })
          ) : (
            <p>투표한 스토리가 없습니다</p>
          )}
        </div>
      </article>

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
              <strong>
                {((data.story_vote * 100) / data.story_goal).toFixed(0)}%
              </strong>
              <p>
                {data.story_vote}/{data.story_goal}
              </p>
            </div>
          </div>
          <p onClick={() => history.push(`/story/${data.id}`)}>
            {data.story_title}
          </p>
        </div>
      )}
      <div className="watermark__del"></div>
    </MyNewsStyle>
  );
};
export default MyNews;
