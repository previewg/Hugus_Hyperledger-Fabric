import React from 'react';
import styled from 'styled-components';
import {useDispatch} from "react-redux";
import {signUpRequest} from "../../actions/auth";
import {signInBtnIsClicked, signUpBtnIsClicked} from "../../actions/nav";

const SignUpStyle = styled.div`
	position: fixed;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100vh;
	${props=>props.signUpBtn ? 'display: flex;	background-color: rgba(0,0,0,0.5); z-index:10':'display: none	;	z-index: -10;'};
	section{
			background-color: white;
			width: 400px;
			height: 550px;
			.header{
				display: flex;
				justify-content: center;
				align-items: center;
				flex-direction: column;
				height: 25%;
				.close__btn{
					font-size: 12px;
					position: relative;
					left: 170px;
					cursor: pointer;
				}
				p{
					font-size: 25px;
				}
			}
			.form{
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: space-around;
				height: 45%;
				input{
					width: 70%;
					height: 30px;
					border: none;
					border-bottom: lightgray solid 0.1px;
					font-size: 15px;
					transition: 0.4s ease-in-out;
					:focus{
						outline: none;
						border-bottom: orange solid 0.1px;
					}
				}
				
				button{
					border:orange 0.1px solid;
					border-radius: 5px;
					background-color: white;
					color: orange;
					width: 70%;
					height: 40px;
					font-size: 15px;
					font-weight: bold;
					cursor:pointer;
					:hover{
						background-color: orange;
						color: white;
						border: none;
					};
					
				}
			}
			.social{
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: space-around;
				height: 30%;
				p{
					font-size: 13px;
				}
				.social__logo{
					width: 50%;
					display: flex;
					justify-content: space-around;
					align-items: center;
					img{
						width: 35px;
						cursor:pointer;
						transition: 0.2s ease-in-out;

						:hover{
							transform: scale(1.2);
						}
					}
				}
				.already{
					display: flex;
					justify-content: space-around;
					width: 50%;
					color: gray;
					p:nth-child(2){
						color: orange;
						cursor:pointer;
					}
				}
			}
	}

`;

const SignUp = (props) => {
	const dispatch = useDispatch();

	const signUpHandler = (email,nickname, password) => {
		return dispatch(signUpRequest(email,nickname, password)).then(
			() => {
				if (this.props.status === "SUCCESS") {
					props.history.push('/login');
					return true;
				} else {
					console.log('errorcode: ' + props.errorCode)
					let errorMessage = [
						'이미 계정이 존재함',
						'이메일형식에 맞지 않음',
						'이미 닉네임이 존재함',
						'비밀번호는 영문,숫자 포함 10자리 이상',
					];
					return false;
				}
			}
		);
	}

	const onClickHandler = (e) =>{
		if(e.target === e.currentTarget){
			dispatch(signUpBtnIsClicked())
		}
	}

	return (
		<SignUpStyle signUpBtn={props.signUpBtn} onClick={onClickHandler}>
			<section>
				<article className='header'>
					<p className='close__btn' onClick={()=>dispatch(signUpBtnIsClicked())}>닫기</p>
					<p>회원가입</p>
				</article>
				<article className='form'>
					<input placeholder='이메일'/>
					<input placeholder='닉네임'/>
					<input placeholder='비밀번호'/>
					<button>가입하기</button>
				</article>
				<article className='social'>
					<p>소셜 계정으로 간편하게 가입하세요!</p>
					<div className='social__logo'>
						<img src='icons/google.png'/>
						<img src='icons/kakao.png'/>
						<img src='icons/facebook.png'/>
					</div>
					<div className='already'>
						<p>이미 회원이신가요?</p>
						<p onClick={()=>dispatch(signInBtnIsClicked())}>로그인</p>
					</div>
				</article>
			</section>
		</SignUpStyle>
	)
}

export default SignUp;


