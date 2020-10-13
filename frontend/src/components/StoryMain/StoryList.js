import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import CountUp, { useCountUp } from "react-countup";
import { storyListLoader, storyVisit } from "../../actions/story";
import Loader from "./Loader";

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
          width: 90%;
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
    height: 5%;
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
    transition: all 0.7s ease-in-out;

    > div {
      height: 5px;
      background-color: white;
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

  const visitHandler = (id) => {
    dispatch(storyVisit(id));
  };

  const ProgressBar = ({ vote, goal }) => {
    let ratio = (vote / goal) * 100;
    if (ratio > 100) ratio = 100;

    const { countUp } = useCountUp({
      start: 0,
      end: ratio,
      duration: 5,
    });

    return (
      <BarStyle ratio={ratio}>
        <p className="count">{countUp}%</p>
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
        {status === "WAITING" && <Loader />}
      </section>
    </StoryListStyle>
  );
};

export default StoryList;
