import axios from "axios";

// Action Types
export const ACT_ADD = "ACT_ADD";
export const ACT_ADD_SUCCESS = "ACT_ADD_SUCCESS";
export const ACT_ADD_FAILURE = "ACT_ADD_FAILURE";
export const ACT_LIST_LOAD = "ACT_LIST_LOAD";
export const ACT_LIST_LOAD_SUCCESS = "ACT_LIST_LOAD_SUCCESS";
export const ACT_LIST_LOAD_FAILURE = "ACT_LIST_LOAD_FAILURE";
export const ACT_VISIT = "ACT_VISIT";
export const act_LOAD_INIT = "ACT_LOAD_INIT"

// act 게시물 등록
const actAddStart = () => {
  return { type: ACT_ADD };
};
const actAddSuccess = (list) => {
  return { type: ACT_ADD_SUCCESS, list: list };
};
const actAddFailure = () => {
  return { type: ACT_ADD_FAILURE };
};

// act 게시글 등록 요청
export const actAdd = (data) => async (dispatch) => {
  dispatch(actAddStart());
  await axios
    .post("/act/add", { ...data })
    .then((response) => {
      dispatch(actAddSuccess(response.data.list));
    })
    .catch((error) => {
      dispatch(actAddFailure());
      console.error(error);
    });
};

  // 게시물 조회수 추가 요청
export const actVisit = (id) => async () => {
    await axios
      .put("/act/visit", { act_id: id })
      .then(() => null)
      .catch((error) => console.error(error));
  };
