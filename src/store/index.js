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
    playerShips: [],
    aiShips: [],
    selectedShip: null,
    gameStatus: 'GamePreparation',
  },
  getters: {
  },
  mutations: {
    addPlayerShip (state, payload) {
      state.playerShips.push(payload)
    },
    removePlayerShip (state, payload) {
      const index = state.playerShips.indexOf(payload)
      if (index !== -1) {
        state.playerShips.splice(index, 1)
      }
    },
    setSelectedShip (state, payload) {
      state.selectedShip = payload
    },
    incrementShipsCount (state, payload) {
      const index = state.ships.findIndex(item => item.length === payload)
      state.ships[index].count++
    },
    decrementShipsCount (state, payload) {
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
