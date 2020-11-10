import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { AdminLoader } from "components";

const SummaryStyle = styled.article`
  width: 100%;
  height: 95vh;
  display: flex;
  justify-content: center;
  padding-top: 60px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: bottom;
  .cards {
    margin-top: 50px;
    width: 1100px;
    height: 70vh;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    .card {
      background-color: rgba(255, 255, 255, 0.2);
      margin: 30px;
      border-radius: 10px;
      box-shadow: 0px 0px 20px 5px rgba(0, 0, 0, 0.15);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      > p {
        margin: 0px;
        padding: 30px;
        font-size: 19px;
        color: white;
        :nth-child(2) {
          align-self: flex-end;
          font-size: 22px;
          color: orange;
        }
      }
    }
  }
`;

const Summary = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const init = async () => {
    const result = await axios.post("/admin/summary");
    setData(result.data);
    setLoading(false);
    console.log(result.data);
  };

  useEffect(() => {
    init();
  }, []);

  if (loading) return <AdminLoader />;
  return (
    <SummaryStyle style={{ backgroundImage: 'url("/pics/admin.jpg")' }}>
      <div className="cards">
        <div className="card">
          <p>현재 스토리</p>
          <p>{data.activeStoryCount}건</p>
        </div>
        <div className="card">
          <p>현재 캠페인</p>
          <p>{data.activeCampaignCount}건</p>
        </div>
        <div className="card">
          <p>후원 인증</p>
          <p>{data.ActCount}건</p>
        </div>
        <div className="card">
          <p>총 모금액</p>
          <p>{data.totalAmount.toLocaleString()}원</p>
        </div>
        <div className="card">
          <p>지난 스토리</p>
          <p>{data.expiredStoryCount}건</p>
        </div>
        <div className="card">
          <p>지난 캠페인</p>
          <p>{data.expiredCampaignCount}건</p>
        </div>
        <div className="card">
          <p>회원</p>
          <p>{data.UserCount}명</p>
        </div>
        <div className="card">
          <p>총 기부 건수</p>
          <p>{data.donationCount}건</p>
        </div>
      </div>
    </SummaryStyle>
  );
};

export default Summary;
