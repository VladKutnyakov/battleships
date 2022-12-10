import { createStore } from 'vuex'

export default createStore({
  state: {
    ships: [
      {
        length: 1,
        count: 4,
      },
      {
        length: 2,
        count: 3,
      },
      {
        length: 3,
        count: 2,
      },
      {
        length: 4,
        count: 1,
      },
    ],
    shipsPlayer: [],
    shipsAi: [],
    selectedShip: null,
  },
  getters: {
  },
  mutations: {
    setPlayerShip (state, payload) {
      state.shipsPlayer.push(payload)
    },
    setSelectedShip (state, payload) {
      state.selectedShip = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
