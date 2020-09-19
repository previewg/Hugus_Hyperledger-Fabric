import React from 'react';
import {signOutRequest} from '../actions/auth';
import {connect} from "react-redux";
import SignIn from "./SignIn";
import Authentication from "../components/Authentication";
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout() {
        this.props.logoutRequest().then(
          () => {
              let loginData = {
                  isLoggedIn: false,
                  email: ''
              };

              document.cookie = 'key' + btoa(JSON.stringify(loginData));
          }
        )
    }

    componentDidMount() {
        //get cookie by name
        function getCookie(name) {
            let value = "; " + document.cookie;
            let parts = value.split("; " + name + "=");
            if (parts.length === 2) return parts.pop().split(";").shift();
        }

        // get login data from cookie
        let loginData = getCookie('key');

        // if loginData is undefined, do nothing
        if (typeof loginData === "undefined") return;

        // decode base64 & parse json
        loginData = JSON.parse(atob(loginData));

        // if not logged in, do nothing
        if (!loginData.isLoggedIn) return;

        //  page refreshed & has a session in cookie,
        //  check whether this cookie is valid or not

    }

    render() {
        let re = /(login|register)/;
        let isAuth = re.test(this.props.location.pathname);

        return (
          <>
              {/*{isAuth ? undefined :*/}
              {/*  <Header isLoggedIn={this.props.status.isLoggedIn}*/}
              {/*          onLogout={this.handleLogout}*/}
              {/*  />*/}

              {/*}*/}
              {/*{console.log(this.props)}*/}


              <div>{this.props.status.currentUser}님 반갑습니다 </div>
              {this.props.children}
          </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        status: state.authentication.status
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        logoutRequest: () => {
            return dispatch(signOutRequest());
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);