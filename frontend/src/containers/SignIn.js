import React from 'react';
import {Authentication} from '../components';
import {connect} from 'react-redux';
import {loginRequest} from '../actions/auth';


class SignIn extends React.Component {

    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin(id, pw) {
        return this.props.loginRequest(id, pw).then(
            () => {
                if (this.props.status === "SUCCESS") {
                    console.log(this.props.status)
                    let loginData = {
                        isLoggedIn: true,
                        email: id
                    };

                    document.cookie = 'key=' + btoa(JSON.stringify(loginData));
                    this.props.history.push('/');
                    return true;
                } else {
                    return false;
                }
            }
        );
    }

    render() {
        return (
            <div>
                <Authentication mode={true} onLogin={this.handleLogin}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        status: state.authentication.login.status
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loginRequest: (id, pw) => {
            return dispatch(loginRequest(id, pw));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
