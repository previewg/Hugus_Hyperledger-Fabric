import React, { useRef, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { commentChildAdd,commentDelete } from "../../actions/comment";
import CommentChild  from "../../components/StoryDetail/CommentChild";

const CommentListStyle = styled.div`
  .comment {
    position: relative;
    /* overflow: hidden; */
    margin-bottom: 20px;
    background-color: #fdfaf5;
    padding: 15px;
    padding-right: 20px;
    padding-left: 20px;

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
    .like_group {
      display: flex;
      align-items: center;
      margin-top: 5px;
      height: 25px;
      summary {
        list-style: none;
        font-size: 12px;
        cursor: pointer;
        color: grey;
      }
      summary::-webkit-details-marker {
        display: none;
      }
      > img {
        width: 17px;
        height: 17px;
        cursor: pointer;
        margin-right: 7px;
      }
      img:nth-child(2) {
        display: none;
      }
      img:nth-child(4) {
        display: none;
      }

      input {
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
      p {
        background-color: transparent;
          margin-left: 7px;
          font-size: 14px;
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
    .comment_group {
          
            div {
              display: flex;
              width:100%;
            >input {
              width:100%;
              padding: 10px;
              height: 15px;
              padding: 7px;
              outline: none;
              transition: 0.4s ease-in-out;
              border: none;
              border-bottom: solid gray 0.1px;
              :focus {
                border-bottom: solid orange 0.1px;
                 }
              }
            }
            div {
                margin-top:10px;
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
`;

const CommentList = ({ commentList, data }) => {
  const dispatch = useDispatch();
  // const reComment = useSelector((state) => state.comment.list.reComment);
  const [error, setError] = useState(false);
  const [comments_child, setComments_child] = useState("");
  const comment_child = useRef();
  const current_user = useSelector(
    (state) => state.authentication.status.currentUser
  );

  const commentDeleteHandler = (id) => {
    const confirmed = window.confirm("삭제하시겠습니까?");
    if (confirmed) {
      dispatch(commentDelete({ comment_id: id, story_id: data.id }));
    }
  };

  const onCommentChangeHandler = (e) => {
    setComments_child(e.target.value);
    setError(false);
  };

  const commentChildClear = () => {
    setComments_child("");
  };

  const commentChildAddHandler = (id) => {
      dispatch(
        commentChildAdd({ comment: comments_child, comment_id: id })
      ).then(setComments_child(""));
  };

  const commentChildInput = () => {
  };

  return (
    <CommentListStyle>
      {commentList.map((comment, key) => {
        return (
          <div className="comment" key={key}>
            <div className="header">
              <a>{comment.User.nickname}</a>
              <div>
                {current_user == comment.User.nickname && (
                  <button onClick={() => commentDeleteHandler(comment.id)}>
                    삭제
                  </button>
                )}
                <p className="date">{comment.createdAt}</p>
              </div>
            </div>
            <p>{comment.comment}</p>
            <div className="like_group">
              <img className="like_normal" src="/icons/like_normal.png" />
              <img className="liked" src="/icons/like.png" />
              <img className="disLike_normal" src="/icons/disLike_normal.png" />
              <img className="disLiked" src="/icons/disLike.png" />
              <p onClick={commentChildInput}
              >답글</p>
            </div>

            <div className="comment_group">
                  <img/>
                  
                  <div className="댓글추가">
                  <input 
                  ref={comment_child}
                  value={comments_child}
                  onChange={onCommentChangeHandler}
                  placeholder="따뜻한 말 한마디는 큰 힘이 됩니다."
                  onKeyDown={(id) => {
                  if (id.key === "Enter") commentChildAddHandler(comment.id);
                  }}
                  placeholder="따뜻한 말 한마디는 큰 힘이 됩니다."
                  />
                  </div>

                  <div className="취소랑 등록버튼">
                  <button onClick={commentChildClear}>취소</button>
                  <button onClick={() => commentChildAddHandler(comment.id)}>등록</button>
                  </div>


                  <CommentChild id={comment.id}/>
            </div>



          </div>
        );
      })}
    </CommentListStyle>
  );
};

export default CommentList;
