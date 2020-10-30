import React from "react";
import styled from "styled-components";
import { signInBtnIsClicked } from "actions/user";
import { useDispatch, useSelector } from "react-redux";

const BarStyle = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;

  :hover {
    .ratio {
      opacity: 1;
      transform: translate(-13px, -20px);
    }
    .bar > div {
      box-shadow: 0 0 10px 1px rgba(255, 165, 0, 1);
    }
  }
  .ratio {
    transition: 0.3s ease-in-out;
    opacity: 0;
    font-size: 17px;
    position: relative;
    top: 20px;
    ${(props) => `left:${props.ratio}%`};
    color: #ffa500;
    font-weight: bold;
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
  .total {
    text-align: end;
    font-size: 12px;
  }
`;

const Donate = ({ data, history }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.user.isLoggedIn);
  const campaign_donate = Number(data.campaign_donate);
  const campaign_goal = data.campaign_goal;

  const ProgressBar = () => {
    let ratio = (campaign_donate / campaign_goal) * 100;
    if (ratio > 100) ratio = 100;
    return (
      <BarStyle ratio={ratio}>
        <p className="ratio">{(campaign_donate / campaign_goal) * 100}%</p>
        <div className="bar">
          <div></div>
        </div>
        <p className="total">
          ( {campaign_donate}원 / {campaign_goal}원 )
        </p>
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

  return (
    <div className="donate">
      <ProgressBar />
      <DonateButton />
    </div>
  );
};

export default Donate;
