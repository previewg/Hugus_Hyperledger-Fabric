import { TalkContents, TalkComments } from "components";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import styled from "styled-components";
import { talkLoader, talkLoadInit } from "actions/talk";

const TalkDetailStyle = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 70px;
  align-items: center;
  flex-direction: column;
`;

const TalkDetail = ({ match, history }) => {
  const dispatch = useDispatch();
  const init = useRef(true);
  const [talkId, setTalkId] = useState([]);
  const [talkCommentList, setTalkCommentList] = useState([]);
  const [likenum, setLikenum] = useState(0);

  useEffect(() => {
    const id = match.params.id;
    const page = match.params.page;
    const initFunc = async () => {
      const data = await axios.get(`/talk/${id}`);
      const comment = await axios.get(`/talk_comment/list/${id}/${page}`);
      setTalkId(data.data);
      setTalkCommentList(comment.data);
      setLikenum(data.data.data.talk_like);
    };
    if (init.current) {
      init.current = false;
      initFunc();
    }
  }, []);

  return (
    <TalkDetailStyle>
      {talkId.length !== 0 && (
        <TalkContents talkId={talkId} history={history} likenum={likenum} />
      )}
      {talkCommentList.length !== 0 && (
        <TalkComments
          talkId={talkId}
          setLikenum={setLikenum}
          talkCommentList={talkCommentList}
          setTalkCommentList={setTalkCommentList}
        />
      )}
    </TalkDetailStyle>
  );
};

export default TalkDetail;
