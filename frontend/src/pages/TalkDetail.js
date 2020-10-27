import { TalkContents, TalkComments } from "components";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import styled from "styled-components";

const TalkDetailStyle = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 70px;
  align-items: center;
  flex-direction: column;
`;  

const TalkDetail = ({ match }) => {
  const init = useRef(true);
  const [talkId, setTalkId] = useState([]);
  const [talkCommentList, setTalkCommentList] = useState([]);
  useEffect(() => {
    const id = match.params.id;
    const page = 1;

    const initFunc = async () => {
      const data = await axios.get(`/talk/${id}`);
      const comment = await axios.get(`/talk_comment/list/${id}/${page}`);
      setTalkId(data.data);
      setTalkCommentList(comment.data);
    };
    if (init.current) {
      init.current = false;
      initFunc();
    }
  }, []);

  return (
    <TalkDetailStyle>
      {talkId.length !== 0 && <TalkContents talkId={talkId} />}
      {talkCommentList.length !== 0 && <TalkComments 
      talkId={talkId} talkCommentList={talkCommentList}/> }
    </TalkDetailStyle>
  );
};

export default TalkDetail;
