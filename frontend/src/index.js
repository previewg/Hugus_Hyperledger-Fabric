import React from 'react';
import ReactDOM from 'react-dom';
import {App, Home, Login, Register} from './containers';
import {BrowserRouter, Route, Switch} from "react-router-dom";

// Redux
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reducers from './reducers';
import thunk from 'redux-thunk';

const store = createStore(reducers, applyMiddleware(thunk));

const rootElement = document.getElementById('root');
ReactDOM.render(<>
        <Provider store={store}>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={App}/>
                    <Route path="/home" component={Home}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/register" component={Register}/>
                </Switch>
            </BrowserRouter>
        </Provider>
    </>, rootElement
);