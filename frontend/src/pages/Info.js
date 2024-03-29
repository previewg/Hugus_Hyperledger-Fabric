import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Slider from "react-slick";
import { ClipLoader } from "react-spinners";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signUpBtnIsClicked } from "actions/user";
import axios from "axios";

const InfoStyle = styled.section`
  width: 100%;
  padding-top: 70px;
  .Layout {
    display: grid;
    grid-template-rows: 3.8fr 1.5fr 5fr 1.5fr 4.5fr 1.5fr ;
  >div:nth-child(1) {
    padding-bottom: 20px;
    padding-top: 20px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    background-color: white;
    gap: 150px;
    .donate_title {
      display: flex;
      justify-content: center;
      font-size: 50px;
      font-weight: bold;
    }
    .donate_line {
      display: flex;
      align-items: center;
      justify-content: space-around;
      width: 100%;
      font-size: 22px;
      font-weight: bold;
      .donate_all_story {
        display: flex;
        flex-direction: column;
        align-items: center;
        >img {
        width: 60px;
        height: 60px;
      }
      }
      .donate_all_price {
        display: flex;
        flex-direction: column;
        align-items: center;
        >img {
        width: 60px;
        height: 60px;
      }
      }
      .donate_all_user {
        display: flex;
        flex-direction: column;
        align-items: center;
        >img {
        width: 60px;
        height: 60px;
      }
      }
      .donate_all_campaign {
        display: flex;
        flex-direction: column;
        align-items: center;
        >img {
        width: 60px;
        height: 60px;
      }
      }
    }
  }

  .bar {
    background: linear-gradient(25deg , #ecb475, 42%, #ebf8e1, #6c97a9);
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-around;
    .write_section {
      display: flex;
      width: 300px;
      justify-content: center;
      flex-direction: column;
      >p:nth-child(1) {
      font-size: 25px;
      color: white;
      span:nth-child(1) {
        color: #ea4540;
        font-weight: bold;
        font-size: 28px;
      }
      >span:nth-child(3) {
        color: #cc2569;
        font-weight: bold;
        font-size: 28px;
      }
      }
    }
    >img {
      width: 600px;
    }
  }

  .asdfasdf {
    padding-left: 140px;
    padding-bottom: 30px;
    padding-top: 30px;
    display: grid;
    align-items: center;
    .partOne {
      width: 90%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .write_line {
      display: flex;
      gap: 20px;
      flex-direction: column;
      .topName {
      font-size: 40px;
      font-weight: bold;
      }
    }
      >p {
        color: #303030; 
      }
      >img {
    display: flex;
    width: 220px;
    height: 440px;
    }
  }
    .partTwo {
      width: 90%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .write_line {
      display: flex;
      gap: 20px;
      flex-direction: column;
      .bottomName {
        font-size: 40px;
        font-weight: bold;
      }
    }
      >p {
        color: #303030; 
      }
      >img {
      display: flex;
      width: 220px;
      height: 440px;
    }
  }
}

  .bannerBar {
    display: flex;
    align-items: center;
    background: linear-gradient(25deg , #ecb475, 42%, #ebf8e1, #6c97a9);
    .campaign_section {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      gap: 80px;
      .campaign_link {
        flex-direction: column;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: bold;
        border-radius: 4px;
        background-color: rgba(255, 255, 255, 0.4);
        padding: 20px;
        font-size: 30px;
        color: black;
        text-decoration: none;
        border: none;
        outline: none;
        width: 450px;
        height: 100px;
        >span {
          margin-top: 10px;
          display: flex;
          font-weight: normal;
          font-size: 17px;
          color: #808080;
        }
      }
      .signIn_link {
        flex-direction: column;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: bold;
        border-radius: 4px;
        background-color: rgba(255, 255, 255, 0.4);
        padding: 20px;
        font-size: 30px;
        color: black;
        text-decoration: none;
        border: none;
        outline: none;
        width: 450px;
        height: 100px; 
        >span {
          margin-top: 10px;
          display: flex;
          font-weight: normal;
          font-size: 17px;
          color: #808080;
        }
      }
    }
  }

  >div:nth-child(5) {
    padding-top: 30px;
    padding-left: 140px;
    padding-bottom: 30px;
    display: grid;
    align-items: center;
      .partOne {
      width: 90%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .write_line {
      display: flex;
      gap: 20px;
      flex-direction: column;
      .topName {
      font-size: 40px;
      font-weight: bold;
      }
      >p {
        color: #303030; 
      }
    }
    >img {
    display: flex;
    width: 220px;
    height: 430px;
    }
  }
   
    .partTwo {
      margin-top: 30px;
      width: 90%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .write_line {
      display: flex;
      gap: 20px;
      flex-direction: column;
      .bottomName {
        font-size: 40px;
        font-weight: bold;
      }
      >p {
        color: #303030; 
      }
      }
      >img {
      display: flex;
      width: 400px;
      height: 250px;
      }
    }
  }

  .patners_section {
    background: linear-gradient(120deg, #6c97a9, 30%, #ecb475, #ebf8e1);
    width: 100%;
    display: flex;
    justify-content: center;
    padding-bottom: 60px;
  }
  }
`;

const SliderStyle = styled.section`
  display: flex;
  width: 1100px;
  flex-direction: column;
  align-items: center;
  margin-top: 70px;
  transition: all 0.7s ease-in-out;
  //opacity: ${(props) => (props.scroll > 400 ? 1 : 0)};
  .title {
    >span {
      color: #303030; 
      font-weight: bold;
      font-size: 30px;
      margin-bottom: 40px;
    }
  }
  > p {
    text-align: left;
    font-size: 25px;
    padding: 10px;
    border-bottom: solid 2px orange;
    margin-bottom: 100px;
  }
  > div {
    display: flex;
    justify-content: center;
    height: 40%;
    width: 90%;
    .slick-dots {
      position: relative;
      margin-top: 10px;
    }
    .slick-slider {
      width: 90%;
    }
    .slick-list {
    }
    .slick-track {
      padding-top: 20px;
    }
    .slick-slide {
      display: flex;
      justify-content: center;
      transition: all 0.7s ease-in-out;
    }
    .slick-center {
      transform: scale(1.2);
    }
    .slick-list {
      padding-bottom: 50px;
    }

    @media (max-width: 700px) {
      .slick-slider {
        width: 700px;
        height: 550px;
      }

      .slick-slide > div {
        padding: 20px;
      }
    }
    .upchain_logo {
        width: 180px;
      }
    .coinone_logo {
        width: 200px;
    }
    .bnk_logo {
        width: 120px;
    }
    .coinone_logo {
        display: flex;
        width: 190px;
    }
  }
`;

const LoaderStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100px;
`;

const Info = ({history}) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.user.isLoggedIn);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const init = async () => {
    const result = await axios.post("/admin/summary");
    setData(result.data);
    setLoading(true);
  };

  useEffect(() => {
    init();
  }, []);

  const Loader = () => {
    return (
      <LoaderStyle>
        <ClipLoader size={50} color={"#f69a53"} loading={true} />
      </LoaderStyle>
    );
  };

  const signUpHandler = () => {
    if (isLoggedIn) {
      history.push("/");
    } else {
      dispatch(signUpBtnIsClicked());
    }
  }

  const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <img
        className={className}
        style={{
          ...style,
          display: "block",
          paddingLeft: "300px",
          transform: "scale(2)",
        }}
        onClick={onClick}
        src="/icons/Nexticon.png"
      />
    );
  };
  
  const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <img
        className={className}
        style={{
          ...style,
          display: "block",
          paddingRight: "300px",
          transform: "scale(2)",
        }}
        onClick={onClick}
        src="/icons/Backicon.png"
      />
    );
  };
  
  const PartnersSlider = () => {

    const settings = {
      infinite: true,
      autopspeed: 1800,
      slidesToShow: 3,
      slidesToScroll: 1,
      centerMode: true,
      dots: true,
      autoplay: true,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
    };
 
    return (
      <SliderStyle>
      <div className="title">
          <span>Partners</span>
      </div>
        <div>
          <Slider {...settings}>
          
            <div className="blockOdyssey" style={{backgroundImage:`url("/icons/odyssey.png")`}}>
              <img src="/icons/odyssey.png" />
            </div>
            
            <div>
            <img className="bnk_logo" src="./icons/busanbank_logo.png" />
            </div>
            <div>
            <img className="upchain_logo" src="./icons/upchain_logo.png" />
            </div>
            <div>
            <img src="./icons/fn_logo.png" />
            </div>
            <div>
            <img className="coinone_logo" src="./icons/coinone_logo.png" />
            </div>
          </Slider>
        </div>
      </SliderStyle>
    );
  };
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <InfoStyle>
      <div className="Layout">
      <div className="donate_section">
      <div className="donate_title">
        <p>투명하고 자율적인 블록체인 기반 기부 플랫폼</p>
      </div>

      <div className="donate_line">
        <div className="donate_all_story">
              <p>전체 스토리 수</p>
              <img src="./icons/story_logo.png" />
              {!loading ?
                (
                  <Loader />
                ) : (
                  <p><span>{data.activeStoryCount}</span> 건</p>
                )}
            </div>
            <div className="donate_all_price">
              <p>총 후원 금액</p>
              <img src="./icons/money.png" />
              {!loading ?
                (
                  <Loader />
                ) : (
                <p>{data.totalAmount.toLocaleString()} 원</p>
                )}
            </div>
            <div className="donate_all_user">
              <p>전체 회원 수 </p>
              <img src="./icons/contact.png" />
              {!loading ?
                (
                  <Loader />
                ) : (
                  <p>{data.UserCount} 명</p>
                )}
            </div>
            <div className="donate_all_campaign">
              <p>전체 캠페인 수</p>
              <img src="./icons/campaign_logo.png" />
              {!loading ?
                (
                  <Loader />
                ) : (
                  <p>{data.activeCampaignCount + data.expiredCampaignCount} 건</p>
                )}
        </div>
      </div>
      </div>

      <div className="bar">
        <div className="write_section">
          <p>간편한 <span>"페이 결제"</span>로<br/>
          <span>"소액"</span>도 후원할 수 있어요</p>
        </div>
        <img src="/icons/info_bar_img.png"/>          
      </div>

      <div className="asdfasdf">
      <div className="partOne">
      <div className="write_line">
        <span className="topName">주변의 어려움을 <br/> 직접 올려주세요</span>
        <p>
        스토리에 직접 사진과 글로 주변이나 자신의 어려움을<br/>
        올려주시면, 고민하고 이야기 나누며<br/>
        함께 해결책을 찾을 수 있습니다.
        </p>
      </div>
      <img src="/icons/main_sample.png"/>
      </div>
      <div className="partTwo">
        <div className="write_line">
          <span className="bottomName">후원을 하시려면</span>
          <p>
            스토리에 후원 희망을 통해 후원 의사를 표현하고<br/>
            채택이 된 캠페인에서 후원하기를 통해 도움을 줄 수 있습니다.
            </p>
        </div>
      <img src="/icons/campaign_sample.png"/>
      </div>
    </div>

      <div className="bannerBar">
      <div className="campaign_section">
        <Link to="/" className="campaign_link">HUG US의 후원자가 되어보세요!
          <span>캠페인 후원하기</span>
        </Link>
        <Link style={{ cursor: "pointer" }}
            onClick={() => signUpHandler()}
            className="signIn_link">HUG US에 가입해주세요!
          <span>HUG US 가입하기</span>
        </Link>
      </div>
      </div>

        <div className="">
          <div className="partOne">
            <div className="write_line">
              <span className="topName"> HUGUS 의 목표는<br />
              </span>
              <p>
                기부의 생활화를 통한 사회의 선순환 효과<br />
            주변의 이야기를 작성하고 읽고 나누어 따뜻한 손길이<br />
            닿을수 있게 하겠습니다.
            </p>
            </div>
            <img src="/icons/story_detail_sample.png" />
          </div>

          <div className="partTwo">
            <div className="write_line">
              <span className="bottomName">블록체인으로 투명한<br /> 기부금 관리</span>
              <p>
                모금부터 사용까지 모든 기부금 정보를 블록체인에 실시간으로 기록합니다.<br />
          기부금은 누구도 개입할 수 없는 스마트계약에 의해서만 전달돼요!
          </p>
            </div>
            <img src="/icons/block_chain_sample.png" />
          </div>
        </div>
      <div className="patners_section">
        <PartnersSlider />
      </div>
    </div>
    </InfoStyle>
  );
};

export default Info;