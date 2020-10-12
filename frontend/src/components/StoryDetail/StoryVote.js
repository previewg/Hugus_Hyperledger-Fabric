import React from "react";
import styled from "styled-components";
import { signInBtnIsClicked } from "../../actions/user";
import { storyVote } from "../../actions/story";
import { useDispatch, useSelector } from "react-redux";

const BarStyle = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;
  div {
    display: flex;
    background-color: #e7e7e7;
    border-radius: 10px;
    width: 100%;
    height: 100%;
    transition: all 0.7s ease-in-out;
    > div {
      background-color: orange;
      border-radius: 10px;
      font-size: 13px;
      ${(props) =>
        props.ratio == 0 ? "width:0px;opacity:0" : `width:${props.ratio}%`};
      padding-right: 10px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      ${(props) => (props.ratio == 0 ? "color: transparent" : " color: black")};
    }
  }
  p {
    text-align: end;
    font-size: 12px;
  }
`;

const StoryVote = ({ data }) => {
  const dispatch = useDispatch();
  const vote = useSelector((state) => state.story.vote);
  const isLoggedIn = useSelector(
    (state) => state.authentication.status.isLoggedIn
  );

  const progressBar = () => {
    let ratio = (vote.voteNum / data.story_goal) * 100;
    if (ratio > 100) ratio = 100;
    return (
      <BarStyle ratio={ratio}>
        <div>
          <div></div>
        </div>
        <p>
          ({vote.voteNum} / {data.story_goal})
        </p>
      </BarStyle>
    );
  };

  const voteHandler = () => {
    if (!isLoggedIn) {
      dispatch(signInBtnIsClicked());
    } else {
      if (vote.user) {
        dispatch(storyVote(data.id, true));
      } else {
        dispatch(storyVote(data.id, false));
      }
    }
  };

  const voteButton = () => {
    if (!isLoggedIn) {
      return (
        <button className="vote_false" onClick={voteHandler}>
          후원을 희망합니다
        </button>
      );
    } else {
      if (vote.user) {
        return (
          <button className="vote_true" onClick={voteHandler}>
            투표 취소하기
          </button>
        );
      } else {
        return (
          <button className="vote_false" onClick={voteHandler}>
            후원을 희망합니다
          </button>
        );
      }
    }
  };

  return (
    <div className="vote">
      {progressBar()}
      {voteButton()}
      <p>
        <strong>필요 득표수</strong>를 충족할 시, 메인 캠페인으로 등록되며{" "}
        <strong>실제 모금</strong>이 이루어집니다.
      </p>
    </div>
  );
};

export default StoryVote;
