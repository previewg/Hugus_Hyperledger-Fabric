import axios from "axios";


// Action Type
export const COMMENT_ADD = "COMMENT_ADD";
export const COMMENT_ADD_SUCCESS = "COMMENT_ADD_SUCCESS";
export const COMMENT_ADD_FAILURE = "COMMENT_ADD_FAILURE";


export const COMMEMT_DELETE = "COMMENT_DELETE";

const commentAddStart = () => {
    return { type: COMMENT_ADD };
  };
  
  const commentAddSuccess = () => {
    return { type: COMMENT_ADD_SUCCESS };
  };
  
  const commentAddFailure = () => {
    return { type: COMMENT_ADD_FAILURE };
  };

  
// 게시물 등록
export const commentAdd = (data) => async (dispatch) => {
    dispatch(commentAddStart());
    await axios
      .post("/comment/add", {...data} )
      .then((response) => {
        dispatch(commentAddSuccess());
      })
      .catch((error) => {
        dispatch(commentAddFailure());
      });
  };
 
  // 게시물 삭제
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