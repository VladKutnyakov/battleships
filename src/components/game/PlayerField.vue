<template>
  <div class="player-field">
    <field
      :showPlayerShips="true"
    />
  </div>  
</template>

<script>
import Field from '@/components/Field'

export default {
  name: 'PlayerField',
  components: {
    Field,
  },
}
</script>

<style lang="scss">

</style>