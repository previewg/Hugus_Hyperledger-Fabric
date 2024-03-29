import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { commentDelete, commentListLoader } from "../../actions/comment";
import CommentChild from "../../components/StoryDetail/CommentChild";
import CommentChildInput from "./CommentChildInput";
import { Link } from "react-router-dom";

const CommentListStyle = styled.section`
  display: flex;
  flex-direction: column;

  article {
    display: flex;
    margin-bottom: 30px;
    .comment_icon {
      width: 40px;
      height: 40px;
      background-size: cover;
      background-position: center center;
      background-repeat: no-repeat;
      border-radius: 20px;
      margin-right: 15px;
    }

    .comment {
      width: 100%;
      .header {
        font-size: 14px;
        color: orange;
        display: flex;
        justify-content: space-between;
        font-weight: bold;
        align-items: center;
        height: 15px;
        div {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          button {
            background-color: transparent;
            font-size: 12px;
            width: 50px;
            height: 30px;
            cursor: pointer;
            outline: none;
            border: none;
            color: black;
            transition: 0.2s ease-in-out;
            :hover {
              color: orange;
            }
          }
          .date {
            color: #a5a5a5;
            font-size: 13px;
            font-weight: normal;
            margin: 0;
          }
        }
      }
      > p {
        font-size: 14px;
        margin: 0;
        margin-top: 10px;
      }

      .child_count {
        color: #0088ff;
        font-size: 13px;
        cursor: pointer;
        width: 100px;
      }
      .comment_child_btn {
        background-color: transparent;
        font-size: 13px;
        margin-bottom: 5px;
        width: 50px;
        height: 15px;
        cursor: pointer;
        outline: none;
        border: none;
        color: gray;
        transition: 0.2s ease-in-out;
        :hover {
          color: orange;
        }
      }
    }

    .comment_child_input {
      width: 100%;
      display: flex;
      flex-direction: column;
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
    }
  }

  .bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    p {
      cursor: pointer;
      color: gray;
    }
    a {
      text-decoration: none;
      color: black;
    }
  }
`;

const time = (value) => {
  const now = new Date();
  const timeValue = new Date(value);

  const betweenTime = Math.floor(
    (now.getTime() - timeValue.getTime()) / 1000 / 60
  );
  if (betweenTime < 1) return "방금전";
  if (betweenTime < 60) {
    return `${betweenTime}분전`;
  }

  const betweenTimeHour = Math.floor(betweenTime / 60);
  if (betweenTimeHour < 24) {
    return `${betweenTimeHour}시간전`;
  }

  const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
  if (betweenTimeDay < 365) {
    return `${betweenTimeDay}일전`;
  }

  return `${Math.floor(betweenTimeDay / 365)}년전`;
};

const CommentList = ({ commentList, data, num }) => {
  const dispatch = useDispatch();
  const email = useSelector((state) => state.auth.user.email);
  const more = useSelector((state) => state.comment.list.more);

  const commentDeleteHandler = (id) => {
    const confirmed = window.confirm("삭제하시겠습니까?");
    if (confirmed) {
      dispatch(commentDelete({ comment_id: id, story_id: data.id }));
    }
  };

  const CommentChildMain = ({ comment }) => {
    const [status, setStatus] = useState(false);
    const onClickHandler = () => {
      if (status) setStatus(false);
      else setStatus(true);
    };

    return (
      <>
        {comment.child_count !== 0 && !status && (
          <p className="child_count" onClick={onClickHandler}>
            답글 {comment.child_count}개 보기
          </p>
        )}
        {comment.child_count !== 0 && status && (
          <p className="child_count" onClick={onClickHandler}>
            답글 {comment.child_count}개 숨기기
          </p>
        )}
        {status && <CommentChild id={comment.id} />}
      </>
    );
  };

  const loadMore = () => {
    dispatch(commentListLoader(data.id, num));
  };

  return (
    <CommentListStyle>
      {commentList.map((comment, key) => {
        return (
          <article key={key}>
            {comment.User.user_profile ? (
              <div
                className="comment_icon"
                style={{
                  backgroundImage: `url("${comment.User.user_profile}") `,
                }}
              ></div>
            ) : (
              <img
                className="comment_icon"
                alt="comment_icon"
                src="/icons/hugus_icon.png"
              />
            )}

            <div className="comment">
              <div className="header">
                <a>{comment.User.nickname}</a>
                <div>
                  {email == comment.user_email && (
                    <button onClick={() => commentDeleteHandler(comment.id)}>
                      삭제
                    </button>
                  )}
                  <p className="date">{time(comment.createdAt)}</p>
                </div>
              </div>
              <p>{comment.comment}</p>
              <CommentChildInput comment={comment} story_id={data.id} />
              <CommentChildMain comment={comment} />
            </div>
          </article>
        );
      })}
      <div className="bottom">
        {more ? <p onClick={loadMore}>댓글 더보기</p> : <p></p>}
        <Link className="back_btn" to="/story">
          글목록
        </Link>
      </div>
    </CommentListStyle>
  );
};

export default CommentList;
