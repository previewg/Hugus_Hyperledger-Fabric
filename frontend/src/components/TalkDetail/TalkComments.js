import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import axios from "axios";
import TalkCommentInput from "./TalkCommentInput";
import TalkCommentList from "./TalkCommentList";

const TalkCommentStyle = styled.div`
  width: 700px;
`;
const TalkComments = ({ talkId, commentId }) => {
  const init = useRef(true);


  return (
    <TalkCommentStyle>
      <TalkCommentInput talkId={talkId} commentId={commentId}/>
      <TalkCommentList talkId={talkId} commentId={commentId}/>
    </TalkCommentStyle>
  );
};

export default TalkComments;
