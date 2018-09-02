import { combineReducers } from "redux";
import { SET_VISIBILITY_FILTER, MODIFY_USERS_CONVERSATION } from "./actions";

const message = (state, action) => {
  switch (action.type) {
    case MODIFY_USERS_CONVERSATION:
      return {
        idUserFrom: action.idUserFrom,
        idUserTo: action.idUserTo
      };
    default:
      return state;
  }
};

const messages = (state = [], action) => {
  switch (action.type) {
    case MODIFY_USERS_CONVERSATION:
      return message(undefined, action);
    default:
      return state;
  }
};

const visibilityFilter = (state = "SHOW_ALL", action) => {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter;
    default:
      return state;
  }
};

const messageApp = combineReducers({
  messages,
  visibilityFilter,
});

export default messageApp;
