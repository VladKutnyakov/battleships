<template>
  <div class="game">
    <field />
    <field />
  </div>
</template>

<script>
import Field from '@/components/Field'

export default {
  name: 'Game',
  components: {
    Field,
  }
}
</script>

<style lang="scss">
.game {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
