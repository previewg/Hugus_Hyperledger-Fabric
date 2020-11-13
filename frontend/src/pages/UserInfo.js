import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import styled from "styled-components";
import { EditInfo, History, MyHome, MyNews, UserInfoLoader, ReportInfo } from "components";

const UserInfoStyle = styled.section`
  min-height: 80vh;
  display: flex;
  padding-top: 200px;
  .side {
    display: flex;
    align-content: center;
    justify-content: center;
    width: 500px;
    min-width: 500px;
    article {
      width: 180px;
      min-width: 180px;
      position: fixed;
      .side__user {
        height: 170px;
        background-color: #9c9c9c;
        border-bottom: orange 5px solid;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        > div {
          width: 50px;
          height: 50px;
          background-size: cover;
          background-position: center center;
          background-repeat: no-repeat;
          border-radius: 25px;
        }
        > p {
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          margin-bottom: 0px;
        }
      }
      .side__menu {
        background-color: #f1f1f1;
        height: 220px;
        display: flex;
        flex-direction: column;
        padding: 10px;
        padding-top: 20px;
        > p {
          margin: 10px;
          width: 130px;
          padding: 5px;
          padding-bottom: 10px;
          display: flex;
          justify-content: flex-start;
          align-content: center;
          color: #454545;
          border-bottom: solid lightgray 0.1px;
          transition: color 0.2s ease-in-out;
          cursor: pointer;
          :hover {
            color: orange;
          }
        }
      }
    }
  }
  .main {
    width: 100%;
  }
`;

const UserInfo = (props , history) => {
  const [infoType, setInfoType] = useState("my__home");
  const [storyList, setStoryList] = useState(null);
  const [reportList, setReportList] = useState(null);
  const [campaignList, setCampaignList] = useState(null);
  const [userHistory, setUserHistory] = useState(null);
  const [totalValue, setTotalValue] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [historyPage, setHistoryPage] = useState(1);
  const [historyMore, setHistoryMore] = useState(false);
  const flag = useRef(true);
  const profile = useSelector((state) => state.auth.user.profile);
  const nickname = useSelector((state) => state.auth.user.nickname);
  const isLoggedIn = useSelector((state) => state.auth.user.isLoggedIn);
  const hashEmail = useSelector((state) => state.auth.user.hash_email);
  const email = useSelector((state) => state.auth.user.email);

  const typeChangeHandler = (e) => {
    setInfoType(e.target.id);
  };

  const init = async () => {
    const result = await axios.post("/myPage/init");
    console.log(result.data);
    setStoryList(result.data.storyList);
    setReportList(result.data.reportList);
    setCampaignList(result.data.campaignList);
    setUserHistory(result.data.userHistory);
    setTotalValue(result.data.totalValue);
    setLoading(false);
    setHistoryMore(result.data.historyMore);
    setTotalCount(result.data.totalCount);
  };

  const historyLoad = async () => {
    const result = await axios.post(`/myPage/load/history/${historyPage}`);
    const newUserHistory = userHistory.concat(result.data.userHistory);
    if (result.data.historyMore) {
      setHistoryPage((page) => page + 1);
    }
    setUserHistory(newUserHistory);
    setHistoryMore(result.data.historyMore);
    let newCampaignList = campaignList.concat(result.data.campaignList);
    newCampaignList = new Set(newCampaignList);
    setCampaignList(Array.from(newCampaignList));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!isLoggedIn) props.history.push("/");
    if (flag.current) {
      init();
      flag.current = false;
    }
  }, [isLoggedIn]);

  return (
    <UserInfoStyle>
      <section className="side">
        <article>
          <div className="side__user">
            {profile ? (
              <div
                style={{
                  backgroundImage: `url("${profile}") `,
                }}
              ></div>
            ) : (
              <div
                style={{
                  backgroundImage: `url("/icons/hugus_icon.png") `,
                }}
              ></div>
            )}

            <p>{nickname}님</p>
            <p>hash : {hashEmail}</p>
          </div>
          <div className="side__menu">
            <p id="my__home" onClick={typeChangeHandler}>
              MY홈
            </p>
            <p id="my__news" onClick={typeChangeHandler}>
              내 소식
            </p>
            <p id="edit__profile" onClick={typeChangeHandler}>
              회원 정보 관리
            </p>
            <p id="report__info" onClick={typeChangeHandler}>
              신고 정보
            </p>
          </div>
        </article>
      </section>

      {loading ? (
        <UserInfoLoader />
      ) : (
        <section className="main">
          {infoType === "my__home" && (
            <MyHome
              totalValue={totalValue}
              reportList={reportList}
              storyList={storyList}
              userHistory={userHistory}
              historyMore={historyMore}
              historyLoad={historyLoad}
              campaignList={campaignList}
              totalCount={totalCount}
            />
          )}
          {infoType === "my__news" && <MyNews storyList={storyList} />}
          {infoType === "edit__profile" && (
            <EditInfo
              setInfoType={setInfoType}
              profile={profile}
              nickname={nickname}
            />
          )}
          {infoType === "report__info" && <ReportInfo reportList={reportList} history={props.history} />}
        </section>
      )}
    </UserInfoStyle>
  );
};

export default UserInfo;
