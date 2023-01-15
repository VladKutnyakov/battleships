<template>
  <default-layout />
</template>

<script>
import DefaultLayout from '@/layouts/Default'

export default {
  name: 'App',
  components: {
    DefaultLayout,
  },
}
</script>

<style lang="scss">
@font-face {
  font-family: "Rubik";
  font-style: normal;
  /* Браузер сначала попробует найти шрифт локально */
  src: url("@/assets/fonts/Rubik.ttf")
}

html {
  scroll-behavior: smooth;
  
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Rubik', sans-serif;
    font-size: 20px;
  }
}
</style>
