import axios from "axios";

// Action Types
export const STORY_ADD = "STORY_ADD";
export const STORY_ADD_SUCCESS = "STORY_ADD_SUCCESS";
export const STORY_ADD_FAILURE = "STORY_ADD_FAILURE";

export const STORY_LIST_LOAD = "STORY_LIST_LOAD";
export const STORY_LIST_LOAD_SUCCESS = "STORY_LIST_LOAD_SUCCESS";
export const STORY_LIST_LOAD_FAILURE = "STORY_LIST_LOAD_FAILURE";

export const STORY_LIST_LOAD_INIT = "STORY_LIST_LOAD_INIT";
export const STORY_LIST_LOAD_INIT_SUCCESS = "STORY_LIST_LOAD_INIT_SUCCESS";
export const STORY_LIST_LOAD_INIT_FAILURE = "STORY_LIST_LOAD_INIT_FAILURE";

export const STORY_LOAD_INIT = "STORY_LOAD_INIT";
export const STORY_LOAD = "STORY_LOAD";
export const STORY_LOAD_SUCCESS = "STORY_LOAD_SUCCESS";
export const STORY_LOAD_FAILURE = "STORY_LOAD_FAILURE";

export const STORY_LIKE = "STORY_LIKE";
export const STORY_LIKE_SUCCESS = "STORY_LIKE_SUCCESS";
export const STORY_LIKE_FAILURE = "STORY_LIKE_FAILURE";

export const STORY_REPORT = "STORY_REPORT";
export const STORY_REPORT_SUCCESS = "STORY_REPORT_SUCCESS";
export const STORY_REPORT_FAILURE = "STORY_REPORT_FAILURE";

export const STORY_VOTE = "STORY_VOTE";
export const STORY_VOTE_SUCCESS = "STORY_VOTE_SUCCESS";
export const STORY_VOTE_FAILURE = "STORY_VOTE_FAILURE";

export const STORY_DELETE = "STORY_DELETE";
export const STORY_DELETE_SUCCESS = "STORY_ADD_SUCCESS";
export const STORY_DELETE_FAILURE = "STORY_ADD_FAILURE";

export const STORY_UPDATE = "STORY_UPDATE";
export const STORY_UPDATE_SUCCESS = "STORY_ADD_SUCCESS";
export const STORY_UPDATE_FAILURE = "STORY_ADD_FAILURE";

// 게시물 등록
const storyAddStart = () => {
  return { type: STORY_ADD };
};

const storyAddSuccess = () => {
  return { type: STORY_ADD_SUCCESS };
};

const storyAddFailure = () => {
  return { type: STORY_ADD_FAILURE };
};

// 게시물 수정
const storyUpdateStart = () => {
  return { type: STORY_UPDATE };
};

const storyUpdateSuccess = () => {
  return { type: STORY_UPDATE_SUCCESS };
};

const storyUpdateFailure = () => {
  return { type: STORY_UPDATE_FAILURE };
};

// 게시물 삭제
const storyDeleteStart = () => {
  return { type: STORY_DELETE };
};

const storyDeleteSuccess = () => {
  return { type: STORY_DELETE_SUCCESS };
};

const storyDeleteFailure = () => {
  return { type: STORY_DELETE_FAILURE };
};

// 게시물 좋아요
const storyLikeStart = () => {
  return { type: STORY_LIKE };
};

const storyLikeSuccess = () => {
  return { type: STORY_LIKE_SUCCESS };
};

const storyLikeFailure = () => {
  return { type: STORY_LIKE_FAILURE };
};
// 게시물 신고하기
const storyReportStart = () => {
  return { type: STORY_REPORT };
};

const storyReportSuccess = () => {
  return { type: STORY_REPORT_SUCCESS };
};

const storyReportFailure = () => {
  return { type: STORY_REPORT_FAILURE };
};

// 게시물 투표
const storyVoteStart = () => {
  return { type: STORY_VOTE };
};

const storyVoteSuccess = () => {
  return { type: STORY_VOTE_SUCCESS };
};

const storyVoteFailure = () => {
  return { type: STORY_VOTE_FAILURE };
};

// 게시물 상세 정보
export const storyLoadInit = () => {
  return { type: STORY_LOAD_INIT };
};

export const storyLoadStart = () => {
  return { type: STORY_LOAD };
};

const storyLoadSuccess = (data) => {
  return {
    type: STORY_LOAD_SUCCESS,
    data: data.data,
    like: data.like,
    likeNum: data.data.story_like,
    report: data.report,
    reportNum: data.data.story_report,
    vote: data.vote,
    voteNum: data.data.story_vote,
  };
};

const storyLoadFailure = () => {
  return { type: STORY_LOAD_FAILURE };
};

// 게시물 등록 요청
export const storyAdd = (data, props) => async (dispatch) => {
  dispatch(storyAddStart());
  await axios
    .post("/story/add", data, {
      headers: { "content-type": "multipart/form-data" },
    })
    .then(() => {
      alert("성공적으로 등록되었습니다.");
      props.history.push("/story");
      dispatch(storyAddSuccess());
    })
    .catch((error) => {
      alert("등록에 실패했습니다.");
      dispatch(storyAddFailure());
      console.error(error);
    });
};

// 게시물 삭제 요청
export const storyDelete = (id, history) => async (dispatch) => {
  dispatch(storyDeleteStart());
  await axios
    .post(`/story/delete`, { id: id })
    .then(() => {
      alert("성공적으로 삭제되었습니다.");
      history.push("/story");
      dispatch(storyDeleteSuccess());
    })
    .catch((error) => {
      alert("삭제에 실패하였습니다.");
      dispatch(storyDeleteFailure());
      console.error(error);
    });
};

// 게시물 수정 요청
export const storyUpdate = (data, props) => async (dispatch) => {
  dispatch(storyUpdateStart());
  await axios
    .post("/story/update", data, {
      headers: { "content-type": "multipart/form-data" },
    })
    .then(() => {
      alert("성공적으로 수정되었습니다.");
      props.history.push("/story");
      dispatch(storyUpdateSuccess());
    })
    .catch((error) => {
      alert("수정에 실패했습니다.");
      dispatch(storyUpdateFailure());
      console.error(error);
    });
};

// 게시물 상세 조회 요청
export const storyLoader = (id) => async (dispatch) => {
  dispatch(storyLoadStart());
  await axios
    .get(`/story/${id}`)
    .then((response) => {
      dispatch(storyLoadSuccess(response.data));
    })
    .catch((error) => {
      dispatch(storyLoadFailure());
      console.log(error);
    });
};

// 게시물 좋아요 추가/제거 요청
export const storyLike = (id) => async (dispatch) => {
  dispatch(storyLikeStart());
  await axios
    .put("/story/like", { story_id: id })
    .then(() => {
      dispatch(storyLikeSuccess());
    })
    .catch((error) => {
      console.log(error);
      dispatch(storyLikeFailure());
    });
};
//게시물 신고하기 
export const storyReport = (data ) => async (dispatch) => {
  dispatch(storyReportStart());
  await axios
    .put("/story/report", { ...data})
    .then((res) => {
      console.log(res)
      dispatch(storyReportSuccess());
    })
    .catch((error) => {
      console.log(error);
      dispatch(storyReportFailure());
    });
};

// 게시물 투표 요청
export const storyVote = (id, status) => async (dispatch) => {
  dispatch(storyVoteStart());
  await axios
    .put("/story/vote", { story_id: id, status: status })
    .then(() => {
      dispatch(storyVoteSuccess());
    })
    .catch((error) => {
      console.error(error);
      dispatch(storyVoteFailure());
    });
};
