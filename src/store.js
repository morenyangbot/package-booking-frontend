import Vue from 'vue'
import Vuex from 'vuex'
import * as PackageService from './services/packageService'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    packageList: []
  },
  mutations: {
    SET_PACKAGE_LIST(state, list) {
      state.packageList = list
    }
  },
  actions: {
    fetchPackageList({ commit }) {
      PackageService.fetchPackageList()
        .then(list => {
          commit("SET_PACKAGE_LIST", list)
        })
    }
  },
  getters: {
    packageList(state) {
      return state.packageList
    }
  }
})
