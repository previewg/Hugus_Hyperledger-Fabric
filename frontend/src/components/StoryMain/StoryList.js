import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { storyListLoader, storyVisit } from "../../actions/story";
import { Link } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import { css } from "@emotion/core";

const StoryListStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 70px;
  section {
    width: 900px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    gap: 30px;
    > a {
      width: 290px;
      height: 290px;
      box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
      display: flex;
      text-decoration: none;
      background-size: cover;
      background-position: center center;
      background-repeat: no-repeat;
      > div {
        min-width: 100%;
        height: 100%;
        .story__hashtag {
          color: orange;
          display: flex;
          justify-content: flex-end;
          width: 100%;
          > p {
            margin-right: 10px;
            font-size: 14px;
          }
        }
        .story__title {
          position: relative;
          top: 180px;
          left: 20px;
          font-size: 17px;
          color: white;
        }
        .background {
          width: 100%;
          height: 100%;
          position: relative;
          top: -106px;
          left: 0;
          background: black;
          opacity: 0;
        }
      }
      .more__info {
        color: white;
        min-width: 100%;
        height: 100%;
        display: none;
        background-color: rgba(0, 0, 0, 0.3);
        > div {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          padding: 5px;
          img {
            width: 20px;
          }
          p {
            font-size: 12px;
            padding: 5px;
          }
        }
        > p {
          padding-left: 15px;
          padding-right: 15px;
        }
      }

      :hover {
        > div {
          display: none;
        }
        .more__info {
          display: flex;
          flex-direction: column;
        }
      }
    }
  }
`;

const BarStyle = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;
  top: 170px;
  div {
    width: 90%;
    display: flex;
    background-color: #e7e7e7;
    border-radius: 10px;
    height: 5px;
    transition: all 0.7s ease-in-out;
    > div {
      height: 5px;
      background-color: orange;
      border-radius: 10px;
      font-size: 13px;
      ${(props) => `width:${props.ratio}%`};
    }
  }
`;

const StoryList = () => {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.story.list.status);
  const list = useSelector((state) => state.story.list.data);
  const num = useSelector((state) => state.story.list.num);

  useEffect(() => {
    dispatch(storyListLoader(1));
    // scroll event listener 등록
    window.addEventListener("scroll", handleScroll);
    return () => {
      // scroll event listener 해제
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const loadMore = () => {
    dispatch(storyListLoader(num));
  };

  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight && status !== "WAITING") {
      loadMore();
    }
  };

  const Loader = () => {
    if (status === "WAITING")
      return (
        <SyncLoader
          css={css`
            height: 100%;
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

  const visitHandler = (id) => {
    dispatch(storyVisit(id));
  };

  const progressBar = (vote, goal) => {
    let ratio = (vote / goal) * 100;
    if (ratio > 100) ratio = 100;
    return (
      <BarStyle ratio={ratio}>
        <div>
          <div></div>
        </div>
      </BarStyle>
    );
  };

  return (
    <StoryListStyle>
      <section>
        {list.map((story, key) => {
          if (story.Story_Files[0]) {
            return (
              <Link
                to={`/story/${story.id}`}
                style={{
                  backgroundImage: `url("http://localhost:3000/uploads/${story.Story_Files[0].file}") `,
                }}
              >
                <div
                  onClick={() => visitHandler(story.id)}
                  key={key}
                  to={`/story/${story.id}`}
                >
                  <div className="story__hashtag">
                    {story.Hashtags.map((tag, key) => {
                      return <p key={key}>#{tag.hashtag}</p>;
                    })}
                  </div>

                  <p className="story__title">{story.story_title}</p>
                  {progressBar(story.story_vote, story.story_goal)}
                </div>
                <div className="more__info">
                  <div>
                    <img src="/icons/love.svg" />
                    <p>{story.story_like}</p>
                    <img src="/icons/comment.svg" />
                  </div>
                  <p>{story.user_info}</p>
                </div>
              </Link>
            );
          } else {
            return (
              <Link
                to={`/story/${story.id}`}
                style={{
                  backgroundImage: `url("http://localhost:3000/HUGUS.png") `,
                }}
              >
                <div onClick={() => visitHandler(story.id)} key={key}>
                  <div className="story__hashtag">
                    {story.Hashtags.map((tag, key) => {
                      return <p key={key}>#{tag.hashtag}</p>;
                    })}
                  </div>

                  <p className="story__title">{story.story_title}</p>
                  {progressBar(story.story_vote, story.story_goal)}
                </div>
                <div className="more__info">
                  <div>
                    <img src="/icons/love.svg" />
                    <p>{story.story_like}</p>

                    <img src="/icons/comment.svg" />
                  </div>
                  <p>{story.user_info}</p>
                </div>
              </Link>
            );
          }
        })}
        {Loader()}
      </section>
    </StoryListStyle>
  );
};

export default StoryList;
