<template>
  <div class="header">
    <div class="header__icon">
      <img src="@/assets/svg/ship.svg" alt="">
    </div>
    <div class="header__title">
      Морской бой
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheHeader',
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
    font-size: 38px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 3px;
  }
}
</style>