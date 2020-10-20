import axios from "axios";

// Action Types
export const HASHTAG_LIST_LOAD = "HASHTAG_LIST_LOAD";
export const HASHTAG_LIST_LOAD_SUCCESS = "HASHTAG_LIST_LOAD_SUCCESS";
export const HASHTAG_LIST_LOAD_FAILURE = "HASHTAG_LIST_LOAD_FAILURE";

//hashtag search
export const HASHTAG_SEARCH_LOAD = "HASHTAG_SEARCH_LOAD";
export const HASHTAG_SEARCH_LOAD_SUCCESS = "HASHTAG_SEARCH_LOAD_SUCCESS";
export const HASHTAG_SEARCH_LOAD_FAILURE = "HASHTAG_SEARCH_LOAD_FAILURE";


// 해시태그 목록 조회
const hashtagListLoadStart = () => {
    return {type: HASHTAG_LIST_LOAD};
};

const hashtagListLoadSuccess = (list) => {
    return {type: HASHTAG_LIST_LOAD_SUCCESS, list: list};
};

const hashtagListLoadFailure = () => {
    return {type: HASHTAG_LIST_LOAD_FAILURE};
};
//해시태그 검색 조회
const hashtagSearchLoadStart = () => {
    return {type: HASHTAG_SEARCH_LOAD};
};

const hashtagSearchLoadSuccess = (list) => {
    return {type: HASHTAG_SEARCH_LOAD_SUCCESS, list: list};
};

const hashtagSearchLoadFailure = () => {
    return {type: HASHTAG_SEARCH_LOAD_FAILURE};
};

// 해시태그 전체 목록 조회 요청
export const hashtagAll = () => async (dispatch) => {
    dispatch(hashtagListLoadStart());
    await axios
        .get("/hashtag/all")
        .then((response) => {
            dispatch(hashtagListLoadSuccess(response.data.list));
        })
        .catch((error) => {
            dispatch(hashtagListLoadFailure());
            console.error(error);
        });
};
//해시태그 검색 목록 조회 요청
export const hashtagSearch = (search) => async (dispatch) => {
    dispatch(hashtagSearchLoadStart());
    await axios
        .post("/hashtag/search", {search})
        .then((response) => {
            dispatch(hashtagSearchLoadSuccess(response.data.list));
        })
        .catch((error) => {
            dispatch(hashtagSearchLoadFailure());
            console.log(error)
        })
}
