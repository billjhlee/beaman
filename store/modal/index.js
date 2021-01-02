export const state = () => ({
  current: null,
  data: null,
  open: false
})
export const actions = {
  setlogin({ commit }) {
    commit('SET_CURRENT', 'login')
    commit('OPEN')
  },
  setprofile({ commit }, id) {
    commit('SET_CURRENT', 'user')
    commit('SET_DATA', { id })
    commit('OPEN')
  },
  setpost({ commit }, id) {
    commit('SET_CURRENT', 'post')
    commit('SET_DATA', { id })
    commit('OPEN')
  },
  open({ commit }) {
    commit('OPEN')
  },
  close({ commit }) {
    commit('CLOSE')
  }
}

export const mutations = {
  OPEN: state => {
    state.open = true
  },
  CLOSE: state => {
    state.open = false
  },
  SET_CURRENT: (state, current) => {
    state.current = current
  },
  SET_DATA: (state, data) => {
    state.data = data
  },
  RESET: state => {
    state.current = null
    state.data = null
  }
}
