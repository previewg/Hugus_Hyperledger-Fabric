import {
    BLOCK_LIST_LOADER,
    BLOCK_LIST_LOADER_SUCCESS,
    BLOCK_LIST_LOADER_FAILURE
} from "../actions/block";
import update from "react-addons-update"

const initialState = {
    blockList: {
        status: "INIT",
        list: []
    }
}
export default function block(state = initialState, action) {
    switch (action.type) {
        case BLOCK_LIST_LOADER:
            return update(state, {
                blockList: {
                    status: {$set: "WAITING"},
                },
            });
        case BLOCK_LIST_LOADER_SUCCESS:
            return update(state, {
                blockList: {
                    status: {$set: "SUCCESS"},
                    list: {$set: action.list}
                },
            });
        case BLOCK_LIST_LOADER_FAILURE:
            return update(state, {
                blockList: {
                    status: {$set: "FAILURE"},
                },
            });
        default:
            return state;
    }
}