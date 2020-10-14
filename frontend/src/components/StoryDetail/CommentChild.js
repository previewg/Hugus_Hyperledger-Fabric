import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { css } from "@emotion/core";

const CommentChildStyle = styled.div`
  .comment_child {
    padding: 10px;
    display: flex;
    flex-direction: column;
    font-size: 13px;
    justify-content: space-around;
    height: 45px;
    .header {
      display: flex;
      width: 200px;
      > p {
        color: black;
        font-weight: normal;
      }
      > p:nth-child(2) {
        color: gray;
        font-size: 12px;
      }
    }
    > p {
      margin: 0;
    }
  }
`;

const Loader = () => {
  return (
    <ClipLoader
      css={css`
        margin-top: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
      `}
      size={15}
      color={"#f69a53"}
      loading={true}
    />
  );
};

const CommentChild = ({ id }) => {
  const [comments, setComments] = useState({
    status: "WAITING",
    list: [],
  });
  const flag = useRef(true);

  useEffect(() => {
    if (flag.current) {
      const init = async () => {
        const result = await axios.get(`/comment/childList/${id}`);
        setComments({ status: "SUCCESS", list: result.data.list });
      };
      init();
    }
    return () => {
      flag.current = false;
    };
  }, []);

  if (comments.status === "WAITING") return <Loader />;
  return (
    <CommentChildStyle>
      {comments.list.map((re, key) => {
        return (
          <div className="comment_child" key={key}>
            <div className="header">
              <p>{re.User.nickname}</p>
              <p>{re.createdAt}</p>
            </div>
            <p>{re.comment}</p>
          </div>
        );
      })}
    </CommentChildStyle>
  );
};

export default CommentChild;
