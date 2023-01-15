<template>
  <div class="default-layout">
    <div class="default-layout__wrapper">
      <the-header />
      <component class="default-layout__content" :is="gameStatus" />
      <the-footer />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import TheHeader from '@/components/common/TheHeader.vue'
import TheFooter from '@/components/common/TheFooter.vue'
import Game from '@/views/Game.vue'
import GamePreparation from '@/views/GamePreparation.vue'

export default {
  name: 'DefaultLayout',
  components: {
    TheHeader,
    TheFooter,
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
    display: flex;
    flex-direction: column;
    height: -webkit-fill-available;
    padding: 0 10%;

    .default-layout__content {
      flex: 100% 1 1;
    }
  }
}
</style>