import React, { useRef } from "react";
import styled from "styled-components";
import TalkCommentInput from "./TalkCommentInput";
import TalkCommentList from "./TalkCommentList";

const TalkCommentStyle = styled.div`
  width: 700px;
`;
const TalkComments = ({ talkId, talkCommentList, setTalkCommentList }) => {
  // const init = useRef(true);

  return (
    <TalkCommentStyle>
      <TalkCommentInput talkId={talkId} talkCommentList={talkCommentList} setTalkCommentList={setTalkCommentList}/>
      <TalkCommentList talkId={talkId} talkCommentList={talkCommentList} setTalkCommentList={setTalkCommentList}/>
    </TalkCommentStyle>
  );
};

export default TalkComments;
