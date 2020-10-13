import axios from "axios";

// Action Types
export const COMMENT_ADD = "COMMENT_ADD";
export const COMMENT_ADD_SUCCESS = "COMMENT_ADD_SUCCESS";
export const COMMENT_ADD_FAILURE = "COMMENT_ADD_FAILURE";

export const COMMENT_LIST_LOAD = "COMMENT_LIST_LOAD";
export const COMMENT_LIST_LOAD_SUCCESS = "COMMENT_LIST_LOAD_SUCCESS";
export const COMMENT_LIST_LOAD_FAILURE = "COMMENT_LIST_LOAD_FAILURE";

export const COMMENT_DELETE = "COMMENT_DELETE";
export const COMMENT_DELETE_SUCCESS = "COMMENT_DELETE_SUCCESS";
export const COMMENT_DELETE_FAILURE = "COMMENT_DELETE_FAILURE";

export const COMMENT_CHILD_ADD = "COMMENT_CHILD_ADD";
export const COMMENT_CHILD_ADD_SUCCESS = "COMMENT_CHILD_ADD_SUCCESS";
export const COMMENT_CHILD_ADD_FAILURE = "COMMENT_CHILD_ADD_FAILURE";

// export const COMMENT_CHILD_LIST_LOAD = "COMMENT_CHILD_LIST_LOAD";
// export const COMMENT_CHILD_LIST_LOAD_SUCCESS = "COMMENT_CHILD_LIST_LOAD_SUCCESS";
// export const COMMENT_CHILD_LIST_LOAD_FAILURE = "COMMENT_CHILD_LIST_LOAD_FAILURE";

// 댓글 등록
const commentAddStart = () => {
    return { type: COMMENT_ADD };
  };
  
const commentAddSuccess = (list) => {
    return { type: COMMENT_ADD_SUCCESS, list: list  };
  };
  
const commentAddFailure = () => {
    return { type: COMMENT_ADD_FAILURE };
  };

// 댓글 리스트 로드
const commentListLoadStart = () => {
  return { type: COMMENT_LIST_LOAD };
};

const commentListLoadSuccess = (list) => {
  return { type: COMMENT_LIST_LOAD_SUCCESS, list: list };
};

const commentListLoadFailure = () => {
  return { type: COMMENT_LIST_LOAD_FAILURE };
};

// 댓글 삭제
const commentDeleteStart = () => {
  return { type: COMMENT_DELETE };
};

const commentDeleteSuccess = (list) => {
  return { type: COMMENT_DELETE_SUCCESS, list: list };
};

const commentDeleteFailure = (list) => {
  return { type: COMMENT_DELETE_FAILURE };
};

// 대댓글 등록
const commentChildAddStart = () => {
  return { type: COMMENT_CHILD_ADD };
};

const commentChildAddSuccess = (reComment) => {
  return { type: COMMENT_CHILD_ADD_SUCCESS, reComment: reComment };
};

const commentChildAddFailure = () => {
  return { type: COMMENT_CHILD_ADD_FAILURE };
};

// // 대댓글 리스트 로드
// const commentChildListLoadStart = () => {
//   return { type: COMMENT_CHILD_LIST_LOAD };
// };

// const commentChildListLoadSuccess = (reComment) => {
//   return { type: COMMENT_CHILD_LIST_LOAD_SUCCESS, reComment: reComment };
// };

// const commentChildListLoadFailure = () => {
//   return { type: COMMENT_CHILD_LIST_LOAD_FAILURE };
// };


// 댓글 등록 요청
export const commentAdd = (data) => async (dispatch) => {
  dispatch(commentAddStart());
  await axios
    .post("/comment/add", { ...data })
    .then((response) => {
      dispatch(commentAddSuccess(response.data.list));
    })
    .catch((error) => {
      dispatch(commentAddFailure());
      console.error(error);
    });
};

// 댓글 삭제 요청
export const commentDelete = (data) => async (dispatch) => {
  dispatch(commentDeleteStart());
  await axios
    .post("/comment/delete", { ...data })
    .then((response) => {
      dispatch(commentDeleteSuccess(response.data.list));
    })
    .catch((error) => {
      dispatch(commentDeleteFailure());
      console.error(error);
    });
};

// 댓글 목록 조회 요청
export const commentListLoader = (story_id) => async (dispatch) => {
  dispatch(commentListLoadStart());
  await axios
    .get(`/comment/list/${story_id}`)
    .then((response) => {
      dispatch(commentListLoadSuccess(response.data.list));
    })
    .catch((error) => {
      dispatch(commentListLoadFailure());
      console.error(error);
    });
};

// 대댓글 등록 요청
export const commentChildAdd = (data) => async (dispatch) => {
  dispatch(commentChildAddStart());
  await axios
    .post("/comment/child_add", { ...data })
    .then((response) => {
      dispatch(commentChildAddSuccess(response.data.reComment));
    })
    .catch((error) => {
      dispatch(commentChildAddFailure());
    });
};


// // 대댓글 목록 조회 요청
// export const commentChildListLoader = (comment_id) => async (dispatch) => {
//   await axios
//     .get(`/comment/list/${comment_id}`)
//     .then((response) => {
//       dispatch(commentChildListLoadSuccess(response.data.reComment));
//     })
//     .catch((error) => {
//       dispatch(commentChildListLoadFailure());
//       console.error(error);
//     });
//   dispatch(commentChildListLoadStart());
// };
