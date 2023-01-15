<template>
  <div class="game">
    <div class="game__block game__player-block">
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
      <div
        class="turn__icon"
        :class="[
          { 'turn__icon-right': playerTurn },
          { 'turn__icon-left': !playerTurn },
        ]"
      />
    </div>
    <div class="game__block game__ai-block">
      <div class="ai-block__field">
        <a-i-field />
      </div>
      <div class="ai-block__alive-count">
        Кораблей в живых: {{ aliveAiShipsCount }}
      </div>
    </div>

    <game-end-modal
      :modalActive="gameEndModalActive"
      :playerWon="playerWon"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import PlayerField from '@/components/game/PlayerField'
import AIField from '@/components/game/AIField'
import GameEndModal from '@/components/game/GameEndModal'

export default {
  name: 'Game',
  components: {
    PlayerField,
    AIField,
    GameEndModal,
  },
  data() {
    return {
      playerWon: false,
    }
  },
  computed: {
    ...mapState({
      playerShips: state => state.playerShips,
      aiShips: state => state.aiShips,
      playerTurn: state => state.playerTurn,
      gameEndModalActive: state => state.gameEndModalActive,
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
        this.playerWon = true
        this.$store.commit('toggleModalVisibility', 'gameEndModalActive')
      }
    },

    alivePlayerShipsCount (newValue) {
      if (newValue === 0) {
        this.playerWon = false
        this.$store.commit('toggleModalVisibility', 'gameEndModalActive')
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

.game__block {
  flex: 0 0 fit-content;
}

.game__turn {
  display: flex;
  flex-direction: column;
  flex: 1 1 100%;
  align-items: center;

  .turn__icon {
    width: 128px;
    height: 128px;
    mask-image: url('@/assets/svg/arrow.svg');

    &.turn__icon-right {
      background-color: rgb(0, 139, 58);
    }

    &.turn__icon-left {
      background-color: rgb(141, 0, 0);
      transform: rotate(180deg);
    }
  }
}
</style>
