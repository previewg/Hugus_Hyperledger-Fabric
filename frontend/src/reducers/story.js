import {
  STORY_ADD,
  STORY_ADD_FAILURE,
  STORY_ADD_SUCCESS,
  STORY_DELETE,
  STORY_DELETE_SUCCESS,
  STORY_DELETE_FAILURE,
  STORY_LOAD_INIT,
  STORY_LOAD,
  STORY_LOAD_SUCCESS,
  STORY_LOAD_FAILURE,
  STORY_LIKE,
  STORY_LIKE_SUCCESS,
  STORY_LIKE_FAILURE,
  STORY_REPORT,
  STORY_REPORT_SUCCESS,
  STORY_REPORT_FAILURE,
  STORY_VOTE,
  STORY_VOTE_SUCCESS,
  STORY_VOTE_FAILURE,
  STORY_UPDATE,
  STORY_UPDATE_SUCCESS,
  STORY_UPDATE_FAILURE,
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
  detail: {
    status: "INIT",
    data: null,
  },
  like: {
    user: false,
    status: "INIT",
    likeNum: 0,
  },
  report: {
    user: false,
    status: "INIT",
    reportNum: 0,
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

    case STORY_UPDATE:
      return update(state, {
        update: {
          status: { $set: "WAITING" },
        },
      });

    case STORY_UPDATE_SUCCESS:
      return update(state, {
        update: {
          status: { $set: "SUCCESS" },
        },
      });

    case STORY_UPDATE_FAILURE:
      return update(state, {
        update: {
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
        report: {
          status: { $set: "SUCCESS" },
          user: { $set: action.like },
          reportNum: { $set: action.reportNum },
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

    case STORY_REPORT:
      return update(state, {
        report: {
          status: { $set: "WAITING" },
        },
      });

    case STORY_REPORT_SUCCESS:
      let renum;
      if (state.report.user) renum = state.report.reportNum -1 ;
      else renum = state.report.reportNum + 1;

      return update(state, {
        report: {
          status: { $set: "SUCCESS" },
          user: { $set: !state.report.user },
          reportNum: { $set: renum },
        },
      });

    case STORY_REPORT_FAILURE:
      return update(state, {
        report: {
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
