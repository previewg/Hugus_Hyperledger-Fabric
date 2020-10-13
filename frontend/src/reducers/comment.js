import {
  COMMENT_ADD,
  COMMENT_ADD_SUCCESS,
  COMMENT_ADD_FAILURE,
  COMMENT_LIST_LOAD,
  COMMENT_LIST_LOAD_SUCCESS,
  COMMENT_LIST_LOAD_FAILURE,
  COMMENT_DELETE,
  COMMENT_DELETE_SUCCESS,
  COMMENT_DELETE_FAILURE,
  COMMENT_CHILD_ADD,
  COMMENT_CHILD_ADD_SUCCESS,
  COMMENT_CHILD_ADD_FAILURE,

} from "../actions/comment";
import update from "react-addons-update";

const initialState = {
  add: {
    status: "INIT",
  },
  delete: {
    status: "INIT",
  },
  list: {
    status: "INIT",
    data: [],
  },
};

export default function comment(state = initialState, action) {
  switch (action.type) {
    case COMMENT_ADD:
      return update(state, {
        add: {
          status: { $set: "WAITING" },
        },
      });
      case COMMENT_ADD_SUCCESS:
        return update(state, {
          add: {
            status: { $set: "SUCCESS" },
          },
          list: {
            status: { $set: "SUCCESS" },
            data: { $set: action.list },
          },
        });
      case COMMENT_ADD_FAILURE:
        return update(state, {
          add: {
            status: { $set: "FAILURE" },
          },
        });
        case COMMENT_LIST_LOAD:
          return update(state, {
            list: {
              status: { $set: "WAITING" },
            },
          });
    
        case COMMENT_LIST_LOAD_SUCCESS:
          return update(state, {
            list: {
              status: { $set: "SUCCESS" },
              data: { $set: action.list },
            },
          });
      case COMMENT_LIST_LOAD_FAILURE:
        return update(state, {
          list: {
            status: { $set: "FAILURE" },
          },
        });
        case COMMENT_DELETE:
          return update(state, {
            delete: {
              status: { $set: "WAITING" },
            },
          });
      case COMMENT_DELETE_SUCCESS:
        return update(state, {
          delete: {
            status:{ $set: "SUCCESS" },
          },
          list: {
            status: { $set: "SUCCESS" },
            data: { $set: action.list },
          },
        });
        case COMMENT_DELETE_FAILURE:
          return update(state, {
            list: {
              status: { $set: "FAILURE" },
            },
          });
        case COMMENT_CHILD_ADD:
        return update(state, {
          add: {
            status: { $set: "WAITING" },
          },
        });
      case COMMENT_CHILD_ADD_SUCCESS:
        return update(state, {
          add: {
            status: { $set: "SUCCESS" },
          },
          list: {
            status: { $set: "SUCCESS" },
            data: { $set: action.reComment },
          },
        });
      case COMMENT_CHILD_ADD_FAILURE:
        return update(state, {
          add: {
            status: { $set: "FAILURE" },
          },
        });
    default:
      return state;
  }
}
