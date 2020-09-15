import React from 'react';
import ReactDOM from 'react-dom';

// Redux
import rootReducer from "./reducers/index";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

// Router
import {App, Home, Login, Register, StoryMain} from './containers';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {NavBar} from "./components";


const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(ReduxThunk)),
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__(),
);

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <NavBar/>
            <Switch>
                <Route exact path="/" component={App}/>
                <Route path="/home" component={Home}/>
                <Route path="/login" component={Login}/>
                <Route path="/register" component={Register}/>
                <Route path="/story" component={StoryMain}/>
            </Switch>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);