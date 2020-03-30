import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const state = {
  json: []
}

const mutations = {
  setJson (state, db) {
    state.json = db
  }
}

const actions = {
  getJson (context) {
    fetch('http://127.0.0.1:3000/getJson', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        // mode:'cors',
        'Content-Type': 'application/json'
      }
    }).then(res => {
      if (res.status === 200) {
        return res.json()
      }
    }).then(json => {
      context.commit('setJson', Array.from(json))
    })
  }
}

export const store = new Vuex.Store({
  state: state,
  mutations: mutations,
  actions: actions
})