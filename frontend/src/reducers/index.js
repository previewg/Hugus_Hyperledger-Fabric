import authentication from './authentication';
import user from "./user";

import { combineReducers } from 'redux';

export default combineReducers({
    authentication,
    user
});