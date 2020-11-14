import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import CountUp from "react-countup";
import Loader from "./Loader";

const StoryListStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 70px;
  section {
    margin-bottom: 50px;
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
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        min-width: 100%;
        height: 100%;
        align-items: center;
        background: linear-gradient(
          0deg,
          rgba(0, 0, 0, 0.6),
          rgba(0, 0, 0, 0.5) 10%,
          rgba(0, 0, 0, 0.4) 20%,
          rgba(0, 0, 0, 0.3) 30%,
          rgba(0, 0, 0, 0.2) 40%,
          rgba(0, 0, 0, 0.1) 50%,
          transparent
        );
        .story__hashtag {
          color: orange;
          display: flex;
          justify-content: flex-end;
          width: 100%;
          height: 20%;
          > p {
            margin-right: 10px;
            font-size: 14px;
          }
        }
        .story__title {
          margin: 0;
          font-size: 17px;
          color: white;
          width: 270px;
          height: 60%;
          display: flex;
          align-items: flex-end;
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
          width: 90%;
          height: 20%;
          img {
            width: 20px;
          }
          > p {
            font-size: 12px;
            padding: 5px;
          }
        }
        > p {
          width: 90%;
          height: 60%;
          margin: 0;
        }
      }

      :hover {
        > div {
          display: none;
        }
        .more__info {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
        }
      }
    }
  }
`;
const BarStyle = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  .count {
    width: 90%;
    background: transparent;
    margin: 0;
    font-size: 13px;
    color: white;
    display: flex;
    justify-content: flex-end;
  }
  div {
    width: 90%;
    display: flex;
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 10px;
    height: 5px;
    transition: all 2s ease-in-out;

    > div {
      height: 5px;
      background-color: white;
      border-radius: 10px;
      font-size: 13px;
      ${(props) => `width:${props.ratio}%`};
    }
  }
`;

const ThereIsNoFavorite = styled.p`
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  color: gray;
`;

const StoryList = ({ storyType, changed, setChanged }) => {
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const init = useRef(true);

  const visitHandler = async (story_id) => {
    await axios.put("/story/visit", { story_id: story_id });
  };

  const ProgressBar = ({ vote, goal }) => {
    const [ratio, setRatio] = useState(0);

    useEffect(() => {
      const init = setTimeout(() => {
        if (vote > goal) setRatio(100);
        setRatio((vote / goal) * 100);
      });
      return () => clearTimeout(init);
    }, []);

    return (
      <BarStyle ratio={ratio}>
        <div className="count">
          <CountUp end={ratio} duration={2} />
          <span> %</span>
        </div>
        <div>
          <div></div>
        </div>
      </BarStyle>
    );
  };

  const UserInfo = ({ story }) => {
    if (story.user_info.length > 100)
      return <p>{story.user_info.substr(0, 100)}...</p>;
    return <p>{story.user_info}</p>;
  };

  const LoadHandler = ({ storyType }) => {
    const loadInit = async () => {
      setLoading(true);
      const initData = await axios.get(`/story/list/1?type=${storyType}`);
      setList(initData.data.list);
      if (initData.data.more || initData.data.list.length % 9 === 0) {
        setPage(page + 1);
      }
      setLoading(false);
    };

    const loadMore = async () => {
      setLoading(true);
      const moreData = await axios.get(`/story/list/${page}?type=${storyType}`);
      if (list.length % 9 !== 0) {
        let len = (page - 1) * 9;
        let newData = list.slice(0, len).concat(moreData.data.list);
        setList(newData);
      } else {
        let newData = list.concat(moreData.data.list);
        setList(newData);
      }
      if (moreData.data.more) {
        setPage(page + 1);
      }
      setLoading(false);
    };

    const scrollHandler = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight;
      if (scrollTop + clientHeight >= scrollHeight && !loading) {
        loadMore();
      }
    };
    useEffect(() => {
      if (init.current) {
        loadInit();
        init.current = false;
      }
      // scroll event listener 등록
      window.addEventListener("scroll", scrollHandler);
      return () => {
        // scroll event listener 해제
        window.removeEventListener("scroll", scrollHandler);
      };
    }, [changed]);

    return null;
  };

  useEffect(() => {
    if (changed === true) {
      setChanged(false);
      setPage(1);
      init.current = true;
    }
  }, [changed]);

  if (storyType === "my" && list.length === 0)
    return <ThereIsNoFavorite>관심 스토리가 없습니다</ThereIsNoFavorite>;
  if (storyType === "past" && list.length === 0)
    return <ThereIsNoFavorite>지난 스토리가 없습니다</ThereIsNoFavorite>;
  return (
    <StoryListStyle>
      <LoadHandler storyType={storyType} />
      <section>
        {list.map((story, key) => {
          if (story.Story_Files[0]) {
            return (
              <Link
                to={`/story/${story.id}`}
                style={{
                  backgroundImage: `url("${story.Story_Files[0].file}") `,
                }}
                onClick={() => visitHandler(story.id)}
                key={key}
              >
                <div>
                  <div className="story__hashtag">
                    {story.Hashtags.slice(0, 3).map((tag, key) => {
                      return <p key={key}>#{tag.hashtag}</p>;
                    })}
                  </div>

                  <p className="story__title">{story.story_title}</p>
                  <ProgressBar
                    vote={story.story_vote}
                    goal={story.story_goal}
                  />
                </div>
                <div className="more__info">
                  <div>
                    <img src="/icons/love.svg" />
                    <p>{story.story_like}</p>
                    <img src="/icons/comment.svg" />
                    <p>{story.story_comment}</p>
                  </div>
                  <UserInfo story={story} />
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
                onClick={() => visitHandler(story.id)}
                key={key}
              >
                <div>
                  <div className="story__hashtag">
                    {story.Hashtags.slice(0, 3).map((tag, key) => {
                      return <p key={key}>#{tag.hashtag}</p>;
                    })}
                  </div>

                  <p className="story__title">{story.story_title}</p>
                  <ProgressBar
                    vote={story.story_vote}
                    goal={story.story_goal}
                  />
                </div>
                <div className="more__info">
                  <div>
                    <img src="/icons/love.svg" />
                    <p>{story.story_like}</p>
                    <img src="/icons/comment.svg" />
                    <p>{story.story_comment}</p>
                  </div>
                  <UserInfo story={story} />
                </div>
              </Link>
            );
          }
        })}
        {loading && <Loader />}
      </section>
    </StoryListStyle>
  );
};

export default StoryList;
