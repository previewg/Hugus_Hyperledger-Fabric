import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import StoryVote from "./StoryVote";
import { storyDelete, storyUpdateStatusChanged } from "actions/story";
import StorySlider from "./StorySlider";

const StoryContentsStyle = styled.div`
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

  .if_owner {
    margin-top: 10px;
    display: flex;
    justify-content: flex-end;
    button {
      border: none;
      outline: none;
      cursor: pointer;
      margin-left: 5px;
      background: none;
      :hover {
        font-weight: bold;
        color: orange;
      }
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
        margin-bottom: 0;
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
`;

const StoryContents = ({ data, history }) => {
  const dispatch = useDispatch();
  const likeNum = useSelector((state) => state.story.like.likeNum);
  const email = useSelector((state) => state.auth.user.email);
  const totalPrice = () => {
    let total = 0;
    data.Story_Items.map((item) => {
      total += item.item_price * item.item_quantity;
    });
    return total;
  };

  const IfOwner = () => {
    const onDeleteHandler = () => {
      const confirmed = window.confirm("삭제하시겠습니까?");
      if (confirmed) {
        dispatch(storyDelete(data.id, history));
      }
    };

    const onUpdateHandler = () => {
      history.push(`/story/update/${data.id}`);
    };

    if (data.user_email === email)
      return (
        <div className="if_owner">
          <button onClick={onUpdateHandler}>수정</button>
          <button onClick={onDeleteHandler}>삭제</button>
        </div>
      );
    return null;
  };

  return (
    <StoryContentsStyle>
      <div className="title">
        <p>{data.story_title}</p>
        <p>{data.User.nickname}님</p>
      </div>
      <IfOwner />
      <div className="info">
        <p>작성자 소개</p>
        <p>{data.user_info}</p>
      </div>

      <StorySlider files={data.Story_Files} />

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
                ✔ {item.item_name} ({item.item_price.toLocaleString()} 원 X{" "}
                {item.item_quantity.toLocaleString()} 개)
              </p>
            );
          })}
          <p className="total_price">합계 {totalPrice().toLocaleString()}원</p>
        </div>
      </div>

      <div className="hashtags">
        <p>태그</p>
        {data.Hashtags.map((tag, key) => {
          return (
            <span
              className="tag"
              key={key}
              onClick={() => history.push(`/search/${tag.hashtag}`)}
            >
              #{tag.hashtag}
            </span>
          );
        })}
      </div>
      <StoryVote data={data} />
      <div className="visited">
        <p>좋아요 {likeNum}</p>
        <p>조회수 {data.visited}</p>
      </div>
    </StoryContentsStyle>
  );
};

export default StoryContents;
