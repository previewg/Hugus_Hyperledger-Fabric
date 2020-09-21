import * as types from '../actions/ActionTypes';

const initialState = {
	signInBtn:false
};

export default function nav(state = initialState, action) {
	switch (action.type) {
		case types.SIGNIN_BTN_IS_CLICKED:
			if(state.signInBtn) return {signInBtn:false}
			else return {signInBtn: true}
		default:
			return state;
	}
}