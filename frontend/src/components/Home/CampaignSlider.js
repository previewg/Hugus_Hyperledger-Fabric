import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Slider from "react-slick";
import axios from "axios";
import CountUp from "react-countup";
import { Link } from "react-router-dom";

const CampaignSliderStyle = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 150px;
  height: 80vh;
  transition: all 1s ease-in-out;
  transform: scale(${(props) => (props.scroll > 400 ? 1 : 0)});
  opacity: ${(props) => (props.scroll > 400 ? 1 : 0)};
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
    width: 80%;
    .slick-dots {
      position: relative;
      margin-top: 10px;
    }
    .slick-slider {
      width: 90%;
    }
    .slick-slide {
      display: flex;
      justify-content: center;
      transition: all 0.7s ease-in-out;
    }
    .slick-slide > div {
      padding: 15%;
    }
    .slick-center {
      transform: scale(1.2);
    }

    .campaign {
      box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);
      border-radius: 5px;
      cursor: pointer;
      text-decoration: none;

      :focus {
        outline: none;
      }
      .campaign__hashtag {
        display: flex;
        justify-content: flex-end;
        font-size: 12px;
        text-align: end;
        color: orange;
        margin-right: 10px;
        > p {
          margin-left: 5px;
        }
      }

      .campaign__img {
        width: 290px;
        height: 290px;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
      }
      .campaign__title {
        padding: 10px;
        padding-top: 0;
        padding-bottom: 0;
        font-size: 17px;
        color: black;
      }
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
  }
`;

const BarStyle = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  .count {
    width: 90%;
    background: transparent;
    margin: 0;
    font-size: 13px;
    color: white;
    display: flex;
    justify-content: flex-end;
  }
  div {
    width: 90%;
    display: flex;
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 10px;
    height: 5px;
    transition: all 2s ease-in-out;

    > div {
      height: 5px;
      background-color: white;
      border-radius: 10px;
      font-size: 13px;
      ${(props) => `width:${props.ratio}%`};
    }
  }
`;

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

const CampaignSlider = ({ scroll }) => {
  const settings = {
    infinite: true,
    autopspeed: 5000,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    dots: true,
    autoplay: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  const [list, setList] = useState([]);
  const init = useRef(true);

  const visitHandler = async (campaign_id) => {
    await axios.put("/campaign/visit", { campaign_id: campaign_id });
  };

  const ProgressBar = ({ vote, goal }) => {
    const [ratio, setRatio] = useState(0);

    useEffect(() => {
      const init = setTimeout(() => {
        if (vote > goal) setRatio(100);
        setRatio((vote / goal) * 100);
      });
      return () => clearTimeout(init);
    }, []);

    return (
      <BarStyle ratio={ratio}>
        <div className="count">
          <CountUp end={ratio} duration={2} />
          <span> %</span>
        </div>
        <div>
          <div></div>
        </div>
      </BarStyle>
    );
  };

  const loadInit = async () => {
    const initData = await axios.get(`/campaign/init`);
    setList(initData.data.list);
  };

  useEffect(() => {
    if (init.current) {
      loadInit();
      init.current = false;
    }
  }, []);

  return (
    <CampaignSliderStyle scroll={scroll}>
      <p>진행 중인 캠페인</p>
      <div>
        <Slider {...settings}>
          {list.map((campaign, key) => {
            return (
              <Link
                className="campaign"
                key={key}
                to={`/campaign/${campaign.id}`}
                onClick={() => visitHandler(campaign.id)}
              >
                <div className="campaign__hashtag">
                  {campaign.Hashtags.slice(0, 3).map((tag, key) => {
                    return <p key={key}>#{tag.hashtag}</p>;
                  })}
                </div>
                <div
                  className="campaign__img"
                  style={{
                    backgroundImage: `url("${campaign.Campaign_Files[0].file}") `,
                  }}
                />
                <p className="campaign__title">{campaign.campaign_title}</p>
                <ProgressBar
                  vote={campaign.campaign_vote}
                  goal={campaign.campaign_goal}
                />
              </Link>
            );
          })}
        </Slider>
      </div>
    </CampaignSliderStyle>
  );
};

export default CampaignSlider;
