import axios from "axios";


// Action Type
export const COMMENT_ADD = "COMMENT_ADD";
export const COMMENT_ADD_SUCCESS = "COMMENT_ADD_SUCCESS";
export const COMMENT_ADD_FAILURE = "COMMENT_ADD_FAILURE";
export const COMMENT_LIST_LOAD = "COMMENT_LIST_LOAD";
export const COMMENT_LIST_LOAD_SUCCESS = "COMMENT_LIST_LOAD_SUCCESS";
export const COMMENT_LIST_LOAD_FAILURE = "COMMENT_LIST_LOAD_FAILURE";


export const COMMEMT_DELETE = "COMMENT_DELETE";

const commentAddStart = () => {
    return { type: COMMENT_ADD };
  };
  
  const commentAddSuccess = (list) => {
    return { type: COMMENT_ADD_SUCCESS, list: list  };
  };
  
  const commentAddFailure = () => {
    return { type: COMMENT_ADD_FAILURE };
  };
    
  const commentListLoadStart = () => {
    return { type: COMMENT_LIST_LOAD };
  };

  const commentListLoadSuccess = (list) => {
    return { type: COMMENT_LIST_LOAD_SUCCESS, list: list };
  };

  const commentListLoadFailure = () => {
    return { type: COMMENT_LIST_LOAD_FAILURE };
  };


// 댓글 등록
export const commentAdd = (data) => async (dispatch) => {
    dispatch(commentAddStart());
    await axios
      .post("/comment/add", {...data} )
      .then((response) => {
        dispatch(commentAddSuccess(response.data.list));
      })
      .catch((error) => {
        dispatch(commentAddFailure());
      });
  };
 
  // 댓글 삭제
export const commentDelete = () => async (dispatch) => {
    await axios
      .delete("/comment/delete")
      .then((response) => {
        console.log("성공적으로 삭제되었습니다.");
      })
      .catch((error) => {
        console.log("삭제에 실패하였습니다.");
      });
  };

  
// 댓글 목록 조회
export const commentListLoader = (story_id) => async (dispatch) => {
  dispatch(commentListLoadStart());
  await axios
    .get(`/comment/list/${story_id}`)
    .then((response) => {
      dispatch(commentListLoadSuccess(response.data.list));
    })
    .catch((error) => {
      console.log(error);
      dispatch(commentListLoadFailure());
    });
};