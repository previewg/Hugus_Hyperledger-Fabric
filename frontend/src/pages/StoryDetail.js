import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { storyLoader, storyLoadInit } from "actions/story";
import { commentListLoader } from "actions/comment";
import { StoryContents, Comments, Back, StoryDetailLoader } from "components";

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

  console.log(data);
  useEffect(() => {
    dispatch(storyLoader(match.params.id));
    dispatch(commentListLoader(match.params.id));
    return () => dispatch(storyLoadInit());
  }, []);

  if (status !== "SUCCESS") return <StoryDetailLoader />;
  return (
    <StoryDetailStyle>
      <StoryContents data={data} history={history} />
      <Comments data={data} />
      <Back />
    </StoryDetailStyle>
  );
};
export default StoryDetail;
