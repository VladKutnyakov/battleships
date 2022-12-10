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
html {
  scroll-behavior: smooth;
  
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Noto Sans', sans-serif;
    font-size: 20px;
  }
}
</style>
