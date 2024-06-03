import { createStore } from 'vuex';

export default createStore({
  state() {
    return {
      authToken: null
    };
  },
  mutations: {
    setAuthToken(state, token) {
      state.authToken = token;
    },
    clearAuthToken(state) {
      state.authToken = null;
    }
  },
  actions: {
    saveAuthToken({ commit }, token) {
      commit('setAuthToken', token);
    },
    clearAuthToken({ commit }) {
      commit('clearAuthToken');
    }
  },
  getters: {
    authToken(state) {
      return state.authToken;
    }
  }
});