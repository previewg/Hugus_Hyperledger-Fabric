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

export const COMMENT_LIKE_START = "COMMENT_LIKE_START";
export const COMMENT_LIKE_SUCCESS = "COMMENT_LIKE_SUCCESS";
export const COMMENT_LIKE_FAILURE = "COMMENT_LIKE_FAILURE";

export const COMMENT_CHILD_ADD = "COMMENT_CHILD_ADD";
export const COMMENT_CHILD_ADD_SUCCESS = "COMMENT_CHILD_ADD_SUCCESS";
export const COMMENT_CHILD_ADD_FAILURE = "COMMENT_CHILD_ADD_FAILURE";

export const COMMENT_LIST_INIT = "COMMENT_LIST_INIT";

// 댓글 등록
const commentAddStart = () => {
  return { type: COMMENT_ADD };
};

const commentAddSuccess = (list, more, total) => {
  return { type: COMMENT_ADD_SUCCESS, list: list, more: more, total: total };
};

const commentAddFailure = () => {
  return { type: COMMENT_ADD_FAILURE };
};

export const commentListInit = () => {
  return { type: COMMENT_LIST_INIT };
};

// 댓글 리스트 로드
const commentListLoadStart = () => {
  return { type: COMMENT_LIST_LOAD };
};

const commentListLoadSuccess = (list, more, total) => {
  return {
    type: COMMENT_LIST_LOAD_SUCCESS,
    list: list,
    more: more,
    total: total,
  };
};

const commentListLoadFailure = () => {
  return { type: COMMENT_LIST_LOAD_FAILURE };
};

// 댓글 삭제
const commentDeleteStart = () => {
  return { type: COMMENT_DELETE };
};

const commentDeleteSuccess = (list, more, total) => {
  return { type: COMMENT_DELETE_SUCCESS, list: list, more: more, total: total };
};

const commentDeleteFailure = () => {
  return { type: COMMENT_DELETE_FAILURE };
};

// 댓글 좋아요 등록 / 삭제 요청
const commentLikeStart = () => {
  return { type: COMMENT_LIKE_START };
};

const commentLikeSuccess = () => {
  return { type: COMMENT_LIKE_SUCCESS };
};

const commentLikeFailure = () => {
  return { type: COMMENT_LIKE_FAILURE };
};

// 대댓글 등록
const commentChildAddStart = () => {
  return { type: COMMENT_CHILD_ADD };
};

const commentChildAddSuccess = (list, more, total) => {
  return {
    type: COMMENT_CHILD_ADD_SUCCESS,
    list: list,
    more: more,
    total: total,
  };
};

const commentChildAddFailure = () => {
  return { type: COMMENT_CHILD_ADD_FAILURE };
};

// 댓글 등록 요청
export const commentAdd = (data) => async (dispatch) => {
  dispatch(commentAddStart());
  await axios
    .post("/comment/add", { ...data })
    .then((response) => {
      dispatch(
        commentAddSuccess(
          response.data.list,
          response.data.more,
          response.data.total
        )
      );
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
      dispatch(
        commentDeleteSuccess(
          response.data.list,
          response.data.more,
          response.data.total
        )
      );
    })
    .catch((error) => {
      dispatch(commentDeleteFailure());
      console.error(error);
    });
};

// 댓글 목록 조회 요청
export const commentListLoader = (story_id, section) => async (dispatch) => {
  dispatch(commentListLoadStart());
  await axios
    .get(`/comment/list/${story_id}/${section}`)
    .then((response) => {
      dispatch(
        commentListLoadSuccess(
          response.data.list,
          response.data.more,
          response.data.total
        )
      );
    })
    .catch((error) => {
      dispatch(commentListLoadFailure());
      console.error(error);
    });
};

// 댓글 좋아요 추가/제거 요청
export const commentLike = (id) => async (dispatch) => {
  dispatch(commentLikeStart());
  await axios
    .put("/comment/like", { comment_id: id })
    .then(() => {
      dispatch(commentLikeSuccess());
    })
    .catch((error) => {
      console.log(error);
      dispatch(commentLikeFailure());
    });
};

// 대댓글 등록 요청
export const commentChildAdd = (data) => async (dispatch) => {
  dispatch(commentChildAddStart());
  await axios
    .post("/comment/child/add", { ...data })
    .then((response) => {
      dispatch(
        commentChildAddSuccess(
          response.data.list,
          response.data.more,
          response.data.total
        )
      );
    })
    .catch((error) => {
      dispatch(commentChildAddFailure());
    });
};
