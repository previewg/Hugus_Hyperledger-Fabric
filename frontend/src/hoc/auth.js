import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {signInBtnIsClicked} from "../actions/nav";

export default (Component, option, adminRoute=null) => {

	// null -> 누구나 출입이 가능한 페이지 (home)
  // true -> 로그인한 유저만 출입이 가능한 페이지
  // false -> 로그인한 유저는 출입이 불가능한 페이지

	const AuthenticateCheck = (props) => {
		const dispatch = useDispatch();
		const isLoggedIn = useSelector(state => state.authentication.status.isLoggedIn);
		const [isAllowed,setIsAllowed] = useState(true);

		useEffect(() => {
			if (!isLoggedIn) {
				// 로그인을 하지 않은 상태
				if (option) {
					dispatch(signInBtnIsClicked());
					setIsAllowed(false);
				}
			}else{
				//로그인을 한 상태
				if(option===false){
					setIsAllowed(false);
				}
			}
		}	, []);

		if (isAllowed) return <Component {...props} />;
		else return <div onLoad={()=>props.history.push('/')}></div>;
	};
	return AuthenticateCheck;
};