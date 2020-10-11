import React from "react";
import styled from "styled-components";
import { signInBtnIsClicked } from "../../actions/user";
import { storyVote } from "../../actions/story";
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

const StoryVote = ({ data }) => {
  const dispatch = useDispatch();
  const vote = useSelector((state) => state.story.vote);
  const isLoggedIn = useSelector(
    (state) => state.authentication.status.isLoggedIn
  );

  const ProgressBar = () => {
    let ratio = (vote.voteNum / data.story_goal) * 100;
    if (ratio > 100) ratio = 100;
    return (
      <BarStyle ratio={ratio}>
        <p className="ratio">{(vote.voteNum / data.story_goal) * 100}%</p>
        <div className="bar">
          <div></div>
        </div>
        <p className="total">
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

  const VoteButton = () => {
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
      <ProgressBar />
      <VoteButton />
      <p>
        <strong>필요 득표수</strong>를 충족할 시, 메인 캠페인으로 등록되며{" "}
        <strong>실제 모금</strong>이 이루어집니다.
      </p>
    </div>
  );
};

export default StoryVote;
