import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    breadcrumbs: []
  },
  mutations: {
    REPLACE_BREADCRUMBS(state, breadcrumbs) {
      state.breadcrumbs = breadcrumbs;
    }
  },
  actions: {
    replaceBreadcrumbs({ commit }, breadcrumbs) {
      commit('REPLACE_BREADCRUMBS', breadcrumbs);
    }
  },
  modules: {
  }
})
