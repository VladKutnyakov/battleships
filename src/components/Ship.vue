<template>
  <div
    class="ship"
    :class="`ship__direction-${direction}`"
  >
    <div
      class="ship__ship-cell"
      v-for="index in length"
      :key="index"
    />
  </div>
</template>

<script>
export default {
  name: 'Ship',
  props: {
    length: Number,
    direction: String,
  },
  data() {
    return {

    }
  },
}
</script>

<style lang="scss" scoped>
  .ship {
    display: flex;
    grid-gap: 2px;
    background-color: transparent;

    &.ship__direction-hors {
      flex-direction: row;
    }

    &.ship__direction-vertical {
      flex-direction: column;
    }

    .ship__ship-cell {
      width: 32px;
      height: 32px;
      background-color: rgb(219, 197, 0);
      border: 4px solid rgb(131, 118, 0);
    }
  }
</style>