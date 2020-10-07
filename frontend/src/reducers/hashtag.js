import {
  HASHTAG_LIST_LOAD,
  HASHTAG_LIST_LOAD_FAILURE,
  HASHTAG_LIST_LOAD_SUCCESS,
} from "../actions/hashtag";
import update from "react-addons-update";

const initialState = {
  list: {
    status: "INIT",
    data: [],
  },
};

export default function hashtag(state = initialState, action) {
  switch (action.type) {
    case HASHTAG_LIST_LOAD:
      return update(state, {
        list: {
          status: { $set: "WAITING" },
        },
      });

    case HASHTAG_LIST_LOAD_SUCCESS:
      return update(state, {
        list: {
          status: { $set: "SUCCESS" },
          data: { $set: action.list },
        },
      });

    case HASHTAG_LIST_LOAD_FAILURE:
      return update(state, {
        list: {
          status: { $set: "FAILURE" },
        },
      });
    default:
      return state;
  }
}
