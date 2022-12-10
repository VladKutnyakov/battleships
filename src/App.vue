<template>
  <component :is="layout" />
</template>

<script>
import GameLayout from "@/layouts/Game";

export default {
  name: 'App',
  components: {
    GameLayout,
  },
  data() {
    return {
      layout: "GameLayout",
    };
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
  }
}
</style>
