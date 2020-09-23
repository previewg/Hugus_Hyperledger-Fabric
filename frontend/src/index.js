import React from 'react';
import ReactDOM from 'react-dom';

// Redux
import rootReducer from "reducers/index";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

// Router
import {Home, StoryMain, StoryWrite, StoryDetail, TotalSearch, User} from 'containers';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {NavBar, ScrollTop} from "components";
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
            <ScrollTop/>
            <User/>
            <Switch>
                <Route exact path="/" component={Auth(Home,null)}/>
                <Route exact path="/story" component={Auth(StoryMain,null)}/>
                <Route path="/story/write" component={Auth(StoryWrite,true)}/>
                <Route path="/story/detail" component={Auth(StoryDetail,true)}/>
                <Route path="/search" component={Auth(TotalSearch,null)}/>
            </Switch>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);