import {
  STORY_ADD,
  STORY_ADD_FAILURE,
  STORY_ADD_SUCCESS,
} from "../actions/story";

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
};

export default function story(state = initialState, action) {
  switch (action.type) {
    case STORY_ADD:
      return {
        add: {
          status: "WAITING",
        },
      };
    case STORY_ADD_SUCCESS:
      return {
        add: {
          status: "SUCCESS",
        },
      };
    case STORY_ADD_FAILURE:
      return {
        add: {
          status: "FAILURE",
        },
      };
    default:
      return state;
  }
}
