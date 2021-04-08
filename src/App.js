import React from "react";
import Chat from "./components/Chat/Chat";
import Join from "./components/Join/Join";
import { ChatList } from "./components/ChatList/ChatList";

import {
  Switch,
  BrowserRouter as Router,
  Route,
  Redirect,
} from "react-router-dom";

const App = () => {
  return (
    <Router>
      <div>
        <Chat />
        <Switch>
          <Route path="/" exact>
            <Redirect to="/chat" />
          </Route>
          <Route path="/chatlist" exact component={ChatList} />
          <Route path="/chat/:id/:name" exact component={Chat} />
          <Route path="/chat/:id" exact component={Chat} />
          <Route path="/chat" exact component={Chat} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
