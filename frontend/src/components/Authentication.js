import React from 'react';
import {Link} from 'react-router-dom';
import styled from "styled-components"

const ModalButton = styled.div`
position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.6);
`

const LoginModal = styled.div`
width: 480px;
    height: 621px;
    position: relative;
    box-sizing: border-box;
    margin: 50px auto;
    padding: 20px;
    background: #fff; 
`

const ModalContents = styled.div`
 margin: 0 auto;
      width: 100%;
      position: relative;
      padding: 0 20px 32px;
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      flex-direction: column;
`

const AutoLogin = styled.div`
font-size: 12px;
          color: #8d8d8d;
          line-height: 3;
`

const LoginMid = styled.div`
display: flex;
        justify-content: space-between;
        align-items: center;
`

const LoginEmail = styled.input`
margin-top: 30px;
        border-radius: 2px;
        width: 100%;
        height: 40px;
        border: 1px solid #e5e5e5;
        padding: 9px 12px;
        outline: none;
        box-sizing: border-box;
`

const LoginPassword = styled.input`
margin-top: 15px;
        border-radius: 2px;
        width: 100%;
        height: 40px;
        border: 1px solid #e5e5e5;
        padding: 9px 12px;
        outline: none;
        box-sizing: border-box;
`

const SocialLogin = styled.div`
 margin-bottom: 30px;
`

const Kakao = styled.div`
  background-color: #feec34;
          border-color: #feec34;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
          margin-bottom: 10px;
          border-radius: 3px;
`

const Facebook = styled.div`
          background-color: #21538a;
          border-color: #21538a;
          height: 40px;
          display: flex;
          justify-content: center;
          box-sizing: border-box;
          color: #fff;
          margin-bottom: 10px;
          border-radius: 3px;
`

const FacebookText = styled.div`
            width: 310px;
            color: #fff;
            font-size: 15px;
            text-align: center;
            box-sizing: border-box;
`

const LoginEnd = styled.div`
 text-align: center;
        font-size: 11px;
`

const LoginToSignup = styled.div`
color: #bcbcbc;
          font-size: 11px;
          margin-bottom: 35px;
`

const ModalTitle = styled.div`
font-size: 30px;
justify-content: center;
 display: flex;
`

const SubmitButton = styled.div`
font-size: 17px;
justify-content: center;
 display: flex;
 color:white;
 background: #f9b8c7;
 height: 33px;
 border-radius: 3px;

`

const CloseModal = styled.div`
display: flex;
text-decoration:none ;
`

//https://blog.naver.com/gi_balja/221246571928 체크박스event관련
class Authentication extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            nickname: "",
            password: "",
            isModalOpen:true
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }
    handleChange(e) {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    handleLogin() {
        let id = this.state.email;
        let pw = this.state.password;
        this.props.onLogin(id, pw).then(
          (success) => {
              if (!success) {
                  this.setState({
                      password: ''
                  });
              }
          }
        );
    }

    handleRegister() {
        console.log(this.state)
        let id = this.state.email;
        let nic = this.state.nickname;
        let pw = this.state.password;

        this.props.onRegister(id, nic, pw).then(
          (success) => {
              if (!success) {
                  this.setState({
                      password: ''
                  });
              }
          }
        );
    }

    handleKeyPress(e) {
        if (e.charCode === 13) {
            if (this.props.mode) {
                this.handleLogin();
            } else {
                this.handleRegister();
            }
        }
    }
    render() {

        const {openModal, close} = this.props;

        const inputBoxes = (
          <>{this.state.isModalOpen ? (
            <ModalButton>
                <div>
                    <LoginModal>
                        <Link to="/" >x</Link>
                        <ModalContents onClick={()=>this.state.isModalOpen }>
                            <ModalTitle>로그인</ModalTitle>
                            <div>

                                <LoginEmail
                                  name="email"
                                  type="text"
                                  value={this.state.email}
                                  onChange={this.handleChange}
                                  placeholder="이메일"
                                />
                            </div>
                            <div>
                                <LoginPassword
                                  name="password"
                                  type="password"
                                  value={this.state.password}
                                  onChange={this.handleChange}
                                  placeholder="비밀번호"/>
                            </div>

                            <LoginMid>
                                <AutoLogin >
                                    {/*    {" "}*/}
                                    {/*    <input type="checkbox" id="hint"/>*/}
                                    로그인 유지하기
                                </AutoLogin>
                                <AutoLogin>
                                    아이디/비밀번호 찾기
                                </AutoLogin>
                            </LoginMid>
                            <SubmitButton>
                                <a onClick={this.handleLogin}>Hugus 계정으로 로그인</a>
                            </SubmitButton>
                            <SocialLogin>
                                <Kakao>
                                    카카오 계정으로 로그인
                                </Kakao>

                                <Facebook>
                                    페이스북 계정으로 로그인
                                </Facebook>
                                <FacebookText>

                                </FacebookText>
                            </SocialLogin>
                            <LoginEnd>
                                <LoginToSignup>
                                    회원이 아니신가요?
                                    <Link to="/signup">회원가입</Link>
                                </LoginToSignup>
                            </LoginEnd>


                        </ModalContents>
                    </LoginModal>
                </div>
            </ModalButton>
          ) : null}


          </>
        );

        const inputBoxes2 = (
          <>{this.state.isModalOpen ? (
            <ModalButton>
                <div>
                    <LoginModal>
                        <CloseModal>
                            <Link to="/" >x</Link>
                        </CloseModal>
                        <ModalContents onClick={()=>this.state.isModalOpen }>
                            <ModalTitle>회원가입</ModalTitle>
                            <div>

                                <LoginEmail
                                  name="email"
                                  type="text"
                                  value={this.state.email}
                                  onChange={this.handleChange}
                                  placeholder="이메일"
                                />
                            </div>
                            <div>
                                <LoginPassword
                                  name="password"
                                  type="password"
                                  value={this.state.password}
                                  onChange={this.handleChange}
                                  onKeyPress={this.handleKeyPress}
                                  placeholder="비밀번호"/>
                            </div>
                            <div>
                                <LoginPassword
                                  name="nickname"
                                  type="text"
                                  value={this.state.nickname}
                                  onChange={this.handleChange}
                                  onKeyPress={this.handleKeyPress}
                                  placeholder="별명"/>
                            </div>
                            <LoginMid>

                                <AutoLogin>
                                    <input type="checkbox"/>
                                    개인정보 이용 동의

                                </AutoLogin>
                            </LoginMid>
                            <SubmitButton>
                                <a onClick={this.handleRegister}>가입하기</a>
                            </SubmitButton>
                        </ModalContents>
                    </LoginModal>
                </div>
            </ModalButton>
          ) : null}


          </>
        );

        const loginView = (
          <div>
              <div>
                  <div>
                      {inputBoxes}
                  </div>
              </div>
          </div>
        );

        const registerView = (
          <div>
              <div>
                  {inputBoxes2}

              </div>
          </div>
        );

        return (

          <div>
              {/*<Link className="logo" to="/">회원가입/로그인</Link>*/}
              <div>
                  <div>
                      <div>{this.props.mode ? "Login화면"  : "REGISTER화면"}</div>
                  </div>
                  {this.props.mode ? loginView : registerView}
              </div>
          </div>
        );
    }

}


Authentication.defaultProps = {
    mode: true,
};


export default Authentication;