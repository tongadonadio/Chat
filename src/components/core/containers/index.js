import React from "react";
import { Provider } from "react-redux";
import App from "../../../app";
import { Router } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

const Root = ({ store }) => {
  const customHistory = createBrowserHistory()
  return (
  <Provider store={store}>
    <Router history={customHistory}>
      <App />
    </Router>
  </Provider>
  );
}

export default Root;
