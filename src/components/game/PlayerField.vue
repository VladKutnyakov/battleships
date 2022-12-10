<template>
  <div class="player-field">
    <field
      :showShips="true"
    />
  </div>  
</template>

<script>
import Field from '@/components/Field'

export default {
  name: 'PlayerField',
  components: {
    Field,
  }
}
</script>

<style lang="scss" scoped>

</style>