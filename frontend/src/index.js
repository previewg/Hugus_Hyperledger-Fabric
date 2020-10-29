import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// Redux
import rootReducer from "reducers/index";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import ReduxThunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

// Slick css
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
  BlockInfoList,
  SearchResult,
  StoryUpdate,
  ActMain,
  ActDetail,
  ActWrite,
  TalkMain,
  TalkDetail,
  CampaignDetail,
  TalkWrite,
} from "pages";

// Common components
import {  Footer, NavBar, NaverCallback, ScrollTop } from "components";

// HOC
import Auth from "hoc/auth";

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
        <Route
          exact
          path="/campaign/:id"
          component={Auth(CampaignDetail, null)}
        />
        <Route exact path="/story" component={Auth(StoryMain, null)} />
        <Route path="/story/write" component={Auth(StoryWrite, true)} />
        <Route path="/story/update/:id" component={Auth(StoryUpdate, true)} />
        <Route path="/story/:id" component={Auth(StoryDetail, null)} />
        <Route exact path="/search" component={Auth(TotalSearch, null)} />
        <Route path="/search/result" component={Auth(SearchResult, null)} />
        <Route path="/my" component={Auth(UserInfo, true)} />
        <Route exact path="/block" component={Auth(BlockInfo, null)} />
        <Route path="/block/List" component={Auth(BlockInfoList, null)} />
        <Route exact path="/act" component={Auth(ActMain, null)} />
        <Route path="/act/:id" component={Auth(ActDetail, null)} />
        <Route path="/act/write" component={Auth(ActWrite, null)} />
        <Route exact path="/talk" component={Auth(TalkMain, null)} />
        <Route path="/talk/write" component={Auth(TalkWrite, null)} />
        <Route path="/talk/:id" component={Auth(TalkDetail, null)} />
        <Route exact path="/auth/naver" component={Auth(NaverCallback, null)} />
      </Switch>
      <Footer />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
