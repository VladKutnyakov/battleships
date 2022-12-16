<template>
  <div class="player-field">
    <field
      :dataName="'player'"
      :placedShips="playerShips"
      :showShips="true"
      :randomShips="playerShipsRandomPlacement"
      @placeShip="$store.commit('addPlayerShip', $event)"
      @stopRandom="$store.commit('setPlayerShipsRandomPlacement', false)"
      @shotShip="shotShip($event)"
    />
  </div>  
</template>

<script>
import { mapState } from 'vuex'
import Field from '@/components/Field'

export default {
  name: 'PlayerField',
  components: {
    Field,
  },
  computed: {
    ...mapState({
      playerShips: state => state.playerShips,
      playerShipsRandomPlacement: state => state.playerShipsRandomPlacement,
      playerTurn: state => state.playerTurn,
      randomCellsIndex: state => state.randomCellsIndex,
    }),
  },
  watch: {
    playerTurn (newValue) {
      if (!newValue) {
        this.makeShot()
      }
    }
  },
  methods: {
    shotShip ($event) {
      if (!this.playerTurn) {
        this.makeShot()
      }
    },

    makeShot () {
      setTimeout(() => {
        const randomCellIndex = this.getRandomCellToShot()
        this.$store.commit('addRandomCellsIndex', randomCellIndex)
        this.$store.commit('setShotTargetCell', randomCellIndex)
      }, 500)
    },

    getRandomCellToShot () {
      let randomCellIndex = Math.floor(Math.random() * 100 + 1)

      while (this.randomCellsIndex.includes(randomCellIndex)) {
        randomCellIndex = Math.floor(Math.random() * 100 + 1)
      }

      return randomCellIndex
    },
  },
}
</script>

<style lang="scss">

</style>