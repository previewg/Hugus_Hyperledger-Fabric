import React, { useRef, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import styled from "styled-components";
import axios from 'axios';

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

const CommentChild = ({id}) => {
  const dispatch = useDispatch();
  // const reComment = useSelector((state) => state.comment.list.reComment);
  // const [error, setError] = useState(false);
  // const comment_child = useRef();
  const [comments_child, setComments_child] = useState("");

  const onClickHandler = async () => {
    await axios
    .get(`/comment/childList/${id}`)
    .then((response) => {
      setComments_child(response.data)
    })
    .catch((error) => {
      console.error(error);
    });
  }
  

  const List = () => {
    return (comments_child.map((reComment,key) => {
    return (
      <div className="comment" key={key}>
        <a>{reComment[0].comment}</a>
        <p>bbbbbbbbbbb</p>
      </div>
    );
  })
  );
 };

  return (
    <CommentChildStyle>
      <p onClick={onClickHandler}>답글 몇개</p>
      <List/>
    </CommentChildStyle>
  );
};

export default CommentChild;
