<template>
  <div
    class="ship"
    :class="`ship__orientation-${orientation}`"
    :data-ship-length="length"
  >
    <div
      class="ship__ship-part"
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
    orientation: String,
  },
}
</script>

<style lang="scss">
.ship {
  display: flex;
  grid-gap: 2px;
  background-color: transparent;
  cursor: pointer;

  &.ship__orientation-hors {
    flex-direction: row;
  }

  &.ship__orientation-vertical {
    flex-direction: column;
  }

  &.ship_disabled {
    cursor: default;

    .ship__ship-part {
      background-color: rgba(219, 197, 0, 0.5);
      border: 4px solid rgba(131, 118, 0, 0.5);
    }
  }

  .ship__ship-part {
    width: 32px;
    height: 32px;
    background-color: rgb(219, 197, 0);
    border: 4px solid rgb(131, 118, 0);
  }
}
</style>