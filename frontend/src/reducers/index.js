import {combineReducers} from "redux";
import authentication from "./authentication";
import user from "./user";
import story from "./story";
import comment from "./comment";
import hashtag from "./hashtag";
import myPage from "./myPage";
import act from "./act";


export default combineReducers({
    authentication,
    user,
    story,
    comment,
    hashtag,
    myPage: myPage,
    act,
});
