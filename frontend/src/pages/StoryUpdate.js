import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { storyLoader, storyUpdate } from "actions/story";

const StoryUpdateStyle = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 70px;
  .layout {
    margin-top: 100px;
    width: 700px;
    display: flex;
    flex-direction: column;
    .write_title {
      text-align: center;
      font-size: 20px;
      padding: 10px;
      display: flex;
      justify-content: center;
      p {
        width: 200px;
        height: 40px;
        border-bottom: solid orange 2px;
      }
    }
    .title {
      margin-top: 50px;
      width: 100%;
      display: flex;
      align-items: center;
      p {
        font-weight: bold;
        margin-right: 10px;
        width: 80px;
      }
      input {
        border: none;
        width: 300px;
        padding: 5px;
        border-bottom: solid 0.1px lightgray;
        transition: 0.3s ease-in-out;
        :focus {
          outline: none;
          border-bottom: solid 0.1px orange;
        }
      }
    }

    .info {
      margin-top: 35px;
      p {
        font-weight: bold;
      }
      textarea {
        padding: 12px;
        width: 100%;
        height: 150px;
        border-radius: 4px;
        resize: none;
        border: solid 0.1px lightgray;
        transition: 0.3s ease-in-out;
        :focus {
          outline: none;
          border: solid 0.1px orange;
        }
      }
    }
    .content {
      margin-top: 50px;
      display: flex;
      flex-direction: column;
      p {
        font-weight: bold;
      }
      div {
        display: flex;
        justify-content: flex-end;
        align-items: flex-end;
        margin-bottom: 10px;

        > div {
          display: flex;
          margin: 0;
          .preImg {
            width: 60px;
            height: 60px;
            box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.4);
            margin: 5px;
          }
          .preImgClear {
            position: relative;
            right: 11px;
            width: 15px;
            height: 15px;
            bottom: 46px;
            background-color: gray;
            border-radius: 7.5px;
            font-size: 12px;
            background-color: darkgray;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
          }
        }

        label {
          min-width: 50px;
          color: grey;
          font-size: small;
          cursor: pointer;
          transition: 0.2s ease-in-out;
          :hover {
            color: orange;
          }
        }
        input[type="file"] {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          border: 0;
        }
      }

      textarea {
        padding: 12px;
        resize: none;
        width: 100%;
        height: 400px;
        border-radius: 4px;
        transition: 0.3s ease-in-out;
        border: solid 0.1px lightgray;

        :focus {
          outline: none;
          border: solid 0.1px orange;
        }
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

    .warning {
      margin-top: 30px;
      width: 100%;
      border: solid 0.1px lightgray;
      margin-bottom: 30px;
      font-size: 13px;
      display: flex;
      flex-direction: column;
      p {
        margin: 15px;
        margin-left: 20px;
      }
      > p:nth-child(1) {
        font-weight: bold;
      }
      strong:nth-child(1) {
        color: dodgerblue;
      }
      strong:nth-child(2) {
        color: orange;
      }
      div {
        display: flex;
        justify-content: space-between;
      }
    }

    .hashtags {
      font-weight: bold;
      margin-top: 20px;
      > div {
        display: flex;
        align-items: center;
        width: 100%;
        height: 50px;
        overflow: paged-y;
        input {
          margin-right: 7px;
          padding: 5px;
          height: 20px;
          outline: none;
          border: none;
          transition: 0.3s ease-in-out;
          border-bottom: solid 0.1px lightgray;
          :focus {
            border-bottom: solid 0.1px orange;
          }
        }
        .added__hashtag {
          display: flex;
          .hashtag {
            padding: 10px;
            border-radius: 20px;
            background-color: orange;
            font-size: 12px;
            margin: 5px;
            color: white;
            font-weight: 200;
            min-width: auto;
          }
          .clear {
            position: relative;
            border-radius: 7.5px;
            font-size: 12px;
            right: 15px;
            top: -10px;
            height: 15px;
            width: 15px;
            background-color: darkgray;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
          }
        }
      }
    }

    .submit {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      button {
        margin-top: 15px;
        border: none;
        background: white;
        font-size: 15px;
        outline: none;
        cursor: pointer;
        font-weight: bold;
        transition: 0.2s ease-in-out;
        :hover {
          color: orange;
        }
        > img {
          margin-left: 10px;
          width: 20px;
          height: 20px;
        }
      }
    }
  }
`;

const ErrorBoxStyle = styled.p`
  ${(props) => {
    if (props.error == 0) {
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

const errorMsg = [
  "",
  "제목을 입력 바랍니다",
  "소개를 입력 바랍니다",
  "내용을 입력 바랍니다",
  "물품 내용을 입력 바랍니다",
  "물품 금액을 입력 바랍니다",
  "물품 수량을 입력 바랍니다",
  "필요물품을 등록 바랍니다",
  "해시태그를 입력 바랍니다",
];

const StoryUpdate = (props) => {
  const dispatch = useDispatch();
  const title = useRef();
  const info = useRef();
  const content = useRef();
  const hashtags = useRef();
  const load = useRef(true);
  const preData = useSelector((state) => state.story.detail.data);
  const loadStatus = useSelector((state) => state.story.detail.status);

  const [data, setData] = useState({
    title: "",
    info: "",
    content: "",
    files: null,
    hashtag: "",
    hashtags: [],
    del_hashtags: [],
    goal: 0,
  });

  const [filled, setFilled] = useState({
    title: true,
    info: true,
    content: true,
    hashtags: true,
  });

  const [errorCode, setErrorCode] = useState(0);

  const [preImg, setPreImg] = useState([]);

  const [fileReaderState, setFileReaderState] = useState("");

  const errorHandler = useCallback(() => {
    if (!data.title) {
      setErrorCode(1);
      title.current.focus();
      setFilled({
        ...filled,
        title: false,
      });
      return false;
    } else if (!data.info) {
      setErrorCode(2);
      info.current.focus();
      setFilled({
        ...filled,
        info: false,
      });
      return false;
    } else if (!data.content) {
      setErrorCode(3);
      content.current.focus();
      setFilled({
        ...filled,
        content: false,
      });
      return false;
    } else if (data.hashtags.length === 0) {
      setErrorCode(8);
      hashtags.current.focus();
      setFilled({
        ...filled,
        hashtags: false,
      });
      return false;
    }
    return true;
  }, [filled, data]);

  const storyUpdateHandler = () => {
    if (errorHandler()) {
      const formData = new FormData();
      formData.append("id", props.match.params.id);
      formData.append("story_title", data.title);
      formData.append("user_info", data.info);
      formData.append("story_content", data.content);
      formData.append("hashtags", JSON.stringify(data.hashtags));
      formData.append("del_hashtags", JSON.stringify(data.del_hashtags));
      if (data.files !== null) {
        for (const file of data.files) {
          formData.append(`files`, file);
        }
      } else {
        formData.append("files", "");
      }
      dispatch(storyUpdate(formData, { ...props }));
    }
  };

  const previewImg = (e) => {
    setPreImg([]);
    for (const file of e.target.files) {
      let reader = new FileReader();
      reader.onloadend = () => {
        let newPreImg = preImg;
        newPreImg.push({
          file: file,
          previewURL: reader.result,
        });
        setPreImg(newPreImg);
        setFileReaderState(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const onChangeHandler = (e) => {
    e.preventDefault();
    if (e.target.name === "files") {
      previewImg(e);
      setData({
        ...data,
        [e.target.name]: e.target.files,
      });
    } else {
      setData({
        ...data,
        [e.target.name]: e.target.value,
      });
      setErrorCode(0);
      if (e.target.name !== "hashtag") {
        setFilled({
          ...filled,
          [e.target.name]: true,
        });
      }
    }
  };

  const addHashtag = (e) => {
    if (e.target.value === "") setErrorCode(5);
    else {
      let hashtags = data.hashtags.concat({ tag: e.target.value, new: true });
      setData({
        ...data,
        hashtag: "",
        hashtags,
      });
      setFilled({
        ...filled,
        hashtags: true,
      });
      setErrorCode(0);
    }
  };

  const onTagDeleteHandler = useCallback(
    (key) => () => {
      const del_hashtags = data.del_hashtags.concat({
        id: data.hashtags[key].id,
        hashtag: data.hashtags[key].tag,
      });
      let hashtags;
      if (key === 0) {
        hashtags = data.hashtags.slice(1, data.hashtags.length);
      } else if (key === data.hashtags.length - 1) {
        hashtags = data.hashtags.slice(0, key);
      } else {
        hashtags = data.hashtags
          .slice(0, key)
          .concat(data.hashtags.slice(key + 1, data.hashtags.length));
      }
      setData({
        ...data,
        hashtags,
        del_hashtags: del_hashtags,
      });
    },
    [data]
  );

  const init = () => {
    let pre = {
      title: preData.story_title,
      info: preData.user_info,
      content: preData.story_content,
      files: null,
      hashtag: "",
      hashtags: [],
      del_hashtags: [],
      totalPrice: 0,
      goal: preData.story_goal,
    };
    preData.Hashtags.map((tag) =>
      pre.hashtags.push({
        tag: tag.hashtag,
        new: false,
        id: tag.Story_Hashtag.hashtag_id,
      })
    );
    setData(pre);
  };

  const totalPrice = () => {
    let total = 0;
    preData.Story_Items.map((item) => {
      total += item.item_price * item.item_quantity;
    });
    return total;
  };

  useEffect(() => {
    if (load.current) {
      dispatch(storyLoader(props.match.params.id));
      load.current = false;
    }
    if (loadStatus === "SUCCESS") init();
  }, [loadStatus]);

  return (
    <>
      {preData && (
        <StoryUpdateStyle>
          <div className="layout">
            <div className="write_title">
              <p>수정하기</p>
            </div>
            <div className="title">
              <p>제목</p>
              <input
                name="title"
                ref={title}
                value={data.title}
                type="text"
                placeholder="제목을 입력하세요."
                onChange={onChangeHandler}
              />
            </div>

            <div className="info">
              <p>작성자 소개</p>
              <textarea
                name="info"
                ref={info}
                value={data.info}
                required
                placeholder="본인을 마음껏 표현해주세요."
                onChange={onChangeHandler}
              />
            </div>

            <div className="content">
              <p>내용</p>
              <div>
                {preImg.map((item, key) => {
                  return (
                    <div key={key}>
                      <img
                        className="preImg"
                        src={item.previewURL}
                        key={key}
                        alt="preview"
                      />
                    </div>
                  );
                })}
                <label htmlFor="files">파일 첨부</label>
                <input
                  id="files"
                  name="files"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={onChangeHandler}
                />
              </div>
              <textarea
                name="content"
                ref={content}
                value={data.content}
                required
                placeholder="내용을 입력하세요. "
                onChange={onChangeHandler}
              />
            </div>

            <div className="items">
              <p>저는 이런것들이 필요합니다</p>
              <div className="item">
                {preData.Story_Items.map((item, key) => {
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

            <div className="warning">
              <p>
                ※ 스토리 등록 이후, <strong>물품의 총액에 따라</strong> 캠페인
                등록에 대한 필요 득표수가 다릅니다.
              </p>
              <p>✔ 기준</p>
              <p>
                <strong>100만원 미만</strong> : 50(필요 득표수),{" "}
                <strong>100만원 이상</strong> : 총액(만원) / 100(만원) 의 몫
              </p>
              <div>
                <p>예) 199만원 -> 100, 201만원 -> 200</p>
                <p>현재 필요 득표수 : {data.goal}</p>
              </div>
            </div>

            <div className="hashtags">
              <p>태그</p>
              <div>
                <input
                  name="hashtag"
                  ref={hashtags}
                  value={data.hashtag}
                  placeholder="# 태그입력"
                  onChange={onChangeHandler}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") addHashtag(e);
                  }}
                />
                {data.hashtags.map((hashtag, key) => {
                  return (
                    <div className="added__hashtag" key={key}>
                      <p className="hashtag"># {hashtag.tag}</p>
                      <p
                        className="clear"
                        onClick={onTagDeleteHandler(key)}
                        key={key + 100}
                      >
                        x
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="submit">
              <button onClick={storyUpdateHandler}>
                수정하기
                <img alt="submit" src="/icons/PaperPlane.png" />
              </button>
            </div>
          </div>
        </StoryUpdateStyle>
      )}
      <ErrorBoxStyle error={errorCode}>{errorMsg[errorCode]}</ErrorBoxStyle>
    </>
  );
};

export default StoryUpdate;
