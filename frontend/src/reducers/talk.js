import {
    TALK_LOAD_INIT,
    TALK_LOAD,
    TALK_LOAD_SUCCESS,
    TALK_LOAD_FAILURE,
    TALK_LIKE,
    TALK_LIKE_SUCCESS,
    TALK_LIKE_FAILURE,
    TALK_UPDATE,
    TALK_UPDATE_SUCCESS,
    TALK_UPDATE_FAILURE,
  } from "../actions/talk";
  import update from "react-addons-update";
  
  const initialState = {
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
  };
  
  export default function talk(state = initialState, action) {
    switch (action.type) {
      
      case TALK_UPDATE:
        return update(state, {
          update: {
            status: { $set: "WAITING" },
          },
        });
      case TALK_UPDATE_SUCCESS:
        return update(state, {
          update: {
            status: { $set: "SUCCESS" },
          },
        });
      case TALK_UPDATE_FAILURE:
        return update(state, {
          update: {
            status: { $set: "FAILURE" },
          },
        });
      case TALK_LOAD_INIT:
        return update(state, {
          detail: {
            status: { $set: "INIT" },
          },
        });
  
      case TALK_LOAD:
        return update(state, {
          detail: {
            status: { $set: "WAITING" },
          },
        });
  
      case TALK_LOAD_SUCCESS:
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
        });
  
      case TALK_LOAD_FAILURE:
        return update(state, {
          detail: {
            status: { $set: "FAILURE" },
          },
        });

      case TALK_LIKE:
        return update(state, {
          like: {
            status: { $set: "WAITING" },
          },
        });
  
      case TALK_LIKE_SUCCESS:
        
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
  
      case TALK_LIKE_FAILURE:
        return update(state, {
          like: {
            status: { $set: "FAILURE" },
          },
        });
  
      default:
        return state;
    }
  }
  