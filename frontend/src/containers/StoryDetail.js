import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { css } from "@emotion/core";
import { SyncLoader } from "react-spinners";
import { storyLoader, storyLoadInit } from "../actions/story";
import { commentListLoader } from "../actions/comment";
import StoryContents from "../components/StoryDetail/StoryContents";
import Comments from "../components/StoryDetail/Comments";
import Back from "../components/StoryDetail/Back";

const StoryDetailStyle = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 70px;
  align-items: center;
<<<<<<< HEAD
  .layout {
    margin-top: 100px;
    width: 700px;
    display: flex;
    flex-direction: column;

    .title {
      margin-top: 50px;
      width: 100%;
      display: flex;
      flex-direction: column;
      border-bottom: solid orange 0.1px;
      p:nth-child(1) {
        font-weight: bold;
        font-size: 25px;
        position: relative;
        left: 30px;
      }
      p:nth-child(2) {
        text-align: right;
      }
    }

    .info {
      margin-top: 50px;
      p:nth-child(1) {
        font-weight: bold;
      }
      p:nth-child(2) {
        border: solid 0.1px lightgray;
        padding: 15px;
        padding-left: 20px;
      }
    }

    .content {
      margin-top: 50px;
      p:nth-child(1) {
        font-weight: bold;
      }
      p:nth-child(2) {
        border: solid 0.1px lightgray;
        padding: 15px;
        padding-left: 20px;
      }
    }

    .items {
      font-weight: bold;
      margin-top: 35px;
      .item {
        font-weight: normal;
        font-size: 14px;
        background-color: #fff7ef;
        padding: 1rem;
        p {
          margin: 0;
          margin-bottom: 10px;
        }
        p:nth-last-child(1) {
          margin-bottom: 0px;
        }
        .total_price {
          text-align: end;
        }
      }
    }

    .hashtags {
      font-weight: bold;
      margin-top: 35px;
      .tag {
        padding: 8px;
        padding-left: 13px;
        padding-right: 13px;
        border-radius: 5px;
        margin-right: 10px;
        font-weight: normal;
        font-size: 13px;
        color: #ffa400;
        background-color: #fff7ef;
        transition: 0.3s ease-in-out;
        cursor: pointer;
        :hover {
          background-color: #ffc048;
          color: white;
        }
      }
    }

    .vote {
      font-size: 14px;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 50px;
      button {
        width: 150px;
        height: 35px;
        background-color: transparent;
        border: solid 0.1px dodgerblue;
        cursor: pointer;
        font-weight: bold;
        color: dodgerblue;
        transition: 0.3s ease-in-out;
        border-radius: 5px;
        outline: none;
        :hover {
          background-color: dodgerblue;
          color: white;
          transform: scale(1.2);
        }
      }
      .vote_true {
        border: solid 0.1px #ff4949;
        color: #ff4949;
        :hover {
          background-color: #ff4949;
        }
      }
      strong:nth-child(2) {
        color: hotpink;
      }
    }

    .visited {
      margin-top: 50px;
      display: flex;
      justify-content: flex-end;
      font-size: 13px;
      > p {
        margin: 0;
        margin-left: 10px;
      }
    }

    .comment__false {
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
    }

    .comment__true {
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
    }

    .back {
      margin-top: 35px;
      display: flex;
      justify-content: flex-end;
      align-items: center;

      .back_btn {
        position: absolute;
        color: black;
        text-decoration: none;
        margin-top: 15px;
        border: none;
        background: white;
        outline: none;
        cursor: pointer;
        font-weight: bold;
        transition: 0.2s ease-in-out;
        :hover {
          color: orange;
        }
      }
    }

    .comment {
      position: relative;
      overflow: hidden;
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
const BarStyle = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
=======
>>>>>>> 19a31e08e139c0740863417238fe0cdfc5370a03
  flex-direction: column;
`;

const StoryDetail = ({ match }) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.story.detail.data);
  const status = useSelector((state) => state.story.detail.status);

  useEffect(() => {
    dispatch(storyLoader(match.params.id));
    dispatch(commentListLoader(match.params.id));
    return () => dispatch(storyLoadInit());
  }, []);

  const Loader = () => {
    return (
      <SyncLoader
        css={css`
          height: 100vh;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        `}
        size={10}
        color={"#f69a53"}
        loading={true}
      />
    );
  };

  if (status !== "SUCCESS") return Loader();
<<<<<<< HEAD
  else
    return (
      <>
        <StoryDetailStyle>
          <div className="layout">
            <div className="title">
              <p>{data.story_title}</p>
              <p>{data.User.nickname}님</p>
            </div>
            <div className="info">
              <p>작성자 소개</p>
              <p>{data.user_info}</p>
            </div>

            <div className="content">
              <p>내용</p>
              <p>{data.story_content}</p>
            </div>

            <div className="items">
              <p>저는 이런것들이 필요합니다</p>
              <div className="item">
                {data.Story_Items.map((item, key) => {
                  return (
                    <p key={key}>
                      ✔ {item.item_name} ({item.item_price.toLocaleString()} 원
                      X {item.item_quantity.toLocaleString()} 개)
                    </p>
                  );
                })}
                <p className="total_price">
                  합계 {totalPrice().toLocaleString()}원
                </p>
              </div>
            </div>

            <div className="hashtags">
              <p>태그</p>
              {data.Hashtags.map((tag, key) => {
                return (
                  <span className="tag" key={key}>
                    #{tag.hashtag}
                  </span>
                );
              })}
            </div>
            <div className="vote">
              {progressBar()}
              {voteButton()}

              <p>
                <strong>필요 득표수</strong>를 충족할 시, 메인 캠페인으로
                등록되며 <strong>실제 모금</strong>이 이루어집니다.
              </p>
            </div>
            <div className="visited">
              <p>좋아요 {like.likeNum}</p>
              <p>조회수 {data.visited}</p>
            </div>
            {Comment()}
            {commentList.map((comment, key) => {
              return (
                <div className="comment" key={key}>
                  <div className="header">
                    <a>{comment.User.nickname}</a>

                    <div>
                      {current_user == comment.User.nickname && (
                        <button
                          onClick={() => commentDeleteHandler(comment.id)}
                        >
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
                    <img
                      className="disLike_normal"
                      src="/icons/disLike_normal.png"
                    />
                    <img className="disLiked" src="/icons/disLike.png" />

                    {isLoggedIn && (
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
                          <button
                            className="commentChild__clear"
                            onClick={commentChildClear}>
                            취소
                          </button>
                          <button onClick={ () => commentChildAddHandler(comment.id)}>등록</button>
                        </div>
                      </details>
                    )}
                    <div>
                        <p>{comment.User.nickname}</p>
                        <p>{commentList[0].comment}</p>
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="back">
              <Link className="back_btn" to="/story">
                글목록
              </Link>
            </div>
          </div>
        </StoryDetailStyle>
        <ErrorBoxStyle error={error}>{errorMsg}</ErrorBoxStyle>
      </>
    );
=======
  return (
    <StoryDetailStyle>
      <StoryContents data={data} />
      <Comments data={data} />
      <Back />
    </StoryDetailStyle>
  );
>>>>>>> 19a31e08e139c0740863417238fe0cdfc5370a03
};
export default StoryDetail;
