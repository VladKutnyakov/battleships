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

    randomCellsIndex: [],
    playerShipsRandomPlacement: false,
    aiShipsRandomPlacement: false,

    gameStatus: 'GamePreparation',
  },
  getters: {
  },
  mutations: {
    addPlayerShip (state, payload) {
      state.playerShips.push(payload)
    },
    setPlayerShips (state, payload) {
      state.playerShips = payload
    },
    addAiShip (state, payload) {
      state.aiShips.push(payload)
    },
    setAiShips (state, payload) {
      state.aiShips = payload
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
    resetShips (state) {
      state.ships = [
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
      ]
    },
    incrementShipsCount (state, payload) {
      const index = state.ships.findIndex(item => item.length === payload)
      state.ships[index].count++
    },
    decrementShipsCount (state, payload) {
      const index = state.ships.findIndex(item => item.length === payload)
      state.ships[index].count--
    },
    addRandomCellsIndex (state, payload) {
      state.randomCellsIndex.push(payload)
    },
    setRandomCellsIndex (state, payload) {
      state.randomCellsIndex = payload
    },
    setPlayerShipsRandomPlacement (state, payload) {
      state.playerShipsRandomPlacement = payload
    },
    setAiShipsRandomPlacement (state, payload) {
      state.aiShipsRandomPlacement = payload
    },
    editAiShip (state, payload) {
      const index = state.aiShips.findIndex(item => payload.x === item.x && payload.y === item.y)
      state.aiShips[index] = payload
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
