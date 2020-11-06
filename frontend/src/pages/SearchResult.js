import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { hashtagAll } from "actions/hashtag";
import * as Hangul from "hangul-js";
import { Link } from "react-router-dom";
import CountUp from "react-countup";
import { hashtagSearch } from "../actions/hashtag";
import { storyVisit } from "../actions/story";
import axios from "axios";
import Loader from "./Loader";

const SearchResultStyle = styled.section`
  display: flex;
  justify-content: center;
  padding-top: 50px;
  .layout {
    margin-top: 180px;
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .search__comment {
      font-size: 22px;
    }
    .search__bar {
      margin-top: 20px;
      width: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      input {
        min-width: 300px;
        font-size: 15px;
        padding: 12px;
        width: 100%;
        height: 35px;
        border-radius: 4px;
        transition: 0.3s ease-in-out;
        border: solid orange 4px;
        :focus {
          outline: none;
        }
        margin-left: 30px;
      }
      img {
        cursor: pointer;
        width: 30px;
        position: relative;
        z-index: 1;
        right: 45px;
        cursor: pointer;
        transition: 0.1s ease-in-out;
        :hover {
          color: orange;
          transform: scale(1.2);
        }
      }
    }
    .live__suggestion {
      display: ${(props) => (props.search ? "flex" : "none")};
      position: absolute;
      top:300px;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 50%;
      height:300px;
      > div {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        input {
          cursor: pointer;
          width: 100%;
          min-width: 300px;
          margin-left: 30px;
          padding: 12px;
          outline: none;
          border: solid 0.1px lightgray;
          border-top: none;
          :hover {
            color: orange;
            font-weight: bold;
            background-color: #faf4e7;
          }
        }
        img {
          width: 30px;
          position: relative;
          z-index: -100;
          right: 30px;
        }
      }
    }
  }
`;

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

const SearchResult = () => {
  const init = useRef(true);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const search_list = useSelector((state) => state.hashtag.search.data);
  const search_status = useSelector((state) => state.hashtag.search.status);
  const list = useSelector((state) => state.hashtag.list.data);

  const compare = (hashtag) => {
    const dis = Hangul.disassemble(hashtag);
    if (hashtag.match(search) || dis.includes(search)) return true;
    else return false;
  };

  const UserInfo = ({ story }) => {
    if (story.user_info.length > 100)
      return <p>{story.user_info.substr(0, 100)}...</p>;
    return <p>{story.user_info}</p>;
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

  const onChangeHandler = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
    if (e.key === "Enter") {
      onClick();
    }
  };

  const visitHandler = async (story_id) => {
    await axios.put("/story/visit", { story_id: story_id });
  };

  const onClick = () => {
    dispatch(hashtagSearch(search));
  };

  useEffect(() => {
    const initFunc = () => {
    setLoading(true);
    dispatch(hashtagAll());
    if (search !== "") {
      setSearch(search_list[0].Hashtags.hashtag);
    }
  }
  if (init.current) {
    init.current = false;
    initFunc();
  }
  }, [search_list]);

  return (
    
    <SearchResultStyle search={search}>
      <div className="layout">
        <div className="search__bar">
          <input
            name="search"
            value={search}
            className="search_form"
            type="text"
            placeholder="해시태그로 검색해보세요!"
            onChange={onChangeHandler}
            onKeyPress={onChangeHandler}
          />
          <div onClick={onClick}>
            <img alt="search__icon" src="/icons/search.png" />
          </div>
        </div>
        
        <div className="live__suggestion">
          {list.map((row, key) => {
            if (row.hashtag !== undefined) {
              if (compare(row.hashtag))
                return (
                  <div key={key}>
                    <input
                      value={row.hashtag}
                      readOnly
                      onClick={async () => {
                        await setSearch(row.hashtag);
                        dispatch(hashtagSearch(row.hashtag));
                      }}
                    />

                    <div onClick={onClick}>
                      <img alt="search__icon" src="/icons/search.png" />
                    </div>
                  </div>
                );
            }
          })}
        </div>

        <div className="search__comment">
          {search_list.length !== 0 && search_list !== "NOTHING"
            ? '"' +
              search_list[0].Hashtags[0].hashtag +
              '"' +
              " 검색결과 총" +
              search_list.length +
              "개의 게시글이 존재합니다."
            : null}
        </div>
        {search_list === "NOTHING" || search_list.length === 0 ? (
          <div>검색결과 없음</div>
        ) : (
          <StoryListStyle>
            <section>
              {search_list.map((story, key) => {
                if (search_status === "WAITING") return <Loader />;
                if (story.Story_Files[0]) {
                  return (
                    <Link
                      to={`/story/${story.id}`}
                      style={{
                        backgroundImage: `url("${story.Story_Files[0].file}")`,
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

                        <p className="story__title">
                          {story.story_title}
                        </p>
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
            </section>
          </StoryListStyle>
        )}

      </div>
    </SearchResultStyle>
  );
};

export default SearchResult;
