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
  const [commentId, setcommentId] = useState([]);

  useEffect(() => {
    const id = match.params.id;
    const talk_id = match.params.id;
    const section = match.params.section;

    const initFunc = async () => {
      const data = await axios.get(`/talk/${id}`);
      const comment = await axios.get(`/talk_comment/list/${talk_id}/${section}`);
      setTalkId(data.data);
      setcommentId(comment.data);
    };
    if (init.current) {
      init.current = false;
      initFunc();
    }
  }, []);

  return (
    <TalkDetailStyle>
      {talkId.length !== 0 && <TalkContents talkId={talkId} />}
      <TalkComments talkId={talkId} commentId={commentId}/>
    </TalkDetailStyle>
  );
};

export default TalkDetail;
