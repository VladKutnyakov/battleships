<template>
  <div class="game">
    <player-field />
    <a-i-field />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Field from '@/components/Field'
import PlayerField from '@/components/game/PlayerField'
import AIField from '@/components/game/AIField'

export default {
  name: 'Game',
  components: {
    Field,
    PlayerField,
    AIField,
  },
  computed: {
    ...mapState({
      aiShips: state => state.aiShips,
    })
  },
  // watch: {
  //   aiShips (newValue) {
  //     console.log(newValue)
  //     if (newValue.length > 0 && !newValue.find(item => item.health > 0)) {
  //       console.log('Победа!')
  //     }
  //   }
  // },
}
</script>

<style lang="scss">
.game {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
