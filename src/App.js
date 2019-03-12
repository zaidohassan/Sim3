import React, { Component } from "react";
import "./App.css";
import { HashRouter as Router } from "react-router-dom";
import routes from "./routes";
import { Provider } from "react-redux";
import store from "./ducks/store";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">{routes}</div>
        </Router>
      </Provider>
    );
  }
}

export default App;
