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
      </div>
    </Router>
  );
};

export default App;
