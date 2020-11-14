import React from "react";
import styled from "styled-components";

const AdminCampaignListStyle = styled.article`
  width: 60%;
  height: 470px;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 10px;
  padding: 20px;
  margin-top: 10px;
  .campaign__head {
    display: grid;
    grid-template-columns: 1fr 5fr 1fr 2fr 1fr 2fr 2fr;
    border-bottom: solid 0.1px white;
    margin-bottom: 10px;
    p {
      text-align: center;
      font-size: 18px;
      color: white;
      :nth-child(2) {
        text-align: start;
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      :nth-child(3) {
        font-weight: bold;
      }
    }
  }
  .campaign__body {
    display: grid;
    grid-template-columns: 1fr 5fr 1fr 2fr 1fr 2fr 2fr;
    align-items: center;
    p {
      justify-self: center;
      margin: 10px;
      font-size: 16px;
      color: white;
      :nth-child(2) {
        justify-self: start;
      }
      :nth-child(3) {
        font-weight: bold;
      }
    }
    .campaign__title {
      cursor: pointer;
    }
    .campaign__control {
      display: grid;
      grid-template-columns: 1fr 1fr;
      align-items: center;
      > button {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: transparent;
        border: none;
        color: lightgray;
        cursor: pointer;
        width: 60px;
        height: 25px;
        border-radius: 5px;
        outline: none;
        :nth-child(1) {
          color: #1e90ff;
          :hover {
            background-color: rgba(30, 144, 255, 0.3);
          }
        }
        :nth-child(2) {
          color: #cd5c5c;
          :hover {
            background-color: rgba(205, 92, 92, 0.3);
          }
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

const AdminCampaignList = ({ list, loading, history, deleteHandler }) => {
  console.log(list);
  return (
    <AdminCampaignListStyle>
      <div className="campaign__head">
        <p>번호</p>
        <p>제목</p>
        <p>모금율</p>
        <p>작성자</p>
        <p>조회수</p>
        <p>작성일자</p>
        <p></p>
      </div>
      {!loading && list.length === 0 ? (
        <NoResult>검색 결과가 없습니다</NoResult>
      ) : (
        list.map((campaign, key) => {
          return (
            <div className="campaign__body" key={key}>
              <p className="campaign__id">{campaign.id}</p>
              <p
                className="campaign__title"
                onClick={() => history.push(`/campaign/${campaign.id}`)}
              >
                {campaign.campaign_title}
              </p>
              <p className="campaign__ratio">
                {campaign.campaign_value / campaign.campaign_goal > 100
                  ? 100
                  : (
                      (campaign.campaign_value / campaign.campaign_goal) *
                      100
                    ).toFixed(1)}
                &nbsp;%
              </p>
              <p className="nickname">{campaign.User.nickname}</p>
              <p className="campaign__visit">{campaign.visited}</p>
              <p className="created__at">{getTimeStamp(campaign.created_at)}</p>
              <div className="campaign__control">
                <button>수정</button>
                <button onClick={() => deleteHandler(campaign.id)}>삭제</button>
              </div>
            </div>
          );
        })
      )}
    </AdminCampaignListStyle>
  );
};
export default AdminCampaignList;
