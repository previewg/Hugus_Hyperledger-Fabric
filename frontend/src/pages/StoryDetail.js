import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { storyLoader, storyLoadInit } from "actions/story";
import { commentListInit, commentListLoader } from "actions/comment";
import { StoryContents, Comments, StoryDetailLoader } from "components";

const StoryDetailStyle = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 70px;
  align-items: center;
  flex-direction: column;
`;

const StoryDetail = ({ match, history }) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.story.detail.data);
  const status = useSelector((state) => state.story.detail.status);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(storyLoader(match.params.id));
    dispatch(commentListLoader(match.params.id, 1));
    return () => {
      dispatch(storyLoadInit());
      dispatch(commentListInit());
    };
  }, []);

  if (status !== "SUCCESS") return <StoryDetailLoader />;
  return (
    <StoryDetailStyle>
      <StoryContents data={data} history={history} />
      <Comments data={data} />
    </StoryDetailStyle>
  );
};
export default StoryDetail;
