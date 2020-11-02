import axios from "axios";

export const TALK_LOAD_INIT = "TALK_LOAD_INIT";
export const TALK_LOAD = "TALK_LOAD";
export const TALK_LOAD_SUCCESS = "TALK_LOAD_SUCCESS";
export const TALK_LOAD_FAILURE = "TALK_LOAD_FAILURE";
export const TALK_LIKE = "TALK_LIKE";
export const TALK_LIKE_SUCCESS = "TALK_LIKE_SUCCESS";
export const TALK_LIKE_FAILURE = "TALK_LIKE_FAILURE";
export const TALK_UPDATE = "TALK_UPDATE";
export const TALK_UPDATE_SUCCESS = "TALK_ADD_SUCCESS";
export const TALK_UPDATE_FAILURE = "TALK_ADD_FAILURE";

// 게시물 수정
const talkUpdateStart = () => {
  return { type: TALK_UPDATE };
};

const talkUpdateSuccess = () => {
  return { type: TALK_UPDATE_SUCCESS };
};

const talkUpdateFailure = () => {
  return { type: TALK_UPDATE_FAILURE };
};

// 게시물 상세 정보
export const talkLoadInit = () => {
  return { type: TALK_LOAD_INIT };
};

export const talkLoadStart = () => {                
  return { type: TALK_LOAD };
};

const talkLoadSuccess = (data) => {
  return {
    type: TALK_LOAD_SUCCESS,
    data: data.data,
    like: data.like,
    likeNum: data.data.talk_like,
  };
};

const talkLoadFailure = () => {
  return { type: TALK_LOAD_FAILURE };
};

// TALK 좋아요
const talkLikeStart = () => {
    return { type: TALK_LIKE };
  };
  const talkLikeSuccess = () => {
    return { type: TALK_LIKE_SUCCESS };
  };
  const talkLikeFailure = () => {
    return { type: TALK_LIKE_FAILURE };
  };


// 게시물 수정 요청
export const talkUpdate = (data, props) => async (dispatch) => {
  dispatch(talkUpdateStart());
  await axios.post("/talk/update", data, {
      headers: { "content-type": "multipart/form-data" },
    })
    .then(() => {
      alert("성공적으로 수정되었습니다.");
      dispatch(talkUpdateSuccess());
      props.history.push("/talk");
    })
    .catch((error) => {
      alert("수정에 실패했습니다.");
      dispatch(talkUpdateFailure());
      console.error(error);
    });
};

// TALK 상세 조회 요청
export const talkLoader = (id) => async (dispatch) => {
  dispatch(talkLoadStart());
  await axios.get(`/talk/${id}`)
    .then((response) => {
      dispatch(talkLoadSuccess(response.data));
    })
    .catch((error) => {
      dispatch(talkLoadFailure());
      console.log(error);
    });
};  

// TALK 좋아요 추가/제거 요청
export const talkLike = (id, status) => async (dispatch) => {
    dispatch(talkLikeStart());
    await axios.put('/talk/like', { talk_id: id, status: status })
      .then(() => {
        dispatch(talkLikeSuccess());
      })
      .catch((error) => {
        console.log(error);
        dispatch(talkLikeFailure());
      });
  };