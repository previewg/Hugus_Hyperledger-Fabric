import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { storyListLoader, storyListNumIncrease } from "../../actions/story";
import { Link } from "react-router-dom";

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
      height: 290px;
      display: flex;
      justify-self: center;
      align-self: center;
      text-decoration: none;
      .story__thumbnail {
        z-index: -1;
        width: 100%;
        height: 100%;
      }
      .story__hashtag {
        position: relative;
        left: 260px;
        top: 10px;
        color: orange;
      }
      .story__title {
        position: relative;
        top: 220px;
        right: 230px;
        font-size: 17px;
        color: white;
        font-weight: bold;
      }
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
    dispatch(storyListNumIncrease());
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

  return (
    <StoryListStyle>
      <section>
        {list.map((story, key) => {
          return (
            <Link key={key} to={`/story/${story.id}`}>
              {story.Hashtags.map((tag, key) => {
                return (
                  <span key={key} className="story__hashtag">
                    #{tag.hashtag}
                  </span>
                );
              })}
              <img
                className="story__thumbnail"
                src={
                  "http://localhost:3000/uploads/" + story.Story_Files[0].file
                }
              />
              <p className="story__title">{story.story_title}</p>
            </Link>
          );
        })}
      </section>
    </StoryListStyle>
  );
};

export default StoryList;
