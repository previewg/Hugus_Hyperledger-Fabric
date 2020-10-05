import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {like, storyLike, storyLoader} from "../actions/story";
import { css } from "@emotion/core";
import { SyncLoader } from "react-spinners";
import { commentAdd } from "../actions/comment";

const StoryDetailStyle = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 70px;
  align-items: center;
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
      }
    }

    .content {
      margin-top: 50px;
      p:nth-child(1) {
        font-weight: bold;
      }
      p:nth-child(2) {
      }
    }

    .items {
      font-weight: bold;
      margin-top: 35px;
      .item {
        margin-right: 10px;
        font-weight: normal;
        color: orange;
      }
    }

    .hashtags {
      font-weight: bold;
      margin-top: 35px;
      .tag{
        margin-right: 10px;
        font-weight: normal;
        color: orange;
      }
    }
    
    .visited{
      margin-top: 50px;
      display: flex;
      justify-content: flex-end;
      font-size: 13px;
      >p{
        margin: 0;
        margin-left: 10px;
      }
    }

    .comment__false {
      font-weight: bold;
      display: flex;
      flex-direction: column;
      .header {
        display: flex;
        justify-content: space-between;
        .icon {
          display: flex;
          > img {
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
const StoryDetail = ({ match }) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.story.detail.data);
  const status = useSelector((state) => state.story.detail.status);
  const isLoggedIn = useSelector(
    (state) => state.authentication.status.isLoggedIn
  );

  useEffect(() => {
    dispatch(storyLoader(match.params.id));
  }, []);

  const comment = useRef();
  // const addStatus = useSelector((state) => state.comments.add.status);
  const errorMsg = "댓글을 입력하세요";

  const [comments, setComments] = useState("");
  const [error,setError] = useState(false)

  const commentAddHandler = () => {
    if (comments==="") {
      comment.current.focus();
    }else{
      dispatch(commentAdd({comment:comments,story_id:data.id}))
      
    }
  };

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

  const onChangeHandler = (e) => {
       setComments(e.target.value)
       console.log(e);
  }

  const likeHandler = (status) => {
    dispatch(storyLike(data.id,status))
  }

  const Comment = () => {
    if (!isLoggedIn) {
      return (
        <div className="comment__false">
          <div className="header">
            <p>댓글</p>
            <div className="icon">
              <img alt="unlike" className="unlike" src="/icons/unlike.svg" />
              <img alt="share" className="share" src="/icons/share.svg" />
            </div>
          </div>
          <input disabled placeholder="로그인이 필요합니다." />
          <div></div>
        </div>
      );
    } else {
      return (
        <div className="comment__true">
          <div className="header">
            <p>댓글</p>
            <div className="icon">
              {data.Story_Likes[0].like ? <img onClick={()=>likeHandler(true)} alt="like" className="like" src="/icons/like.svg" />:<img  onClick={()=>likeHandler(false)} alt="unlike" className="unlike" src="/icons/unlike.svg" />}
              <img alt="share" className="share" src="/icons/share.svg" />
            </div>
          </div>
          <input value={comments} onChange={onChangeHandler} className="comment_input" placeholder="따뜻한 말 한마디는 큰 힘이 됩니다." />
          <div className="comment__buttons">
            <button className="comment__clear">취소</button>
            <button
            onClick={commentAddHandler}>등록</button>
          </div>


          <div>

          </div>
        </div>
        
      );
    }
  };

  if (status !== "SUCCESS") return Loader();
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
            {data.Items.map((item, key) => {
              return (
                <span className="item" key={key}>
                  {item.item}
                </span>
              );
            })}
          </div>

          <div className="hashtags">
            <p>태그</p>
            {data.Hashtags.map((tag, key) => {
              return (
                  <span className="tag" key={key}>
                  {tag.hashtag}
                </span>
              );
            })}
          </div>
          <div className="visited">
            <p>좋아요</p>
            <p>조회수 {data.visited}</p>
          </div>
          {Comment()}
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
};
export default StoryDetail;
