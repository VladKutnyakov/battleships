<template>
  <div class="field">
    <div 
      class="field__grid"
    >
      <div
        class="grid__cell"
        v-for="index in 100"
        :key="index"
      >
        <cell />
      </div>
    </div>
  </div>  
</template>

<script>
import Cell from "@/components/Cell"

export default {
  components: {
    Cell,
  },
  data() {
    return {

    }
  },
}
</script>

<style lang="scss" scoped>
.field {
  display: grid;
  
  .field__grid {
    grid-template-columns: repeat(10, 40px);
  }
}

</style>