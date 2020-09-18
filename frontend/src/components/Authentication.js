import React from 'react';
import {Link} from 'react-router-dom';

class Authentication extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            nickname: "",
            password: ""
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
                    console.log("login fail")
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
        const inputBoxes = (
            <div>
                <div>
                    <label>UserEmail</label>
                    <input
                        name="email"
                        type="text"
                        className="validate"
                        value={this.state.email}
                        onChange={this.handleChange}
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        name="password"
                        type="password"
                        className="validate"
                        value={this.state.password}
                        onChange={this.handleChange}
                        onKeyPress={this.handleKeyPress}/>
                </div>
            </div>
        );
        const inputBoxes2 = (
            <div>
                <div>
                    <label>UserEmail</label>
                    <input
                        name="email"
                        type="text"
                        className="validate"
                        value={this.state.email}
                        onChange={this.handleChange}
                    />
                </div>
                <div>
                    <label>UserNickname</label>
                    <input
                        name="nickname"
                        type="text"
                        className="validate"
                        value={this.state.nickname}
                        onChange={this.handleChange}
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        name="password"
                        type="password"
                        className="validate"
                        value={this.state.password}
                        onChange={this.handleChange}
                        onKeyPress={this.handleKeyPress}/>
                </div>
            </div>
        );

        const loginView = (
            <div>
                <div>
                    <div>
                        {inputBoxes}
                        <button onClick={this.handleLogin}>SUBMIT</button>
                    </div>
                </div>


                <div>
                    <div>
                        <div>
                            New Here? <Link to="/register">Create an account</Link>
                        </div>
                    </div>
                </div>

            </div>
        );

        const registerView = (
            <div>
                <div>
                    {inputBoxes2}
                    <button onClick={this.handleRegister}>CREATE</button>
                </div>
            </div>
        );

        return (
            <div>
                <Link className="logo" to="/">회원가입/로그인</Link>
                <div>
                    <div>
                        <div>{this.props.mode ? "LOGIN" : "REGISTER"}</div>
                    </div>
                    {this.props.mode ? loginView : registerView}
                </div>
            </div>
        );
    }

}

Authentication.propTypes = {};

Authentication.defaultProps = {
    mode: true,
    onLogin: (id, nic, pw) => {
        console.error("onLogin not defined");
    },
    onRegister: (id, nic, pw) => {
        console.error("onRegister not defined");
    }
};


export default Authentication;
