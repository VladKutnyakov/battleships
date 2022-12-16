<template>
  <div class="game">
    <div class="game__player-block">
      <div class="player-block__field">
        <player-field />
      </div>
      <div class="player-block__alive-count">
        Кораблей в живых: {{ alivePlayerShipsCount }}
      </div>
    </div>
    <div class="game__turn">
      <div v-if="playerTurn" class="turn__player-turn">
        Ваш ход
      </div>
      <div v-else class="turn__ai-turn">
        Ход ИИ
      </div>
    </div>
    <div class="game__ai-block">
      <div class="ai-block__field">
        <a-i-field />
      </div>
      <div class="ai-block__alive-count">
        Кораблей в живых: {{ aliveAiShipsCount }}
      </div>
    </div>
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
      playerTurn: state => state.playerTurn,
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
