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

    playerShipsRandomPlacement: false,
    aiShipsRandomPlacement: false,
    randomCellsIndex: [],

    aiShotCellsIndex: [],
    aiUsedDirections: [],
    shotTargetCell: null,
    shotTargetDirection: null,
    shotTargetShipIndex: [],

    playerTurn: true,
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
    editPlayerShip (state, payload) {
      const index = state.playerShips.findIndex(item => item.coordinates === payload.coordinates)
      state.playerShips[index] = payload
    },
    editAiShip (state, payload) {
      const index = state.aiShips.findIndex(item => item.coordinates === payload.coordinates)
      state.aiShips[index] = payload
    },
    togglePlayerTurn (state) {
      state.playerTurn = !state.playerTurn
    },
    setGameStatus (state, payload) {
      state.gameStatus = payload
    },
    addAiShotCellsIndex (state, payload) {
      state.aiShotCellsIndex.push(payload)
    },
    setAiShotCellsIndex (state, payload) {
      state.aiShotCellsIndex = payload
    },
    addAiUsedDirections (state, payload) {
      state.aiUsedDirections.push(payload)
    },
    setAiUsedDirections (state, payload) {
      state.aiUsedDirections = payload
    },
    setShotTargetCell (state, payload) {
      state.shotTargetCell = payload
    },
    setShotTargetDirection (state, payload) {
      state.shotTargetDirection = payload
    },
    setShotTargetShipIndex (state, payload) {
      state.shotTargetShipIndex = payload
    },
    addShotTargetShipIndex (state, payload) {
      state.shotTargetShipIndex.push(payload)
    },
  },
  actions: {
  },
  modules: {
  }
})
