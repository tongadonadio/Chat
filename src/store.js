import messageApp from "./containers/Message/reducer";
import { createStore } from "redux";

const persistedState = {

};

const store = createStore(
  messageApp,
  persistedState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default store;
