import {
    ACT_LIST_LOAD,
    ACT_LIST_LOAD_SUCCESS,
    ACT_LIST_LOAD_FAILURE,
    ACT_VISIT,
} from "../actions/act";
import update from "react-addons-update";


const initialState = {
      list: {
        status: "INIT",
        data: [],
        num: 1,
      },
    };


export default function act(state = initialState, action) {
    switch (action.type) {
        case ACT_LIST_LOAD:
            return update(state, {
              list: {
                status: { $set: "WAITING" },
              },
            });
          case ACT_LIST_LOAD_SUCCESS:
              return update(state, {
                list: {
                  status: { $set: "SUCCESS" },
                  data: { $set: action.list },
                },
              });
          case ACT_LIST_LOAD_FAILURE:
            return update(state, {
              list: {
                status: { $set: "FAILURE" },
              },
            });
          case ACT_VISIT:
            return update(state, {
              list: {
                status: { $set: action.list },
              }
            })

            default:
                return state;
    };
};
