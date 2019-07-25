import Vue from 'vue'
import Vuex from 'vuex'
import * as PackageService from './services/packageService'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    packageList: []
  },
  mutations: {
    SET_PACKAGE_LIST (state, list) {
      state.packageList = list
    },
    ADD_PACKAGE (state, payload) {
      state.packageList.push(payload)
    },
    UPDATE_PACKAGE (state, payload) {
      const item = state.packageList.find(item => item.id === payload.id)
      Object.assign(item, payload)
    }
  },
  actions: {
    fetchPackageList ({ commit }) {
      PackageService.fetchPackageList()
        .then(list => {
          commit('SET_PACKAGE_LIST', list)
        })
    },
    insertPackage ({ commit }, payload) {
      PackageService.insertPackage(payload)
        .then(pkg => {
          commit('ADD_PACKAGE', pkg)
        })
    },
    confimReceipt ({ commit }, payload) {
      PackageService.confirmReceipt(payload)
        .then(pkg => {
          commit('UPDATE_PACKAGE', pkg)
        })
    }
  },
  getters: {
    packageList (state) {
      return state.packageList
    }
  }
})
