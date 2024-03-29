import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { css } from "@emotion/core";

const CommentChildStyle = styled.section`
  .comment_child {
    display: flex;
    margin: 0;
    align-items: center;
    .comment_child_icon {
      width: 40px;
      height: 40px;
      background-size: cover;
      background-position: center center;
      background-repeat: no-repeat;
      border-radius: 20px;
      margin-right: 10px;
    }

    .comment_child_content {
      padding: 10px;
      display: flex;
      flex-direction: column;
      font-size: 13px;
      justify-content: space-around;
      height: 45px;
      .header {
        display: flex;
        > p {
          color: black;
          font-weight: normal;
          margin-right: 10px;
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

const TalkCommentChild = ({ id }) => { 
  const init = useRef(true);
  const [comments, setComments] = useState({ status: "WAITING" });
  const [childList, setChildList] = useState([]);

  useEffect(() => {
    const initFunc = async () => {
      const comment = await axios.get(`/talk_comment/childList/${id}`);
      setChildList(comment.data);
      setComments("SUCCESS");
    };
    if (init.current) {
      init.current = false;
    initFunc();
    }
  }, []);

  if (comments.status === "WAITING") return <Loader />;
  return (
    <CommentChildStyle>
      {childList.list.length !== 0 && childList.list.map((re, key) => {
        return (
          <article className="comment_child" key={key}>
            {re.User.user_profile ? (
              <div
                className="comment_child_icon"
                style={{
                  backgroundImage: `url("${re.User.user_profile}") `,
                }}
              ></div>
            ) : (
              <img
                className="comment_child_icon"
                alt="comment_icon"
                src="/icons/hugus_icon.png"
              />
            )}
            <div className="comment_child_content">
              <div className="header">
                <p>{re.User.nickname}</p>
                <p>{time(re.createdAt)}</p>
              </div>
              <p>{re.comment}</p>
            </div>
          </article>
        );
      })}
    </CommentChildStyle>
  );
};

export default TalkCommentChild;
