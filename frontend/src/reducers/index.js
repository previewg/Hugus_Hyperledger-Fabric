import authentication from './authentication';
import nav from "./nav";

import { combineReducers } from 'redux';

export default combineReducers({
    authentication,
    nav
});