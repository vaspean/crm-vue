import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import info from './info'
import category from './category'
import record from './record'
import axios from 'axios'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: null,
    localeEmpty: `en-US`
  },
  mutations: {
    setError(state, error) {
      state.error = error
    },
    clearError(state) {
      state.error = null
    },
    setLocaleEmpty(state, value) {
      state.localeEmpty = value;
    }
  },
  actions: {
    async fetchCurrency() {
      const key = process.env.VUE_APP_FIXER;
      const rates = await axios.get(`https://free.currconv.com/api/v7/convert?q=EUR_RUB,USD_RUB&compact=ultra&apiKey=${key}`).then(answer=> {
        return answer.data;
      })
      return rates
    }
  },
  getters: {
    error: s => s.error
  },
  modules: {
    auth, info, category, record
  }
})
