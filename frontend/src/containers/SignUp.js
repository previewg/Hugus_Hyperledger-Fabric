import React from 'react';
import { Authentication } from '../components';
import { connect } from 'react-redux';
import { registerRequest } from '../actions/auth';

class SignUp extends React.Component {

    constructor(props) {
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
    }

    handleRegister(email,nickname, password) {
        return this.props.registerRequest(email,nickname, password).then(
            () => {
                if(this.props.status === "SUCCESS") {
                    this.props.history.push('/login');
                    return true;
                } else {
                    /*
                       ERROR CODES:

                   */
                    // let errorMessage = [
                    //     'Invalid Username',
                    //     'Password is too short',
                    //     'Username already exists'
                    // ];
                    return false;
                }
            }
        );
    }
    render() {
        return (
            <div>
                <Authentication mode={false} onRegister={this.handleRegister}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        status: state.authentication.register.status,
        errorCode: state.authentication.register.error
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        registerRequest: (email,nickname, password) => {
            return dispatch(registerRequest(email,nickname, password));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
