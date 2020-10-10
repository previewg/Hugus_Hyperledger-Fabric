import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import CommentInput from "./CommentInput";
import CommentList from "./CommentList";

const CommentStyle = styled.div`
  width: 700px;
`;

const Comments = ({ data }) => {
  const commentList = useSelector((state) => state.comment.list.data);

  return (
    <CommentStyle>
      <CommentInput commentList={commentList} data={data} />
      <CommentList commentList={commentList} data={data} />
    </CommentStyle>
  );
};

export default Comments;
