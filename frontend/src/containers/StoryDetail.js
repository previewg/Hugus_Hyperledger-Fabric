import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { css } from "@emotion/core";
import { SyncLoader } from "react-spinners";
import { storyLoader, storyLoadInit } from "../actions/story";
import { commentListLoader } from "../actions/comment";
import StoryContents from "../components/StoryDetail/StoryContents";
import Comments from "../components/StoryDetail/Comments";
import Back from "../components/StoryDetail/Back";

const StoryDetailStyle = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 70px;
  align-items: center;
  flex-direction: column;
`;

const StoryDetail = ({ match }) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.story.detail.data);
  const status = useSelector((state) => state.story.detail.status);

  useEffect(() => {
    dispatch(storyLoader(match.params.id));
    dispatch(commentListLoader(match.params.id));
    return () => dispatch(storyLoadInit());
  }, []);

  const Loader = () => {
    return (
      <SyncLoader
        css={css`
          height: 100vh;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        `}
        size={10}
        color={"#f69a53"}
        loading={true}
      />
    );
  };

  if (status !== "SUCCESS") return Loader();
  return (
    <StoryDetailStyle>
      <StoryContents data={data} />
      <Comments data={data} />
      <Back />
    </StoryDetailStyle>
  );
};
export default StoryDetail;
