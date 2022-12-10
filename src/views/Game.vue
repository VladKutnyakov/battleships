<template>
  <div class="game">
    <player-field />
    <a-i-field />
  </div>
</template>

<script>
import Field from '@/components/Field'
import PlayerField from '@/components/game/PlayerField'
import AIField from '@/components/game/AIField'

export default {
  name: 'Game',
  components: {
    Field,
    PlayerField,
    AIField,
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
