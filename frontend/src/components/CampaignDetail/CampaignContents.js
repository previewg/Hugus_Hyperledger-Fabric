import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import Donate from "./Donate";

const CampaignContentsStyle = styled.div`
  margin-top: 100px;
  width: 700px;
  display: flex;
  flex-direction: column;

  .title {
    margin-top: 50px;
    width: 100%;
    display: flex;
    flex-direction: column;
    border-bottom: solid orange 0.1px;
    p:nth-child(1) {
      font-weight: bold;
      font-size: 25px;
      position: relative;
      left: 30px;
    }
    p:nth-child(2) {
      text-align: right;
    }
  }

  .content {
    margin-top: 50px;
    > img {
      width: 700px;
    }
  }

  .hashtags {
    font-weight: bold;
    margin-top: 35px;
    .tag {
      padding: 8px;
      padding-left: 13px;
      padding-right: 13px;
      border-radius: 5px;
      margin-right: 10px;
      font-weight: normal;
      font-size: 13px;
      color: #ffa400;
      background-color: #fff7ef;
      transition: 0.3s ease-in-out;
      cursor: pointer;
      :hover {
        background-color: #ffc048;
        color: white;
      }
    }
  }

  .donate {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 50px;
    button {
      width: 150px;
      height: 40px;
      font-size: 15px;
      background-color: transparent;
      border: solid 0.1px dodgerblue;
      cursor: pointer;
      font-weight: bold;
      color: dodgerblue;
      transition: 0.3s ease-in-out;
      border-radius: 5px;
      outline: none;
      :hover {
        background-color: dodgerblue;
        color: white;
        transform: scale(1.2);
      }
    }
  }

  .visited {
    margin-top: 50px;
    display: flex;
    justify-content: flex-end;
    font-size: 13px;
    > p {
      margin: 0;
      margin-left: 10px;
    }
  }
`;

const CampaignContents = ({ data, history }) => {
  const email = useSelector((state) => state.auth.user.email);

  console.log(data);
  return (
    <CampaignContentsStyle>
      <div className="title">
        <p>{data.campaign_title}</p>
        <p>{data.User.nickname}님</p>
      </div>

      <div className="content">
        <img src={data.Campaign_Files[1].file} />
      </div>

      <div className="hashtags">
        <p>태그</p>
        {data.Hashtags.map((tag, key) => {
          return (
            <span className="tag" key={key}>
              #{tag.hashtag}
            </span>
          );
        })}
      </div>

      <Donate data={data} history={history} />
      <div className="visited">
        <p>좋아요 {data.campaign_like}</p>
        <p>조회수 {data.visited}</p>
      </div>
    </CampaignContentsStyle>
  );
};

export default CampaignContents;
