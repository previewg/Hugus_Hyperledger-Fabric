import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { signInBtnIsClicked } from "../../actions/user";

const TalkCommentFalseStyle = styled.div`
  font-weight: bold;
  display: flex;
  flex-direction: column;
  margin-bottom: 50px;
  .header {
    display: flex;
    justify-content: space-between;
    .icon {
      display: flex;
      > img {
        margin-left: 5px;
        cursor: pointer;
        width: 20px;
      }
    }
  }
  > input {
    cursor: not-allowed;
    height: 15px;
    padding: 10px;
    border: none;
    border-bottom: solid gray 0.1px;
  }
`;
const TalkCommentTrueStyle = styled.div`
  font-weight: bold;
  display: flex;
  flex-direction: column;
  margin-bottom: 50px;
  .header {
    display: flex;
    justify-content: space-between;
    .icon {
      display: flex;
      > img {
        margin-left: 5px;
        cursor: pointer;
        width: 20px;
      }
    }
  }
  > input {
    height: 15px;
    padding: 10px;
    outline: none;
    transition: 0.4s ease-in-out;
    border: none;
    border-bottom: solid gray 0.1px;
    :focus {
      border-bottom: solid orange 0.1px;
    }
  }
  .comment__buttons {
    margin-top: 10px;
    display: flex;
    justify-content: flex-end;
    > button {
      background-color: transparent;
      width: 50px;
      height: 30px;
      border-radius: 3px;
      cursor: pointer;
      outline: none;
    }
    button:nth-child(1) {
      border: solid darkgray 0.1px;
      color: darkgray;
      :hover {
        background-color: darkgray;
        color: white;
      }
    }
    button:nth-child(2) {
      margin-left: 5px;
      border: solid orange 0.1px;
      color: orange;
      :hover {
        background-color: orange;
        color: white;
      }
    }
  }
`;
const ErrorBoxStyle = styled.p`
  ${(props) => {
    if (props.error == false) {
      return "display:none;opacity:0";
    } else {
      return "opacity:1;transform: translateX(-100px);";
    }
  }};
  right: 0;
  background-color: #ffa500;
  border-radius: 5px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 100px;
  width: 180px;
  height: 50px;
  transition: 0.7s ease-in-out;
  font-size: 15px;
`;
const errorMsg = "댓글을 입력하세요";

const TalkCommentInput = ({ talkId, talkCommentList, setTalkCommentList,setLikenum }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.user.isLoggedIn);
  const [like,setLike] = useState(talkId.like);
  const total = talkCommentList.total;
  const talk_id = talkId.data.id;
  const id = talk_id;
  const [error, setError] = useState(false);
  const comment = useRef();

  const likeHandler = async( status ) => {
    // dispatch(talkLike( id, status ));
      const result = await axios.put('/talk/like', { talk_id: id, status: status });
      if(result.data.success===1) {
        if(like) setLikenum(likenum => likenum -1);
        else setLikenum(likenum => likenum +1)
        setLike(!like)
      }
  }

  const Input = () => {
    const [comments, setComments] = useState("");
    const [loading,setLoading] = useState(false);

    const commentChangeHandler = (e) => {
      setComments(e.target.value);
      setError(false);
    };

    const commentAddHandler = async () => {
      if (comments !== "" && !loading) {
        setLoading(true);
        const result = await axios.post('/talk_comment/add', { talk_id: talk_id, comment:comments });
        setTalkCommentList(result.data);
        setComments("");
        setLoading(false);
      } else {
        comments.current.focus();
        setError(true);
      }
    };

    const commentClearHandler = () => {
      setComments("");
    };

    if (!isLoggedIn) {
      return (
        <TalkCommentFalseStyle>
          <div className="header">
            <p>댓글 {total}개</p>
            <div className="icon">
              <img
                onClick={() => dispatch(signInBtnIsClicked())}
                alt="unlike"
                className="unlike"
                src="/icons/unlike.svg"
              />
            </div>
          </div>
          <input disabled placeholder="로그인이 필요합니다." />
        </TalkCommentFalseStyle>
      );
    }
    return (
      <TalkCommentTrueStyle>
        <div className="header">
          <p>댓글 {total}개</p>
          <div className="icon">
            {like ? (
              <img
                onClick={() => likeHandler(true)}
                alt="like"
                className="like"
                src="/icons/like.svg"
              />
            ) : (
              <img
                onClick={() => likeHandler(false)}
                alt="unlike"
                className="unlike"
                src="/icons/unlike.svg"
              />
            )}
          </div>
        </div>
        <input
          ref={comment}
          value={comments}
          onChange={commentChangeHandler}
          className="comment_input"
          placeholder="따뜻한 말 한마디는 큰 힘이 됩니다."
          onKeyDown={(e) => {
            if (e.key === "Enter") commentAddHandler(e);
          }}
        />
        <div className="comment__buttons">
          <button className="comment__clear" onClick={commentClearHandler}>
            취소
          </button>
          <button onClick={commentAddHandler}>등록</button>
        </div>
      </TalkCommentTrueStyle>
    );
  };

  return (
    <>
      <Input/>
      <ErrorBoxStyle error={error}>{errorMsg}</ErrorBoxStyle>
    </>
  );
};

export default TalkCommentInput;
