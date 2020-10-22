import { combineReducers } from "redux";
import auth from "./auth";
import user from "./user";
import story from "./story";
import comment from "./comment";
import hashtag from "./hashtag";
import myPage from "./myPage";
import act from "./act";

export default combineReducers({
  auth,
  user,
  story,
  comment,
  hashtag,
  myPage: myPage,
  act,
});
