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
// export const ACT_LOAD = "ACT_LOAD";
// export const ACT_LOAD_SUCCESS = "ACT_LOAD_SUCCESS";
// export const ACT_LOAD_FAILURE = "ACT_LOAD_FAILURE";

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

// act 게시물 목록 조회
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

// act 게시물 상세 정보
// export const actLoadInit = () => {
//   return { type: act_LOAD_INIT };
// };

// const actLoadStart = () => {
//   return { type: ACT_LOAD };
// };
// const actLoadSuccess = (data, status) => {
//   return {
//     type: ACT_LOAD_SUCCESS,
//     data: data.data,
//     status: status,
//   };
// };
// const actLoadFailure = () => {
//   return { type: ACT_LOAD_FAILURE };
// };


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

// // act 게시물 목록 조회 요청
// export const actListLoader = (page) => async (dispatch) => {
//     dispatch(actListLoadStart());
//     await axios
//       .get(`/act/list/${page}`)
//       .then((response) => {
//         let status = true;
//         if (response.data.list.length !== 10) status = false;
//         dispatch(actListLoadSuccess(response.data.list, status));
//       })
//       .catch((error) => {
//         dispatch(actListLoadFailure());
//         console.error(error);
//       });
//   };
  
// // 게시물 상세 조회 요청
// export const actLoader = (id) => async (dispatch) => {
//   dispatch(actLoadStart());
//   await axios
//     .get(`/act/${id}`)
//     .then((response) => {
//       console.log(response.data);
//       dispatch(actLoadSuccess(response.data));
//     })
//     .catch((error) => {
//       dispatch(actLoadFailure());
//       console.log(error);
//     });
// };
  
  // 게시물 조회수 추가 요청
export const actVisit = (id) => async () => {
    await axios
      .put("/act/visit", { act_id: id })
      .then(() => null)
      .catch((error) => console.error(error));
  };
