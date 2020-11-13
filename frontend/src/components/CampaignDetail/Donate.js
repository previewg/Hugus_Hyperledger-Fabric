import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { signInBtnIsClicked } from "actions/user";
import { useDispatch, useSelector } from "react-redux";
import CountUp from "react-countup";

const BarStyle = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;

  .campaign_value {
    font-size: 25px;
    font-weight: bold;
    color: orange;
  }
  .bar {
    display: flex;
    background-color: #e7e7e7;
    border-radius: 10px;
    width: 100%;
    height: 10px;
    transition: width 0.7s ease-in-out;
    > div {
      background-color: orange;
      border-radius: 10px;
      ${(props) => (props.ratio == 0 ? "width:0px;" : `width:${props.ratio}%`)};
    }
  }
  .campaign_goal {
    text-align: end;
    font-size: 14px;
    color: gray;
  }
`;

const Donate = ({ data, history }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.user.isLoggedIn);
  const campaign_value = data.campaign_value;
  const campaign_goal = data.campaign_goal;

  const [scroll, setScroll] = useState(0);

  const ProgressBar = () => {
    let ratio = (campaign_value / campaign_goal) * 100;
    if (ratio > 100) ratio = 100;
    return (
      <BarStyle ratio={ratio}>
        <p className="campaign_value">
          <CountUp
            formattingFn={(num) => num.toLocaleString()}
            end={campaign_value}
            duration={1.5}
          />
          원
        </p>
        <div className="bar">
          <div></div>
        </div>
        <p className="campaign_goal">{campaign_goal.toLocaleString()}원</p>
      </BarStyle>
    );
  };

  const DonateHandler = () => {
    if (!isLoggedIn) {
      dispatch(signInBtnIsClicked());
    } else {
      history.push(`/pay/${data.id}`);
    }
  };

  const DonateButton = () => {
    return <button onClick={DonateHandler}>후원하기</button>;
  };

  const scrollHandler = () => {
    const scrollTop = document.documentElement.scrollTop;
    if (scrollTop > 5390) window.removeEventListener("scroll", scrollHandler);
    setScroll(scrollTop);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    window.addEventListener("scroll", scrollHandler);
    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);
  return (
    <div className="donate">
      <ProgressBar />
      <DonateButton />
    </div>
  );
};

export default Donate;
