import { connect } from "react-redux";
import { selectVisibleMessages, selectMessages, selectUserFrom, selectUserTo } from "./selectors";
import { modifyUsersConversation, setVisibilityFilter, login } from "./actions";

export const withMessages = connect(state => ({
  messages: selectMessages(state),
}));

export const withVisibleMessages = connect(state => ({
  messages: selectVisibleMessages(state),
}));

export const withUserFrom = connect(state => ({
  id_user_from: selectUserFrom(state),
}));

export const withUserTo = connect(state => ({
  id_user_to: selectUserTo(state),
}));

export const withMessageHandlers = connect(null, { modifyUsersConversation, login });

export const withSetVisibilityFilter = connect(null, { setVisibilityFilter });
