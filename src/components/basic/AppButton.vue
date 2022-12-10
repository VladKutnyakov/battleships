<template>
  <button class="btn">
    <slot />
  </button>
</template>

<script>
export default {
  name: 'AppButton',
}
</script>

<style lang="scss">
.btn {
  padding: 16px;
  border: 4px solid rgb(110, 0, 0);
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  background-color: rgb(155, 0, 0);
  cursor: pointer;
  transition: 0.2s all;

  &:hover {
    background-color: rgb(170, 0, 0);
  }
  
  &:disabled {
    cursor: unset;
    border: 4px solid rgb(110, 0, 0, 0.5);
    background-color: rgba(155, 0, 0, 0.5);
  }

  &:disabled:hover {
    background-color: rgba(155, 0, 0, 0.5);
  }
}
</style>