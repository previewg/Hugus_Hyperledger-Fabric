import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {StoryMain} from './components'

function App() {
  return (
      <Router>
          <Switch>
              <Route exact path="/story" component={StoryMain} />
          </Switch>
      </Router>
  );
}

export default App;
