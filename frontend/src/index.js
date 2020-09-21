import React from 'react';
import ReactDOM from 'react-dom';

// Redux
import rootReducer from "./reducers/index";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

// Router
import {Home, SignIn, SignUp, StoryMain,StoryWrite, TotalSearch} from './containers';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {NavBar} from "./components";
import Auth from 'hoc/auth';

// Slick css
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(ReduxThunk)),
    // window.__REDUX_DEVTOOLS_EXTENSION__ &&
    // window.__REDUX_DEVTOOLS_EXTENSION__(),
);

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <NavBar/>
            <Switch>
                <Route exact path="/" component={Auth(Home,null)}/>
                <Route path="/signin" component={Auth(SignIn,false)}/>
                <Route path="/signup" component={Auth(SignUp,false)}/>
                <Route exact path="/story" component={Auth(StoryMain,null)}/>
                <Route path="/story/write" component={Auth(StoryWrite,true)}/>
                <Route path="/search" component={Auth(TotalSearch,null)}/>
            </Switch>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);