import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      selectedUserConversation: null,
      selectedUserMessages : 0
    };
  },
  mutations: {
    setSelectedConversationUser(state, userId) {
      state.selectedUserConversation = userId;
    },
    setSelectedUserMessages(state, count) {
        state.selectedUserMessages = count;
      },
  },
});

export default store;
