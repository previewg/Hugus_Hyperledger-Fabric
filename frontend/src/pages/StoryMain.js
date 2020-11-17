import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { signInBtnIsClicked } from "actions/user";
import { StoryNav, StoryList } from "components";

const StoryMainStyle = styled.div`
  display: flex;
  flex-direction: column;
  .StoryWrite__btn {
    position: absolute;
    top: 22%;
    right: 15%;
    color: orange;
    font-weight: bold;
    text-decoration: none;
    cursor: pointer;
    width: 60px;
    height: 60px;
    border-radius: 30px;
    border: 0.1px solid orange;
    display: flex;
    justify-content: center;
    align-items: center;
    :hover {
      background-color: rgba(255, 165, 0, 0.1);
    }
  }
`;

const StoryMain = (props) => {
  const dispatch = useDispatch();
  const isLoggedIn = props.isLoggedIn;
  const [storyType, setStoryType] = useState("hot");

  const typeChange = (e) => {
    e.preventDefault();
    if (e.target.getAttribute("name") === "my" && !isLoggedIn) {
      dispatch(signInBtnIsClicked());
      return;
    }
    setStoryType(e.target.getAttribute("name"));
  };

  const onClickHandler = () => {
    if (isLoggedIn) props.history.push("/story/write");
    else dispatch(signInBtnIsClicked());
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <StoryMainStyle>
      <StoryNav storyType={storyType} typeChange={typeChange} />
      <p className="StoryWrite__btn" onClick={onClickHandler}>
        글작성
      </p>
      <StoryList storyType={storyType} />
    </StoryMainStyle>
  );
};

export default StoryMain;
