import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import CampaignCommentChild from "./CampaignCommentChild";
import CampaignCommentChildInput from "./CampaignCommentChildInput";
import axios from "axios";
import { Link } from "react-router-dom";

const CampaignCommentListStyle = styled.section`
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
      .child_input_btn {
        margin-bottom: 5px;
        background-color: transparent;
        font-size: 13px;
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

  .back {
    margin-bottom: 50px;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    .back_btn {
      font-size: 15px;
      font-weight: bold;
      text-decoration: none;
      color: grey;
      cursor: pointer;
      transition: 0.1s ease-in-out;
      outline: none;
      :hover {
        color: orange;
      }
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

const CampaignCommentList = ({
  match,
  campaignId,
  campaignCommentList,
  setCampaignCommentList,
  commentLikenum,
  setCommentLikenum,
}) => {
  const email = useSelector((state) => state.auth.user.email);
  const data = campaignCommentList.list;
  const campaign_id = campaignId.data.id;
  const [status, setStatus] = useState("WAITING");
  const [num, setNum] = useState(2);
  const [more, setMore] = useState(campaignCommentList.more);

  const commentDeleteHandler = async (id) => {
    const confirmed = window.confirm("삭제하시겠습니까?");
    if (confirmed) {
      const result = await axios.post("/campaign_comment/delete", {
        comment_id: id,
        campaign_id: campaign_id,
      });
      setCampaignCommentList(result.data);
    }
  };

  const CampaignCommentChildMain = ({ comment }) => {
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

        {status && <CampaignCommentChild id={comment.id} />}
      </>
    );
  };

  const loadMore = async () => {
    const id = campaign_id;
    const comment = await axios.get(`/campaign_comment/list/${id}/${num}`);
    const newCommentList = campaignCommentList.list.concat(comment.data.list);

    campaignCommentList.list = newCommentList;
    setCampaignCommentList(campaignCommentList);
    if (comment.data.more === true) {
      setNum((num) => num + 1);
      setMore(true);
    } else {
      setMore(false);
    }
    setStatus("SUCCESS");
  };

  return (
    <CampaignCommentListStyle>
      {campaignCommentList.list !== 0 &&
        data.map((comment, key) => {
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
                <CampaignCommentChildInput
                  comment={comment}
                  campaign_id={campaign_id}
                  setCampaignCommentList={setCampaignCommentList}
                  commentLikenum={commentLikenum}
                  setCommentLikenum={setCommentLikenum}
                />
                <CampaignCommentChildMain comment={comment} />
              </div>
            </article>
          );
        })}

      {more && (
        <div className="bottom">
          <p onClick={loadMore}>댓글 더보기</p>
        </div>
      )}

      <div className="back">
        <Link className="back_btn" to="/">
          글목록
        </Link>
      </div>
    </CampaignCommentListStyle>
  );
};

export default CampaignCommentList;
