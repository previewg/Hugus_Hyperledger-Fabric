import {
  STORY_ADD,
  STORY_ADD_FAILURE,
  STORY_ADD_SUCCESS,
  STORY_DELETE,
  STORY_DELETE_SUCCESS,
  STORY_DELETE_FAILURE,
  STORY_LIST_LOAD,
  STORY_LIST_LOAD_SUCCESS,
  STORY_LIST_LOAD_FAILURE,
  STORY_LOAD_INIT,
  STORY_LOAD,
  STORY_LOAD_SUCCESS,
  STORY_LOAD_FAILURE,
  STORY_LIKE,
  STORY_LIKE_SUCCESS,
  STORY_LIKE_FAILURE,
  STORY_VOTE,
  STORY_VOTE_SUCCESS,
  STORY_VOTE_FAILURE,
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
  detail: {
    status: "INIT",
    data: null,
  },
  like: {
    user: false,
    status: "INIT",
    likeNum: 0,
  },
  vote: {
    user: false,
    status: "INIT",
    voteNum: 0,
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

    case STORY_DELETE:
      return update(state, {
        delete: {
          status: { $set: "WAITING" },
        },
      });

    case STORY_DELETE_SUCCESS:
      return update(state, {
        delete: {
          status: { $set: "SUCCESS" },
        },
      });

    case STORY_DELETE_FAILURE:
      return update(state, {
        delete: {
          status: { $set: "FAILURE" },
        },
      });

    case STORY_LIST_LOAD:
      return update(state, {
        list: {
          status: { $set: "WAITING" },
        },
        like: {
          status: { $set: "WAITING" },
        },
      });

    case STORY_LIST_LOAD_SUCCESS:
      let newData = state.list.data.concat(action.list);
      if (action.status === true) {
        return update(state, {
          list: {
            status: { $set: "SUCCESS" },
            data: { $set: newData },
            num: { $set: state.list.num + 1 },
          },
        });
      } else if (state.list.num === 1 && action.status === false) {
        return update(state, {
          list: {
            status: { $set: "SUCCESS" },
            data: { $set: action.list },
          },
        });
      } else {
        return update(state, {
          list: {
            status: { $set: "SUCCESS" },
          },
        });
      }

    case STORY_LIST_LOAD_FAILURE:
      return update(state, {
        list: {
          status: { $set: "FAILURE" },
        },
      });

    case STORY_LOAD_INIT:
      return update(state, {
        detail: {
          status: { $set: "INIT" },
        },
      });

    case STORY_LOAD:
      return update(state, {
        detail: {
          status: { $set: "WAITING" },
        },
      });

    case STORY_LOAD_SUCCESS:
      return update(state, {
        detail: {
          status: { $set: "SUCCESS" },
          data: { $set: action.data },
        },
        like: {
          status: { $set: "SUCCESS" },
          user: { $set: action.like },
          likeNum: { $set: action.likeNum },
        },
        vote: {
          status: { $set: "SUCCESS" },
          user: { $set: action.vote },
          voteNum: { $set: action.voteNum },
        },
      });

    case STORY_LOAD_FAILURE:
      return update(state, {
        detail: {
          status: { $set: "FAILURE" },
        },
      });

    case STORY_LIKE:
      return update(state, {
        like: {
          status: { $set: "WAITING" },
        },
      });

    case STORY_LIKE_SUCCESS:
      let num;
      if (state.like.user) num = state.like.likeNum - 1;
      else num = state.like.likeNum + 1;

      return update(state, {
        like: {
          status: { $set: "SUCCESS" },
          user: { $set: !state.like.user },
          likeNum: { $set: num },
        },
      });

    case STORY_LIKE_FAILURE:
      return update(state, {
        like: {
          status: { $set: "FAILURE" },
        },
      });

    case STORY_VOTE:
      return update(state, {
        vote: {
          status: { $set: "WAITING" },
        },
      });

    case STORY_VOTE_SUCCESS:
      let voteNum;
      if (state.vote.user) voteNum = state.vote.voteNum - 1;
      else voteNum = state.vote.voteNum + 1;

      return update(state, {
        vote: {
          status: { $set: "SUCCESS" },
          user: { $set: !state.vote.user },
          voteNum: { $set: voteNum },
        },
      });

    case STORY_VOTE_FAILURE:
      return update(state, {
        vote: {
          status: { $set: "FAILURE" },
        },
      });

    default:
      return state;
  }
}
