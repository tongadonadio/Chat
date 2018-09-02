export const MODIFY_USERS_CONVERSATION = 'Message/MODIFY_USERS_CONVERSATION';
export const LOGIN = 'Message/LOGIN';
export const SET_VISIBILITY_FILTER = 'Message/SET_VISIBILITY_FILTER';

export const modifyUsersConversation = (idUserFrom, idUserTo) => {
  return {
    type: MODIFY_USERS_CONVERSATION,
    idUserFrom,
    idUserTo
  };
};

export const login = idUserFrom => {
  return {
    type: LOGIN,
    idUserFrom
  };
};

export const setVisibilityFilter = filter => {
  return {
    type: SET_VISIBILITY_FILTER,
    filter
  };
};
