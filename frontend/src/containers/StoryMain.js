import React, { useEffect } from "react";
import styled from "styled-components";
import StorySlider from "../components/Home/CampaignSlider";
import StoryNav from "../components/StoryMain/StoryNav";
import StoryList from "../components/StoryMain/StoryList";
import MoreBtn from "../components/Home/MoreBtn";
import { signInBtnIsClicked } from "../actions/user";
import { useDispatch } from "react-redux";

const StoryMainStyle = styled.div`
  display: flex;
  flex-direction: column;
  .StoryWrite__btn {
    position: absolute;
    top: 22%;
    right: 15%;
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
`;

const StoryMain = (props) => {
  const dispatch = useDispatch();
  const isLoggedIn = props.isLoggedIn;

  const onClickHandler = () => {
    if (isLoggedIn) props.history.push("/story/write");
    else dispatch(signInBtnIsClicked());
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <StoryMainStyle>
      <StoryNav />
      <p className="StoryWrite__btn" onClick={onClickHandler}>
        글작성
      </p>
      <StoryList />
    </StoryMainStyle>
  );
};

export default StoryMain;
