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
    gameStatus: 'GamePreparation',
  },
  getters: {
  },
  mutations: {
    setPlayerShip (state, payload) {
      state.shipsPlayer.push(payload)
    },
    setSelectedShip (state, payload) {
      state.selectedShip = payload
    },
    reduceShipsCount (state, payload) {
      const index = state.ships.findIndex(item => item.length === payload)
      state.ships[index].count--
    },
    setGameStatus (state, payload) {
      state.gameStatus = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
