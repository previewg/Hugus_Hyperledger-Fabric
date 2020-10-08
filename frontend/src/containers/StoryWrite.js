import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { storyAdd } from "../actions/story";

const StoryWriteStyle = styled.div`
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
            box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.4);
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
      margin-top: 35px;
      width: 100%;
      > p {
        font-weight: bold;
      }

      .item {
        margin-top: 40px;
        width: 90%;
        display: flex;
        align-items: center;
        p {
          margin-left: 5px;
          font-size: 13px;
        }
        input {
          padding: 5px;
          height: 20px;
          outline: none;
          border: none;
          border-bottom: solid 0.1px lightgray;
          transition: 0.3s ease-in-out;
          :focus {
            border-bottom: solid 0.1px orange;
          }
        }
        .item_name {
          display: flex;
          flex-direction: column;
          min-width: 200px;
          margin-right: 10px;
        }
        .item_price {
          display: flex;
          flex-direction: column;
          width: 90px;
          min-width: 90px;
          margin-right: 10px;
        }
        .item_quantity {
          display: flex;
          flex-direction: column;
          width: 90px;
          min-width: 90px;
          margin-right: 10px;
        }

        button {
          position: relative;
          top: 20px;
          left: 20px;
          width: 50px;
          min-width: 50px;
          height: 30px;
          margin-right: 5px;
          background-color: transparent;
          border-radius: 3px;
          cursor: pointer;
          outline: none;
        }
        .item_add {
          border: solid orange 0.1px;
          color: orange;
          :hover {
            background-color: orange;
            color: white;
          }
        }
        .item_delete {
          border: solid darkgray 0.1px;
          color: darkgray;
          :hover {
            background-color: darkgray;
            color: white;
          }
        }
      }
      .item_list {
        margin-top: 20px;
        margin-bottom: 10px;
        display: flex;
        flex-direction: column;
        > div {
          display: flex;
          align-items: center;
          > p {
            font-size: 13px;
          }
          > button {
            border-radius: 20px;
            cursor: pointer;
            font-size: 13px;
            margin-left: 10px;
            color: #fa6f6f;
            width: 40px;
            height: 25px;
            border: solid 0.1px #fa6f6f;
            background-color: transparent;
            outline: none;
            :hover {
              background-color: #fa6f6f;
              color: white;
            }
          }
        }
      }
      .total_price {
        border-top: solid 0.1px orange;
        display: flex;
        justify-content: space-between;
        align-items: center;
        p:nth-child(1) {
          font-size: 12px;
          cursor: pointer;
          transition: 0.3s ease-in-out;
          :hover {
            color: #f83c3c;
          }
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

const StoryWrite = (props) => {
  const dispatch = useDispatch();
  const title = useRef();
  const info = useRef();
  const content = useRef();
  const itemName = useRef();
  const itemPrice = useRef();
  const itemQuantity = useRef();
  const hashtags = useRef();
  const addStatus = useSelector((state) => state.story.add.status);

  const [data, setData] = useState({
    title: "",
    info: "",
    content: "",
    files: null,
    item_name: "",
    item_price: "",
    item_quantity: "",
    hashtag: "",
    items: [],
    hashtags: [],
    totalPrice: 0,
    goal: 0,
  });

  const [filled, setFilled] = useState({
    title: true,
    info: true,
    content: true,
    items: true,
    hashtags: true,
  });

  const [errorCode, setErrorCode] = useState(0);

  const [preImg, setPreImg] = useState([]);
  const [fileReaderState, setFileReaderState] = useState("");
  const errorHandler = () => {
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
    } else if (data.items.length == 0) {
      setErrorCode(7);
      itemName.current.focus();
      setFilled({
        ...filled,
        items: false,
      });
      return false;
    } else if (data.hashtags.length == 0) {
      setErrorCode(8);
      hashtags.current.focus();
      setFilled({
        ...filled,
        hashtags: false,
      });
      return false;
    }
    return true;
  };

  const storyAddHandler = () => {
    if (errorHandler()) {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("info", data.info);
      formData.append("content", data.content);
      formData.append("hashtags", data.hashtags);
      formData.append("items", JSON.stringify(data.items));
      formData.append("goal", data.goal);
      if (data.files !== null) {
        for (const file of data.files) {
          formData.append(`files`, file);
        }
      } else {
        formData.append("files", "");
      }
      dispatch(storyAdd(formData, { ...props }));
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
      if (e.target.name !== "item" && e.target.name !== "hashtag") {
        setFilled({
          ...filled,
          [e.target.name]: true,
        });
      }
    }
  };

  const addItem = (e) => {
    if (data.item_name === "") {
      setErrorCode(4);
      itemName.current.focus();
    } else if (data.item_price === "") {
      setErrorCode(5);
      itemPrice.current.focus();
    } else if (data.item_quantity === "") {
      setErrorCode(6);
      itemQuantity.current.focus();
    } else {
      let item = {
        item_name: data.item_name,
        item_price: data.item_price,
        item_quantity: data.item_quantity,
      };
      let totalPrice = data.totalPrice + data.item_price * data.item_quantity;
      let goal;
      if (totalPrice < 1000000 && totalPrice > 0) {
        goal = 50;
      } else {
        goal = parseInt(totalPrice / 1000000) * 100;
      }
      let items = data.items.concat(item);
      setData({
        ...data,
        item_name: "",
        item_price: "",
        item_quantity: "",
        goal: goal,
        items,
        totalPrice: totalPrice,
      });
      setFilled({
        ...filled,
        items: true,
      });
      setErrorCode(0);
    }
  };

  const addHashtag = (e) => {
    if (e.target.value === "") setErrorCode(5);
    else {
      let hashtags = data.hashtags.concat(e.target.value);
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

  const onDeleteHandler = (key) => () => {
    console.log(key);
    let items;
    let totalPrice =
      data.totalPrice -
      data.items[key].item_price * data.items[key].item_quantity;
    let goal;
    if (totalPrice < 1000000 && totalPrice > 0) {
      goal = 50;
    } else {
      goal = parseInt(totalPrice / 1000000) * 100;
    }
    if (key === 0) {
      items = data.items.slice(1, data.items.length);
    } else if (key === data.items.length - 1) {
      items = data.items.slice(0, key);
    } else {
      items = data.items
        .slice(0, key)
        .concat(data.items.slice(key + 1, data.items.length));
    }
    setData({
      ...data,
      items,
      totalPrice: totalPrice,
      goal: goal,
    });
  };

  const onTagDeleteHandler = (key) => () => {
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
    });
  };

  const itemInputDelete = () => {
    setData({
      ...data,
      item_name: "",
      item_price: "",
      item_quantity: "",
    });
  };

  const clearItems = useCallback(() => {
    setData({
      ...data,
      items: [],
    });
  }, []);

  useEffect(() => {
    if (addStatus === "SUCCESS") {
      setData({
        title: "",
        info: "",
        content: "",
        files: null,
        item: "",
        hashtag: "",
        items: [],
        hashtags: [],
      });
    }
  }, [errorCode, addStatus, fileReaderState]);

  return (
    <>
      <StoryWriteStyle>
        <div className="layout">
          <div className="write_title">
            <p>글쓰기</p>
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
            ></textarea>
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
                    <p className="preImgClear" key={key + 100}>
                      x
                    </p>
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
            ></textarea>
          </div>

          <div className="items">
            <p>필요 물품</p>
            <div className="item">
              <div className="item_name">
                <p>물품 내용</p>
                <input
                  name="item_name"
                  ref={itemName}
                  value={data.item_name}
                  placeholder="물품 내용을 입력하세요."
                  onChange={onChangeHandler}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") addItem(e);
                  }}
                />
              </div>
              <div className="item_price">
                <p>물품 금액(원)</p>
                <input
                  type="number"
                  name="item_price"
                  ref={itemPrice}
                  value={data.item_price}
                  placeholder="ex) 10000"
                  onChange={onChangeHandler}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") addItem(e);
                  }}
                />
              </div>
              <div className="item_quantity">
                <p>물품 수량(개)</p>
                <input
                  type="number"
                  name="item_quantity"
                  ref={itemQuantity}
                  value={data.item_quantity}
                  placeholder="ex) 3"
                  onChange={onChangeHandler}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") addItem(e);
                  }}
                />
              </div>
              <button className="item_add" onClick={addItem}>
                등록
              </button>
              <button className="item_delete" onClick={itemInputDelete}>
                취소
              </button>
            </div>
            <div className="item_list">
              {data.items.map((item, key) => {
                return (
                  <div key={key}>
                    <p>
                      {item.item_name} ({" "}
                      {Number(item.item_price).toLocaleString()} 원 X{" "}
                      {item.item_quantity} 개 )
                    </p>
                    <button onClick={onDeleteHandler(key)}>삭제</button>
                  </div>
                );
              })}
            </div>
            {data.items.length !== 0 && (
              <div className="total_price">
                <p onClick={clearItems}>일괄 삭제</p>
                <p>합계 {data.totalPrice.toLocaleString()}원</p>
              </div>
            )}
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
                  <div className="added__hashtag">
                    <p className="hashtag" key={key}>
                      # {hashtag}
                    </p>
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
            <button onClick={storyAddHandler}>
              제출하기
              <img src="/icons/PaperPlane.png" />
            </button>
          </div>
        </div>
      </StoryWriteStyle>
      <ErrorBoxStyle error={errorCode}>{errorMsg[errorCode]}</ErrorBoxStyle>
    </>
  );
};

export default StoryWrite;
