import React, { useRef } from "react";
import styled from "styled-components";
import TalkCommentInput from "./TalkCommentInput";
import TalkCommentList from "./TalkCommentList";

const TalkCommentStyle = styled.div`
  width: 700px;
`;
const TalkComments = ({ talkId, talkCommentList, total }) => {
  // const init = useRef(true);


  return (
    <TalkCommentStyle>
      <TalkCommentInput talkId={talkId} talkCommentList={talkCommentList} total={total}/>
      <TalkCommentList talkId={talkId} talkCommentList={talkCommentList}/>
    </TalkCommentStyle>
  );
};

export default TalkComments;
