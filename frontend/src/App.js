import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from "./NavBar";
import Home from "./pages/Home";
import Candidates from "./pages/Candidates";
import Jobs from "./pages/Jobs";

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <React.Fragment>
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/jobs" component={Jobs} />
          <Route exact path="/candidates" component={Candidates} />
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
