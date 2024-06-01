import { createStore } from 'vuex';

export default createStore({
  state: {
    authToken: null
  },
  mutations: {
    setAuthToken(state, token) {
      state.authToken = token;
    }
  },
  actions: {
    saveAuthToken({ commit }, token) {
      commit('setAuthToken', token);
    }
  },
  getters: {
    authToken(state) {
      return state.authToken;
    }
  }
});