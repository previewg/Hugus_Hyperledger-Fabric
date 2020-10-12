import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// Redux
import rootReducer from "reducers/index";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import ReduxThunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

// Pages
import {
  Home,
  StoryDetail,
  StoryMain,
  StoryWrite,
  TotalSearch,
  User,
  UserInfo,
  BlockInfo,
  SearchResult,
  StoryUpdate,
} from "pages";

// Common components
import { NavBar, ScrollTop } from "components";

// HOC
import Auth from "hoc/auth";

// Slick css
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(ReduxThunk))
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <NavBar />
      <ScrollTop />
      <User />
      <Switch>
        <Route exact path="/" component={Auth(Home, null)} />
        <Route exact path="/story" component={Auth(StoryMain, null)} />
        <Route path="/story/write" component={Auth(StoryWrite, true)} />
        <Route path="/story/update" component={Auth(StoryUpdate, true)} />
        <Route path="/story/:id" component={Auth(StoryDetail, null)} />
        <Route exact path="/search" component={Auth(TotalSearch, null)} />
        <Route path="/search/result" component={Auth(SearchResult, null)} />
        <Route path="/my" component={Auth(UserInfo, true)} />
        <Route path="/blockinfo" component={Auth(BlockInfo, true)} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
