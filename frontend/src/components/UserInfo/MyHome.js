import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import CountUp from "react-countup";

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
      height: 30px;
      p {
        padding-left: 20px;
        padding-right: 20px;
        color: gray;
        :nth-child(1) {
          position: relative;
          bottom: 10px;
          border-bottom: lightgray 0.1px solid;
        }
        :nth-child(3) {
          position: relative;
          bottom: 10px;
          border-bottom: lightgray 0.1px solid;
        }
      }
    }
    .user__history {
      margin-top: 20px;
      padding: 10px;
      display: grid;
      grid-template-columns: 1fr 8fr 3fr;
      align-items: center;
      cursor: pointer;

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

const UserHistoryStyle = styled.div`
  display: flex;
  flex-direction: column;
  .user__history {
    ${(props) =>
      props.clicked
        ? "border-top-right-radius: 10px;border-top-left-radius: 10px;background-color: rgba(0, 0, 0, 0.05)"
        : "border-radius: 10px"};
    :hover {
      box-shadow: ${(props) =>
        props.clicked ? "none" : "0px 0px 10px 0px rgba(0, 0, 0, 0.2);"};
    }
  }
  .user__history__detail {
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    display: grid;
    grid-template-columns: 1fr 9fr;
    padding: 10px;
    padding-left: 25px;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.05);
    > div:nth-child(1) {
      width: 70px;
      height: 70px;
      border-radius: 5px;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
    }
    > div:nth-child(2) {
      p {
        font-size: 15px;
        margin: 5px;
        padding-left: 10px;
      }
    }
  }
`;

const BarStyle = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  .count__info {
    width: 90%;
    background: transparent;
    margin: 0;
    color: gray;
    font-size: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;
    > div:nth-child(2) {
      color: orange;
      font-weight: bold;
      font-style: italic;
      > span:nth-child(1) {
        font-size: 20px;
      }
    }
  }
  .count__bar {
    width: 90%;
    display: flex;
    > div {
      transition: all 2s ease-in-out;
      height: 5px;
      background-color: orange;
      ${(props) => `width:${props.ratio}%`};
    }
  }
`;

const MyHome = ({
  totalValue,
  storyList,
  userHistory,
  historyMore,
  historyLoad,
  campaignList,
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

  const ProgressBar = ({ value, goal }) => {
    const [ratio, setRatio] = useState(0);

    useEffect(() => {
      const init = setTimeout(() => {
        if (value > goal) setRatio(100);
        setRatio((value / goal) * 100);
      });
      return () => clearTimeout(init);
    }, []);

    return (
      <BarStyle ratio={ratio}>
        <div className="count__info">
          <div>
            <CountUp
              formattingFn={(num) => num.toLocaleString()}
              end={value}
              duration={2}
            />
            <span> 원</span>
          </div>
          <div>
            <CountUp end={ratio} duration={2} />
            <span> %</span>
          </div>
        </div>
        <div className="count__bar">
          <div></div>
        </div>
      </BarStyle>
    );
  };

  const UserHistory = ({ donation }) => {
    const [clicked, setClicked] = useState(false);
    const [data, setData] = useState(null);
    const onClickHandler = () => {
      if (clicked) setClicked(false);
      else setClicked(true);
    };

    const finder = () => {
      for (const campaign of campaignList) {
        if (campaign.hash === donation.receiver_id) {
          setData(campaign);
        }
      }
    };

    useEffect(() => {
      finder();
    }, []);

    return (
      <UserHistoryStyle clicked={clicked}>
        <div className="user__history" onClick={onClickHandler}>
          <img src="/icons/approval.png" />
          <div>
            <p>{getFormatDate(donation.timestamp)}</p>
            <p>허그 기부</p>
            <p>{donation.receiver_id}</p>
          </div>
          <p>{donation.value.toLocaleString()}원</p>
        </div>
        {clicked && (
          <div className="user__history__detail">
            <div
              style={{
                backgroundImage: `url(${data.Campaign_Files[0].file})`,
              }}
            />
            <div>
              <p>{data.campaign_title}</p>
              <ProgressBar
                value={data.campaign_value}
                goal={data.campaign_goal}
              />
            </div>
          </div>
        )}
      </UserHistoryStyle>
    );
  };

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
                  <UserHistory donation={donation} />
                </div>
              );
            } else {
              return (
                // <div className="user__history" key={key}>
                //   <img src="/icons/approval.png" />
                //   <div>
                //     <p>{getFormatDate(donation.timestamp)}</p>
                //     <p>허그 기부</p>
                //     <p>{donation.receiver_id}</p>
                //   </div>
                //   <p>{donation.value.toLocaleString()}원</p>
                // </div>
                <div key={key}>
                  <UserHistory donation={donation} />
                </div>
              );
            }
          })
        ) : (
          <div className="no__history">기부 내역이 없습니다</div>
        )}
        {historyMore && (
          <button className="historyLoad" onClick={historyLoad}>
            후원 이력 더보기
          </button>
        )}
      </article>
    </MyHomeStyle>
  );
};

export default MyHome;
