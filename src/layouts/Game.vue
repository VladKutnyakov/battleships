<template>
  <div class="game-layout">
    <div class="game-layout__wrapper">
      <field />
      <field />
    </div>
  </div>
</template>

<script>
import Field from "@/components/Field";

export default {
  name: 'GameLayout',
  components: {
    Field,
  }
}
</script>

<style lang="scss">
.game-layout {
  height: 100vh;

  .game-layout__wrapper {
    display: flex;
    height: -webkit-fill-available;
    padding: 10%;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
