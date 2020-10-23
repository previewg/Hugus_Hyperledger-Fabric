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
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
`;

const StoryMain = (props) => {
  const dispatch = useDispatch();
  const isLoggedIn = props.isLoggedIn;
  const [storyType, setStoryType] = useState("hot");
  const [changed, setChanged] = useState(false);
  const typeChange = (e) => {
    e.preventDefault();
    if (e.target.getAttribute("name") === "my" && !isLoggedIn) {
      dispatch(signInBtnIsClicked());
      return;
    }
    setStoryType(e.target.getAttribute("name"));
    setChanged(true);
  };

  const onClickHandler = () => {
    if (isLoggedIn) props.history.push("/story/write");
    else dispatch(signInBtnIsClicked());
  };

  useEffect(() => {
    if (props.location.search) {
      setStoryType(props.location.search.split("=")[1]);
      setChanged(true);
    }
    window.scrollTo(0, 0);
  }, [props.location.search]);

  return (
    <StoryMainStyle>
      <StoryNav storyType={storyType} typeChange={typeChange} />
      <p className="StoryWrite__btn" onClick={onClickHandler}>
        글작성
      </p>
      <StoryList
        storyType={storyType}
        changed={changed}
        setChanged={setChanged}
      />
    </StoryMainStyle>
  );
};

export default StoryMain;
