import axios from "axios";

export const MY_LIST_LOADER = "MY_LIST_LOADER";
export const MY_LIST_LOADER_SUCCESS = "MY_LIST_LOADER_SUCCESS";
export const MY_LIST_LOADER_FAILURE = "MY_LIST_LOADER_FAILURE";

//MY PAGE 리스트
export const myListLoaderStart = () => {
  return { type: MY_LIST_LOADER };
};
export const myListLoaderSuccess = (list) => {
  return { type: MY_LIST_LOADER_SUCCESS, list: list };
};
export const myListLoaderFailure = (error) => {
  return { type: MY_LIST_LOADER_FAILURE };
};
//MY PAGE 리스트 요청

export const myListRequest = (username) => async (dispatch) => {
  dispatch(myListLoaderStart());
  await axios
    .post("/myPage/myWriting", { username: username })
    .then((response) => {
      dispatch(myListLoaderSuccess(response.data.list));
    })
    .catch((error) => {
      dispatch(myListLoaderFailure(error));
    });
};
