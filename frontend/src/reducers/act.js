import {
    ACT_LIST_LOAD,
    ACT_LIST_LOAD_SUCCESS,
    ACT_LIST_LOAD_FAILURE,
} from "../actions/act";
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


export default function act(state = initialState, action) {
    switch (action.type) {
        case ACT_LIST_LOAD:
            return update(state, {
              list: {
                status: { $set: "WAITING" },
              },
            });
      
          case ACT_LIST_LOAD_SUCCESS:
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
      
          case ACT_LIST_LOAD_FAILURE:
            return update(state, {
              list: {
                status: { $set: "FAILURE" },
              },
            });


            default:
                return state;
    };
};
