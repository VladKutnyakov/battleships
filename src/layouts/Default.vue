<template>
  <div class="default-layout">
    <div class="default-layout__wrapper">
      <component :is="gameStatus" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Game from '@/views/Game.vue'
import GamePreparation from '@/views/GamePreparation.vue'

export default {
  name: 'DefaultLayout',
  components: {
    Game,
    GamePreparation,
  },
  computed: {
    ...mapState({
      gameStatus: state => state.gameStatus,
    }),
  },
}
</script>

<style lang="scss">
.default-layout {
  height: 100vh;

  .default-layout__wrapper {
    height: -webkit-fill-available;
    padding: 3% 20%;
  }
}
</style>