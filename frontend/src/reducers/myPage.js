import {
    MY_LIST_LOADER,
    MY_LIST_LOADER_SUCCESS,
    MY_LIST_LOADER_FAILURE, myListLoaderFailure,

} from "../actions/myPage";

import update from "react-addons-update";

const initialState = {
    pageList: {
        status: "INIT",
        list: ''
    },
}

export default function myPage(state = initialState, action) {
    switch (action.type) {
        case MY_LIST_LOADER:
            return update(state, {
                pageList: {
                    status: {$set: "WAITING"},
                },
            });
        case MY_LIST_LOADER_SUCCESS:
            return update(state, {
                pageList: {
                    status: {$set: "SUCCESS"},
                    list: {$set: action.list}
                },
            });
        case MY_LIST_LOADER_FAILURE:
            return update(state, {
                pageList: {
                    status: {$set: "FAILURE"},
                }
            });
        default:
            return state;
    }
}


