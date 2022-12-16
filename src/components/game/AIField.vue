<template>
  <div class="ai-field">
    <field
      :dataName="'ai'"
      :placedShips="aiShips"
      :showShips="true"
      :randomShips="aiShipsRandomPlacement"
      @placeShip="$store.commit('addAiShip', $event)"
      @stopRandom="$store.commit('setAiShipsRandomPlacement', false)"
      @shotShip="shotShip($event)"
    />
  </div>  
</template>

<script>
import { mapState } from 'vuex'
import Field from '@/components/Field'

export default {
  name: 'AIField',
  components: {
    Field,
  },
  computed: {
    ...mapState({
      aiShips: state => state.aiShips,
      aiShipsRandomPlacement: state => state.aiShipsRandomPlacement,
      playerTurn: state => state.playerTurn,
    }),
  },
  methods: {
    shotShip ($event) {
      if (this.playerTurn) {
        // this.$store.commit('editAiShip', $event)
      }
    },
  },
  mounted () {
    this.$store.commit('resetShips')
    this.$store.commit('setAiShips', [])
    this.$store.commit('setAiShipsRandomPlacement', true)
  }
}
</script>

<style lang="scss">

</style>