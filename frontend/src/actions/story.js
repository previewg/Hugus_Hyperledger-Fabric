import axios from "axios";

// Action Type
export const STORY_ADD = "STORY_ADD";
export const STORY_ADD_SUCCESS = "STORY_ADD_SUCCESS";
export const STORY_ADD_FAILURE = "STORY_ADD_FAILURE";

export const STORY_LIST_LOAD = "STORY_LIST_LOAD";
export const STORY_LIST_LOAD_SUCCESS = "STORY_LIST_LOAD_SUCCESS";
export const STORY_LIST_LOAD_FAILURE = "STORY_LIST_LOAD_FAILURE";
export const STORY_LIST_NUM_INCREASE = "STORY_LIST_NUM_INCREASE";

export const STORY_LOAD = "STORY_LOAD";
export const STORY_LOAD_SUCCESS = "STORY_LOAD_SUCCESS";
export const STORY_LOAD_FAILURE = "STORY_LOAD_FAILURE";

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

const storyListLoadSuccess = (list) => {
  return { type: STORY_LIST_LOAD_SUCCESS, list: list };
};

const storyListLoadFailure = () => {
  return { type: STORY_LIST_LOAD_FAILURE };
};

export const storyListNumIncrease = () => {
  return { type: STORY_LIST_NUM_INCREASE };
};

const storyLoadStart = () => {
  return { type: STORY_LOAD };
};

const storyLoadSuccess = (data) => {
  return { type: STORY_LOAD_SUCCESS, data: data };
};

const storyLoadFailure = () => {
  return { type: STORY_LOAD_FAILURE };
};

// 게시물 등록
export const storyAdd = (data) => async (dispatch) => {
  dispatch(storyAddStart());
  await axios
    .post("/story/add", data, {
      headers: { "content-type": "multipart/form-data" },
    })
    .then((response) => {
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
      dispatch(storyListLoadSuccess(response.data.list));
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
      console.log(response);
      dispatch(storyLoadSuccess(response.data.data));
    })
    .catch((error) => {
      console.log(error);
      dispatch(storyLoadFailure());
    });
};
