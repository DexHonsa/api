import Vue from "vue";
import Vuex from "vuex";

import userStore from './user';
import professionalStore from './professionals';
// import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
   userStore,
   professionalStore
  },
  // plugins: [createPersistedState()],
  state: {
  },
  getters: {},
  mutations: {
    
  },
  actions: {
    
    
  }
});
