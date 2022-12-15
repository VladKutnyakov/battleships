<template>
  <div class="ai-field">
    <field
      :showPlayerShips="false"
      :randomShips="aiShipsRandomPlacement"
    />
  </div>  
</template>

<script>
import { mapState } from 'vuex'
import Field from '@/components/Field'

export default {
  name: 'AIField',
  components: {
    Field,
  },
  computed: {
    ...mapState({
      aiShipsRandomPlacement: state => state.aiShipsRandomPlacement,
    }),
  },
  mounted () {
    this.$store.commit('resetShips')
    this.$store.commit('setAiShips', [])
    this.$store.commit('setAiShipsRandomPlacement', true)
  }
}
</script>

<style lang="scss">

</style>