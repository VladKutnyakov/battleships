<template>
  <div class="default-layout">
    <div class="default-layout__wrapper">
      <component :is="view" />
    </div>
  </div>
</template>

<script>
import Game from "@/views/Game.vue";
import GamePreparation from "@/views/GamePreparation.vue";

export default {
  name: 'DefaultLayout',
  components: {
    Game,
    GamePreparation,
  },
  data() {
    return {
      view: 'GamePreparation',
    };
  },
}
</script>

<style lang="scss">
.default-layout {
  height: 100vh;

  .default-layout__wrapper {
    height: -webkit-fill-available;
    padding: 5% 10%;
  }
}
</style>