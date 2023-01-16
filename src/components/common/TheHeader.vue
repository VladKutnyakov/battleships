<template>
  <div class="header">
    <div class="header__icon">
      <img src="@/assets/svg/ship.svg" alt="">
    </div>
    <div class="header__title">
      Морской бой
    </div>
    <div v-if="gameStatus === 'Game'" class="header__new-game-btn">
      <app-button
        @click="restartGame()"
      >
        Новая игра
      </app-button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import AppButton from '@/components/basic/AppButton'

export default {
  name: 'TheHeader',
  components: {
    AppButton,
  },
  computed: {
    ...mapState({
      gameStatus: state => state.gameStatus,
    }),
  },
  methods: {
    restartGame () {
      this.$store.commit('setGameStatus', 'GamePreparation')
      this.$store.commit('setPlayerTurn', true)
      this.$store.commit('resetShips')
      this.$store.commit('setPlayerShips', [])
      this.$store.commit('setAiShips', [])
      this.$store.commit('setAiShotCellsIndex', [])
      this.$store.commit('setShotTargetDirection', null)
      this.$store.commit('setShotTargetCell', null)
      this.$store.commit('setAiUsedDirections', [])
    },
  },
}
</script>

<style lang="scss">
.header {
  display: flex;
  align-items: center;
  padding: 32px 0;
  
  .header__icon {
    width: 64px;
    height: 64px;
    margin: 0 32px 0 0;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .header__title {
    flex: 100% 1 1;
    font-size: 38px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 3px;
  }

  .header__new-game-btn {
    // flex: 10% 1 1;
    width: fit-content;
    white-space: nowrap;
  }
}
</style>