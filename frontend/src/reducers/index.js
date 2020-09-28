import authentication from "./authentication";
import user from "./user";
import story from "./story";

import { combineReducers } from "redux";

export default combineReducers({
  authentication,
  user,
  story,
});
