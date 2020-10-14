import axios from "axios";


export const ACT_LIST_LOAD = "ACT_LIST_LOAD";
export const ACT_LIST_LOAD_SUCCESS = "ACT_LIST_LOAD_SUCCESS";
export const ACT_LIST_LOAD_FAILURE = "ACT_LIST_LOAD_FAILURE";

// 게시물 목록 조회
const actListLoadStart = () => {
    return { type: ACT_LIST_LOAD };
  };
  
  const actListLoadSuccess = (list, status) => {
    return {
      type: ACT_LIST_LOAD_SUCCESS,
      list: list,
      status: status,
    };
  };
  
  const actListLoadFailure = () => {
    return { type: ACT_LIST_LOAD_FAILURE };
  };
  

// act 게시물 목록 조회 요청
export const actListLoader = (page) => async (dispatch) => {
    dispatch(actListLoadStart());
    await axios
      .get(`/act/list/${page}`)
      .then((response) => {
        let status = true;
        if (response.data.list.length !== 9) status = false;
        dispatch(actListLoadSuccess(response.data.list, status));
      })
      .catch((error) => {
        dispatch(actListLoadFailure());
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