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
  COMMENT_LIST_INIT,
  COMMENT_LIKE_START,
  COMMENT_LIKE_SUCCESS,
  COMMENT_LIKE_FAILURE,
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
    total: 0,
    status: "INIT",
    data: [],
    num: 1,
    more: false,
  },
  like: {
    user: false,
    status: "INIT",
  },
  child_add: {
    status: "INIT",
  },
};

export default function comment(state = initialState, action) {
  switch (action.type) {
    case COMMENT_LIST_INIT:
      return {
        add: {
          status: "INIT",
        },
        delete: {
          status: "INIT",
        },
        list: {
          total: 0,
          status: "INIT",
          data: [],
          num: 1,
          more: false,
        },
        child_add: {
          status: "INIT",
        },
      };
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
          total: { $set: action.total },
          more: { $set: action.more },
          num: { $set: 2 },
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
      const newData = state.list.data.concat(action.list);
      if (action.more) {
        return update(state, {
          list: {
            status: { $set: "SUCCESS" },
            data: { $set: newData },
            num: { $set: state.list.num + 1 },
            more: { $set: true },
            total: { $set: action.total },
          },
        });
      } else {
        if (state.list.data.length % 10 !== action.list.length % 10) {
          return update(state, {
            list: {
              status: { $set: "SUCCESS" },
              data: { $set: newData },
              more: { $set: false },
              total: { $set: action.total },
            },
          });
        } else {
          return update(state, {
            list: {
              status: { $set: "SUCCESS" },
              more: { $set: false },
              total: { $set: action.total },
            },
          });
        }
      }

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
          status: { $set: "SUCCESS" },
        },
        list: {
          status: { $set: "SUCCESS" },
          data: { $set: action.list },
          total: { $set: action.total },
          more: { $set: action.more },
          num: { $set: 2 },
        },
      });
    case COMMENT_DELETE_FAILURE:
      return update(state, {
        delete: {
          status: { $set: "FAILURE" },
        },
      });
    case COMMENT_LIKE_START:
      return update(state, {
        like: {
          status: { $set: "WAITING" },
        },
      });
    case COMMENT_LIKE_SUCCESS:
      return update(state, {
        like: {
          user: { $set: !state.like.user },
          status: { $set: "SUCCESS" },
        },
      });
    case COMMENT_LIKE_FAILURE:
      return update(state, {
        like: {
          status: { $set: "FAILURE" },
        },
      });

    case COMMENT_CHILD_ADD:
      return update(state, {
        child_add: {
          status: { $set: "WAITING" },
        },
      });
    case COMMENT_CHILD_ADD_SUCCESS:
      return update(state, {
        child_add: {
          status: { $set: "SUCCESS" },
        },
        list: {
          status: { $set: "SUCCESS" },
          data: { $set: action.list },
          total: { $set: action.total },
          more: { $set: action.more },
          num: { $set: 2 },
        },
      });
    case COMMENT_CHILD_ADD_FAILURE:
      return update(state, {
        child_add: {
          status: { $set: "FAILURE" },
        },
      });
    default:
      return state;
  }
}
