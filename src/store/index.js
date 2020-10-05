import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

//no idea where to set this - but seems to have worked
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

export default new Vuex.Store({
  state: {
    breadcrumbs: [],
    user: null,
    token: null
  },
  mutations: {
    SET_BREADCRUMBS(state, breadcrumbs) {
      state.breadcrumbs = breadcrumbs;
    },
    SET_USER_DATA(state, userData) {
      //should this be userData or userData.user
      state.user = userData.user
      state.token = userData.access_token
      localStorage.setItem('user', JSON.stringify(userData))
      //should it be token or access_token
      axios.defaults.headers.common['Authorization'] = `Bearer ${
        userData.access_token
      }`
    },
    CLEAR_USER_DATA() {
      localStorage.removeItem('user')
      //if doing individually, need to use CLEAR_USER_DATA(state)
      //axios.defaults.headers.common['Authorization'] = null
      //state.user = null
      //state.roles = null
      //reload should clear out everything in store, so no need to do each individually
      location.reload()
    }
  },
  actions: {
    replaceBreadcrumbs({ commit }, breadcrumbs) {
      commit('SET_BREADCRUMBS', breadcrumbs);
    },
    register({ commit }, credentials) { 
      const url = process.env.VUE_APP_ROOT_API + 'user';
      return axios.post(url, credentials).then( 
        ({ data }) => {
          commit('SET_USER_DATA', data)
        }
      )
    }, 
    login({ commit }, credentials) { 
      const url = process.env.VUE_APP_ROOT_API + 'token';
      const payload = `grant_type=password&username=${credentials.username}&password=${credentials.password}`

      return axios.post(url, payload).then(
        ({ data }) => {
          //roles should be in data ie data.roles = ['admin', 'provider', ...]
          commit('SET_USER_DATA', data)
        }
      )
    },
    logout ({ commit }) {
      commit('CLEAR_USER_DATA')
    }
  },
  modules: {
  },
  getters: {
    getStoreLoggedIn (state) {
      return !!state.user
    },
    getStoreUser (state) { 
      return state.user
    },
    getStoreToken(state) {
      return state.token
    },
    getStoreRoleNames(state) {
      //roles are objects, but for simple navigation we often need to know
      //if a user is an admin, a provider, a ...  so a list of role names is useful
      let names = []
      if (state.user) {
        if (state.user.roles){
          names = state.user.roles.map(function (role) { return role.name; });
          names = [... new Set(names)]
        }
      }
      //for testing I am putting everyone in every role
      //names = ['admin', 'provider', 'supervisor', 'principal']
      return names
    },
    getStoreRoles (state) {
      let roles = [];
      if (state.user) {
        if (state.user.roles) {
          if (Array.isArray(state.user.roles)) {
            roles = state.user.roles
          }
        }
      }
      return roles
    }
  }
})
