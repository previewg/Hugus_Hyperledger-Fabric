import React from 'react';
import {Link} from "react-router-dom";

class Header extends React.Component {


    render() {
        const loginButton = (
            <li>
                <Link to="/login">
                    <div>
                        로그인아이콘
                    </div>
                </Link>
            </li>
        );

        const logoutButton = (
            <li>
                <a onClick={this.props.onLogout}>
                    로그아웃 아이콘
                </a>
            </li>
        );

        return (
            <nav>
                <div>
                    <Link to="/">
                        Hug Us
                    </Link>
                </div>
                <div>
                    <ul>
                        {this.props.isLoggedIn ? logoutButton : loginButton}
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Header;