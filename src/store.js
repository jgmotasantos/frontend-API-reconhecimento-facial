import { createStore } from 'vuex';

export default createStore({
  state() {
    return {
      authToken: localStorage.getItem('authToken') || null
    };
  },
  mutations: {
    setAuthToken(state, token) {
      state.authToken = token;
      localStorage.setItem('authToken', token); // Salvar no localStorage
    },
    clearAuthToken(state) {
      state.authToken = null;
      localStorage.removeItem('authToken'); // Remover do localStorage
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
