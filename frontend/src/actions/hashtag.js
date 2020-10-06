import axios from "axios";

// Action Type
export const HASHTAG_LIST_LOAD = "HASHTAG_LIST_LOAD";
export const HASHTAG_LIST_LOAD_SUCCESS = "HASHTAG_LIST_LOAD_SUCCESS";
export const HASHTAG_LIST_LOAD_FAILURE = "HASHTAG_LIST_LOAD_FAILURE";

const hashtagListLoadStart = () => {
  return { type: HASHTAG_LIST_LOAD };
};

const hashtagListLoadSuccess = (list) => {
  return { type: HASHTAG_LIST_LOAD_SUCCESS, list: list };
};

const hashtagListLoadFailure = () => {
  return { type: HASHTAG_LIST_LOAD_FAILURE };
};

// 해시태그 전체 목록 조회
export const hashtagAll = () => async (dispatch) => {
  dispatch(hashtagListLoadStart());
  await axios
    .get("/hashtag/all")
    .then((response) => {
      console.log(response.data);
      dispatch(hashtagListLoadSuccess(response.data.list));
    })
    .catch((error) => {
      dispatch(hashtagListLoadFailure());
    });
};
