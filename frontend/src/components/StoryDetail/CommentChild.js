import React, { useRef, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import styled from "styled-components";
import { commentChildAdd } from "../../actions/comment";

const CommentChildStyle = styled.div`
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
`;

const CommentChild = ({ commentList }) => {
  const dispatch = useDispatch();
  // const reComment = useSelector((state) => state.comment.list.reComment);

  const [error, setError] = useState(false);
  const [comments_child, setComments_child] = useState("");
  const comment_child = useRef();
  const onCommentChangeHandler = (e) => {
    setComments_child(e.target.value);
    setError(false);
  };
  const commentChildClear = () => {
    setComments_child("");
  };

  const commentChildAddHandler = (id) => {
    if (comments_child === "") {
      comment_child.current.focus();
      setError(true);
    } else {
      dispatch(
        commentChildAdd({ comment: comments_child, comment_id: id })
      ).then(setComments_child(""));
    }
  };

  return (
    <CommentChildStyle>
      <input
        ref={comment_child}
        value={comments_child}
        onChange={onCommentChangeHandler}
        className="comment_child_input"
        placeholder="따뜻한 말 한마디는 큰 힘이 됩니다."
        onKeyDown={(e) => {
          if (e.key === "Enter") commentChildAddHandler(e);
        }}
      />
      <div className="comment__buttons">
        <button className="commentChild__clear" onClick={commentChildClear}>
          취소
        </button>
        <button onClick={() => commentChildAddHandler()}>등록</button>
      </div>
      
      
    </CommentChildStyle>
  );
};
export default CommentChild;
