import { combineReducers } from "redux";
import authentication from "./authentication";
import user from "./user";
import story from "./story";
import comment from "./comment";
import hashtag from "./hashtag";

export default combineReducers({
  authentication,
  user,
  story,
  comment,
  hashtag,
});
