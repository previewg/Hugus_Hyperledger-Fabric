import React, { useCallback, useState } from "react";
import styled from "styled-components";

const MyHomeStyle = styled.section`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin-left: 100px;
  .my__home__header {
    display: flex;
    width: 700px;
    justify-content: space-around;
    border: orange solid 0.1px;
    .header__left {
      margin: 10px;
      width: 50%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      > div {
        display: flex;
        justify-content: space-around;
        align-items: center;
        > p {
          color: gray;
          font-size: 20px;
        }
        > strong {
          color: orange;
          font-size: 25px;
          font-weight: normal;
        }
      }
    }
    .header__right {
      margin: 10px;
      padding: 10px;
      border-left: solid #e6e6e6 0.2px;
      width: 50%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      > p {
        color: gray;
        font-size: 20px;
      }
      > strong {
        color: orange;
        font-size: 25px;
        font-weight: normal;
      }
    }
  }
  .my__home__body {
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    width: 700px;
    .head__date {
      display: grid;
      grid-template-columns: 5fr 1fr 5fr;
      font-size: 14px;
      p {
        padding-left: 20px;
        padding-right: 20px;
        color: gray;
        :nth-child(1) {
          position: relative;
          bottom: 8px;
          border-bottom: lightgray 0.1px solid;
        }
        :nth-child(3) {
          position: relative;
          bottom: 8px;
          border-bottom: lightgray 0.1px solid;
        }
      }
    }
    .user__history {
      margin-bottom: 20px;
      display: grid;
      grid-template-columns: 1fr 8fr 3fr;
      align-items: center;
      width: 100%;
      img {
        width: 40px;
      }
      p {
        margin: 2px;
      }
      > p {
        justify-self: end;
      }
      > div {
        display: flex;
        flex-direction: column;
        p {
          color: gray;
          font-size: 13px;
          :nth-child(2) {
            color: black;
            font-size: 15px;
          }
        }
      }
    }
    .no__history {
      width: 100%;
      height: 30vh;
      color: gray;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .historyLoad {
      background-color: transparent;
      border: none;
      height: 30px;
      cursor: pointer;
      color: gray;
      outline: none;
    }
  }
`;

const MyHome = ({
  totalValue,
  storyList,
  userHistory,
  historyMore,
  historyLoad,
}) => {
  const getFormatDate = useCallback((date) => {
    let FormatDate = new Date(date);
    let year = FormatDate.getFullYear();
    let month = 1 + FormatDate.getMonth();
    month = month >= 10 ? month : "0" + month;
    let day = FormatDate.getDate();
    day = day >= 10 ? day : "0" + day;
    return `${year}.${month}.${day}`;
  }, []);

  const getHeadDate = useCallback((date) => {
    let FormatDate = new Date(date);
    let year = FormatDate.getFullYear();
    let month = 1 + FormatDate.getMonth();
    month = month >= 10 ? month : "0" + month;
    return `${year}.${month}`;
  }, []);

  return (
    <MyHomeStyle>
      <article className="my__home__header">
        <div className="header__left">
          <div>
            <p>기부 건수</p>
            <strong>{userHistory.length}건</strong>
          </div>
          <div>
            <p>내가 쓴 글</p>
            <strong>{storyList.length}건</strong>
          </div>
        </div>
        <div className="header__right">
          <p>총 후원금액</p>
          <strong>{totalValue.toLocaleString()}원</strong>
        </div>
      </article>
      <article className="my__home__body">
        {userHistory.length !== 0 ? (
          userHistory.map((donation, key) => {
            if (
              key === 0 ||
              getHeadDate(userHistory[key - 1].timestamp) !==
                getHeadDate(donation.timestamp)
            ) {
              return (
                <div key={key}>
                  <div className="head__date">
                    <p></p>
                    <p>{getHeadDate(donation.timestamp)}</p>
                    <p></p>
                  </div>
                  <div className="user__history">
                    <img src="/icons/approval.png" />
                    <div>
                      <p>{getFormatDate(donation.timestamp)}</p>
                      <p>허그 기부</p>
                      <p>{donation.receiver_id}</p>
                    </div>
                    <p>{donation.value.toLocaleString()}원</p>
                  </div>
                </div>
              );
            } else {
              return (
                <div className="user__history" key={key}>
                  <img src="/icons/approval.png" />
                  <div>
                    <p>{getFormatDate(donation.timestamp)}</p>
                    <p>허그 기부</p>
                    <p>{donation.receiver_id}</p>
                  </div>
                  <p>{donation.value.toLocaleString()}원</p>
                </div>
              );
            }
          })
        ) : (
          <div className="no__history">기부 내역이 없습니다</div>
        )}
        {historyMore && (
          <button className="historyLoad" onClick={historyLoad}>
            기부 이력 더보기
          </button>
        )}
      </article>
    </MyHomeStyle>
  );
};

export default MyHome;
