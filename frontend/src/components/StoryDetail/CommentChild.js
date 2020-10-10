import React, { useRef, useState } from "react";
import styled from "styled-components";
import { commentChildAdd } from "../../actions/comment";

const CommentChild = () => {
  const [comments_child, setComments_child] = useState("");
  const comment_child = useRef();

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
    <details>
      <summary>답글</summary>

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
        <button onClick={() => commentChildAddHandler(comment.id)}>등록</button>
      </div>
    </details>
  );
};

export default CommentList;
