<template>
  <div class="game">
    <player-field />
    <a-i-field />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import PlayerField from '@/components/game/PlayerField'
import AIField from '@/components/game/AIField'

export default {
  name: 'Game',
  components: {
    PlayerField,
    AIField,
  },
  computed: {
    ...mapState({
      playerShips: state => state.playerShips,
      aiShips: state => state.aiShips,
    }),

    aliveAiShipsCount () {
      return this.aiShips.filter(item => item.health > 0).length
    },

    alivePlayerShipsCount () {
      return this.playerShips.filter(item => item.health > 0).length
    },
  },
  watch: {
    aliveAiShipsCount (newValue) {
      if (newValue === 0) {
        console.log('Победа!')
      }
    },

    alivePlayerShipsCount (newValue) {
      if (newValue === 0) {
        console.log('Поражение!')
      }
    },
  },
}
</script>

<style lang="scss">
.game {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
