import axios from "axios";

export const BLOCK_LIST_LOADER = "BLOCK_LIST_LOADER_LOADER";
export const BLOCK_LIST_LOADER_SUCCESS = "BLOCK_LIST_LOADER_SUCCESS";
export const BLOCK_LIST_LOADER_FAILURE = "BLOCK_LIST_LOADER_FAILURE";
export const BLOCK_LIST_SEARCH_LOADER = "BLOCK_LIST_SEARCH_LOADER_LOADER";
export const BLOCK_LIST_SEARCH_LOADER_SUCCESS = "BLOCK_LIST_SEARCH_LOADER_SUCCESS";
export const BLOCK_LIST_SEARCH_LOADER_FAILURE = "BLOCK_LIST_SEARCH_LOADER_FAILURE";

export const blockListLoaderStart = () => {
    return {type: BLOCK_LIST_LOADER};
}
export const blockListLoaderSuccess = (list) => {
    return {type: BLOCK_LIST_LOADER_SUCCESS, list: list};
}
export const blockListLoaderFailure = () => {
    return {type: BLOCK_LIST_LOADER_FAILURE};
}
export const blockListSearchLoaderStart = () => {
    return {type: BLOCK_LIST_SEARCH_LOADER};
}
export const blockListSearchLoaderSuccess = (list) => {
    return {type: BLOCK_LIST_SEARCH_LOADER_SUCCESS, list: list};
}
export const blockListSearchLoaderFailure = () => {
    return {type: BLOCK_LIST_SEARCH_LOADER_FAILURE};
}


export const blockListLoader = () => async (dispatch) => {
    dispatch(blockListLoaderStart());
    await axios
        .post("/block/Info")
        .then((response) => {
            if (response.data.success === 1) {
                dispatch(blockListLoaderSuccess(response.data.data))
            }
        })
        .catch((error) => {
            dispatch(blockListLoaderFailure(error))
        })
        .post("/block/List")
        .then((response) => {
            if (response.data.success === 1) {
                dispatch(blockListLoaderSuccess(response.data.data))
            }
        })
        .catch((error) => {
            dispatch(blockListLoaderFailure(error))
        })

}
export const blockListSearchLoader = (word,type) => async (dispatch) => {
    dispatch(blockListSearchLoaderStart());
    await axios
        .post(`/block/search/tx`,{word:word})
        .then((response) => {
            if (response.data.success === 1) {
                dispatch(blockListSearchLoaderSuccess(response.data.list))
            }
        })
        .catch((error) => {
            dispatch(blockListSearchLoaderFailure(error))
        })

}