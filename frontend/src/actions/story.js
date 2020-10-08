import axios from "axios";

// Action Type
export const STORY_ADD = "STORY_ADD";
export const STORY_ADD_SUCCESS = "STORY_ADD_SUCCESS";
export const STORY_ADD_FAILURE = "STORY_ADD_FAILURE";

export const STORY_LIST_LOAD = "STORY_LIST_LOAD";
export const STORY_LIST_LOAD_SUCCESS = "STORY_LIST_LOAD_SUCCESS";
export const STORY_LIST_LOAD_FAILURE = "STORY_LIST_LOAD_FAILURE";

export const STORY_LOAD = "STORY_LOAD";
export const STORY_LOAD_SUCCESS = "STORY_LOAD_SUCCESS";
export const STORY_LOAD_FAILURE = "STORY_LOAD_FAILURE";

export const STORY_LIKE = "STORY_LIKE";
export const STORY_LIKE_SUCCESS = "STORY_LIKE_SUCCESS";
export const STORY_LIKE_FAILURE = "STORY_LIKE_FAILURE";

export const STORY_VOTE = "STORY_VOTE";
export const STORY_VOTE_SUCCESS = "STORY_VOTE_SUCCESS";
export const STORY_VOTE_FAILURE = "STORY_VOTE_FAILURE";

export const STORY_DELETE = "STORY_DELETE";
export const STORY_UPDATE = "STORY_UPDATE";

const storyAddStart = () => {
  return { type: STORY_ADD };
};

const storyAddSuccess = () => {
  return { type: STORY_ADD_SUCCESS };
};

const storyAddFailure = () => {
  return { type: STORY_ADD_FAILURE };
};

const storyListLoadStart = () => {
  return { type: STORY_LIST_LOAD };
};

const storyListLoadSuccess = (list, status) => {
  return { type: STORY_LIST_LOAD_SUCCESS, list: list, status: status };
};

const storyListLoadFailure = () => {
  return { type: STORY_LIST_LOAD_FAILURE };
};

const storyLikeStart = () => {
  return { type: STORY_LIKE };
};

const storyLikeSuccess = () => {
  return { type: STORY_LIKE_SUCCESS };
};

const storyLikeFailure = () => {
  return { type: STORY_LIKE_FAILURE };
};

const storyVoteStart = () => {
  return { type: STORY_VOTE };
};

const storyVoteSuccess = () => {
  return { type: STORY_VOTE_SUCCESS };
};

const storyVoteFailure = () => {
  return { type: STORY_VOTE_FAILURE };
};

const storyLoadStart = () => {
  return { type: STORY_LOAD };
};

const storyLoadSuccess = (data) => {
  return {
    type: STORY_LOAD_SUCCESS,
    data: data.data,
    like: data.like,
    likeNum: data.likeNum,
    vote: data.vote,
    voteNum: data.voteNum,
  };
};

const storyLoadFailure = () => {
  return { type: STORY_LOAD_FAILURE };
};

// 게시물 등록
export const storyAdd = (data, props) => async (dispatch) => {
  dispatch(storyAddStart());
  await axios
    .post("/story/add", data, {
      headers: { "content-type": "multipart/form-data" },
    })
    .then((response) => {
      alert("성공적으로 등록되었습니다.");
      props.history.push("/story");
      dispatch(storyAddSuccess());
    })
    .catch((error) => {
      dispatch(storyAddFailure());
    });
};

// 게시물 삭제
export const storyDelete = () => async (dispatch) => {
  await axios
    .delete("/story/delete")
    .then((response) => {
      console.log("성공적으로 삭제되었습니다.");
    })
    .catch((error) => {
      console.log("삭제에 실패하였습니다.");
    });
};

// 게시물 수정
export const storyUpdate = ({ data }) => async (dispatch) => {
  await axios
    .put("/story/update", { data })
    .then((response) => {
      alert("성공적으로 수정되었습니다.");
    })
    .catch((error) => {
      alert("수정에 실패하였습니다.");
    });
};

// 게시물 목록 조회
export const storyListLoader = (section) => async (dispatch) => {
  console.log(section);
  dispatch(storyListLoadStart());
  await axios
    .get(`/story/list/${section}`)
    .then((response) => {
      let status = true;
      if (response.data.list.length !== 18) status = false;
      dispatch(storyListLoadSuccess(response.data.list, status));
    })
    .catch((error) => {
      console.log(error);
      dispatch(storyListLoadFailure());
    });
};

// 게시물 상세 조회
export const storyLoader = (id) => async (dispatch) => {
  dispatch(storyLoadStart());
  await axios
    .get(`/story/${id}`)
    .then((response) => {
      console.log(response.data);
      dispatch(storyLoadSuccess(response.data));
    })
    .catch((error) => {
      console.log(error);
      dispatch(storyLoadFailure());
    });
};

// 게시물 조회수
export const storyVisit = (id) => async (dispatch) => {
  await axios
    .put("/story/visit", { story_id: id })
    .then((response) => null)
    .catch((error) => console.log(error));
};

// 게시물 좋아요
export const storyLike = (id, status) => async (dispatch) => {
  dispatch(storyLikeStart());
  await axios
    .put("/story/like", { story_id: id, status: status })
    .then((response) => {
      dispatch(storyLikeSuccess());
    })
    .catch((error) => {
      console.log(error);
      dispatch(storyLikeFailure());
    });
};

// 게시물 투표
export const storyVote = (id, status) => async (dispatch) => {
  dispatch(storyVoteStart());
  await axios
    .put("/story/vote", { story_id: id, status: status })
    .then((response) => {
      dispatch(storyVoteSuccess());
    })
    .catch((error) => {
      console.log(error);
      dispatch(storyVoteFailure());
    });
};
