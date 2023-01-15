<template>
  <app-modal
    :active="modalActive"
    @submit="restartGame()"
    @close="close()"
  >
    <div class="game-end-modal__content">
      <div class="game-end-modal__text">
        {{ text }}
      </div>
      <div class="game-end-modal__image">
        <img v-if="playerWon" src="@/assets/img/jolly-roger-happy.jpg"/>
        <img v-else src="@/assets/img/jolly-roger-sad.jpg"/>
      </div>
    </div>
  </app-modal>
</template>

<script>
import AppModal from '@/components/basic/AppModal.vue'

export default {
  name: 'GameEndModal',
  props: {
    modalActive: Boolean,
    playerWon: Boolean,
  },
  data () {
    return {
      text: 'Поражение... Искуственный интелект оказался сильнее',
    }
  },
  components: {
    AppModal,
  },
  watch: {
    playerWon (newValue) {
      if (newValue) {
        this.text = 'Победа! Корабли врага потоплены'
      } else {
        this.text = 'Поражение... Искуственный интелект оказался сильнее'
      }
    }
  },
  methods: {
    restartGame () {
      this.$store.commit('setGameStatus', 'GamePreparation')
      this.$store.commit('resetShips')
      this.$store.commit('setPlayerShips', [])
      this.$store.commit('setAiShips', [])
      this.$store.commit('setAiShotCellsIndex', [])
      this.$store.commit('setShotTargetDirection', null)
      this.$store.commit('setShotTargetCell', null)
      this.$store.commit('setAiUsedDirections', [])
      this.$store.commit('toggleModalVisibility', 'gameEndModalActive')
    },
    close () {
      this.$store.commit('toggleModalVisibility', 'gameEndModalActive')
    },
  }
}
</script>

<style lang="scss">
.game-end-modal__content {
  display: flex;
  flex-direction: column;
  align-items: center;

  .game-end-modal__text { 
  }

  .game-end-modal__image {
    margin: 16px 0 0 0;
  }
}
</style>