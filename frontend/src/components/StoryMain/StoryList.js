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

    a {
      width: 290px;
      height: 290px;
      text-decoration: none;
      background-size: cover;
      background-position: center center;
      background-repeat: no-repeat;

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
    }

    .more__info {
      width: 290px;
      height: 290px;
      display: none;
    }
  }
`;

const StoryList = () => {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.story.list.status);
  const list = useSelector((state) => state.story.list.data);
  const num = useSelector((state) => state.story.list.num);
  const [hover, setHover] = useState({
    key: 0,
    turn: "child",
    status: false,
  });

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

  return (
    <StoryListStyle hover={hover}>
      <section>
        {list.map((story, key) => {
          if (story.Story_Files[0]) {
            return (
              <>
                <Link
                  onClick={() => visitHandler(story.id)}
                  key={key}
                  to={`/story/${story.id}`}
                  style={{
                    backgroundImage: `url("http://localhost:3000/uploads/${story.Story_Files[0].file}") `,
                  }}
                >
                  <div className="story__hashtag">
                    {story.Hashtags.map((tag, key) => {
                      return <p key={key}>#{tag.hashtag}</p>;
                    })}
                  </div>

                  <p className="story__title">{story.story_title}</p>
                </Link>
                <div className="more__info"></div>
              </>
            );
          } else {
            return (
              <>
                <Link
                  onClick={() => visitHandler(story.id)}
                  key={key}
                  to={`/story/${story.id}`}
                  style={{
                    backgroundImage: `url("http://localhost:3000/HUGUS.png") `,
                  }}
                >
                  <div className="story__hashtag">
                    {story.Hashtags.map((tag, key) => {
                      return <p key={key}>#{tag.hashtag}</p>;
                    })}
                  </div>

                  <p className="story__title">{story.story_title}</p>
                </Link>
                <div className="more__info"></div>
              </>
            );
          }
        })}
        {Loader()}
      </section>
    </StoryListStyle>
  );
};

export default StoryList;
