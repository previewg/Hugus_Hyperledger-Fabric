import React, { useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const InfoStyle = styled.section`
  width: 100%;
  height: 100vh;
  padding-top: 70px;
  .Layout {
    display: grid;
    grid-template-rows: 5fr 8fr 4fr ;
    height: 100vh;
  >div:nth-child(1) {
    display: flex;
    padding-top: 70px;
    width: 100%;
    flex-direction: column;
    align-items: center;
    .title_name {
    font-weight: bold;
    font-size: 40px;
    }
    .title_smallName {
    margin-top: 20px;
    font-size: 30px;
    color: grey;
    }
  }
  >div:nth-child(2) {
    background-color: #f0f0f0;
    display: grid;
    align-items: center;
    .partOne {
      margin-left: 30px;

      .topName {
      font-size: 40px;
      font-weight: bold;
      }
    }
   
    .partTwo {
      margin-left: 30px;
      .bottomName {
        font-size: 40px;
        font-weight: bold;
      }

    }
  }

  
  }
`;

const Info = () => {






  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <InfoStyle>
      <div className="Layout">
      
      <div>
      <span className="title_name">투명하고 자율적인 블록체인 기반 기부 플랫폼</span>
      <span className="title_smallName">부제목 생각해보세여</span>

      <article className=""></article>

      </div>

      <div className="">

      <div className="partOne">
      <span className="topName">커피 한 잔 금액도 <br/> 부담 없이 간편하게 결제</span>
      <p>
        다수의 평범한 사람이 따뜻한 세상을 만들 수 있어요.<br/>
        적은 금액도 간편 계좌, 네이버페이, 카드 결제, 가상 계좌로<br/>
        10초 만에 결제 끝!
      </p>
      </div>

      <div className="partTwo">
      <span className="bottomName">블록체인으로 투명한 기부금 관리</span>
      <p>
        모금부터 사용까지 모든 기부금 정보를 블록체인에 실시간으로 기록합니다.<br/>
        기부금은 누구도 개입할 수 없는 스마트계약에 의해서만 전달돼요!
        </p>
      </div>

      </div>

      <div className="campaignSection">

      <div className="campaignGo">
      <span>a</span>
      <Link></Link>
      </div>



      </div>













      </div>
    </InfoStyle>
  );
};

export default Info;
