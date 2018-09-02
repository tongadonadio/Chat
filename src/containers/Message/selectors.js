export const selectMessages = state => state.messages;
export const selectUserFrom = state => state.id_user_from;
export const selectUserTo = state => state.id_user_to;

export const selectVisibilityFilter = state => state.visibilityFilter;

export const selectVisibleMessages = state => {
  const messages = selectMessages(state);
  const filter = selectVisibilityFilter(state);
  return messages.filter(t => t.id_user_from === filter);
};
