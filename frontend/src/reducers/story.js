import {
  STORY_ADD,
  STORY_ADD_FAILURE,
  STORY_ADD_SUCCESS,
  STORY_LIST_LOAD,
  STORY_LIST_LOAD_SUCCESS,
  STORY_LIST_LOAD_FAILURE,
  STORY_LIST_NUM_INCREASE,
} from "../actions/story";
import update from "react-addons-update";

const initialState = {
  add: {
    status: "INIT",
  },
  delete: {
    status: "INIT",
  },
  update: {
    status: "INIT",
  },
  list: {
    status: "INIT",
    data: [],
    num: 1,
  },
};

export default function story(state = initialState, action) {
  switch (action.type) {
    case STORY_ADD:
      return update(state, {
        add: {
          status: { $set: "WAITING" },
        },
      });

    case STORY_ADD_SUCCESS:
      return update(state, {
        add: {
          status: { $set: "SUCCESS" },
        },
      });

    case STORY_ADD_FAILURE:
      return update(state, {
        add: {
          status: { $set: "FAILURE" },
        },
      });

    case STORY_LIST_LOAD:
      return update(state, {
        list: {
          status: { $set: "WAITING" },
        },
      });

    case STORY_LIST_LOAD_SUCCESS:
      let newData = state.list.data.concat(action.list);
      return update(state, {
        list: {
          status: { $set: "SUCCESS" },
          data: { $set: newData },
        },
      });

    case STORY_LIST_LOAD_FAILURE:
      return update(state, {
        list: {
          status: { $set: "FAILURE" },
        },
      });

    case STORY_LIST_NUM_INCREASE:
      return update(state, {
        list: {
          num: { $set: +1 },
        },
      });

    default:
      return state;
  }
}
