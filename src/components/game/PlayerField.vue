<template>
  <div class="player-field">
    <field
      :dataName="'player'"
      :placedShips="playerShips"
      :showShips="true"
      :randomShips="playerShipsRandomPlacement"
      @placeShip="$store.commit('addPlayerShip', $event)"
      @stopRandom="$store.commit('setPlayerShipsRandomPlacement', false)"
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
    }),
  },
}
</script>

<style lang="scss">

</style>