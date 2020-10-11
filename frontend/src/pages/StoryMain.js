import React, { useEffect } from "react";
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
