import { loginAPI } from '@/api/public'
export default {
  namespaced: true,
  state: {
    token: null
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
    }
  },
  actions: {
    async LOGIN_ACTION({ commit }, data) {
      const res = await loginAPI(data)
      //   console.log(res.data)
      commit('SET_TOKEN', res.data.token)
    }
  }
}
