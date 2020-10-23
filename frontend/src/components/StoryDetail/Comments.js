import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import CommentInput from "./CommentInput";
import CommentList from "./CommentList";
import { commentListInit } from "../../actions/comment";

const CommentStyle = styled.div`
  width: 700px;
`;

const Comments = ({ data }) => {
  const commentList = useSelector((state) => state.comment.list.data);
  const num = useSelector((state) => state.comment.list.num);
  return (
    <CommentStyle>
      <CommentInput commentList={commentList} data={data} num={num} />
      <CommentList commentList={commentList} data={data} num={num} />
    </CommentStyle>
  );
};

export default Comments;
