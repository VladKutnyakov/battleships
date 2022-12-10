<template>
  <div class="field">
    <div 
      class="field__field-grid"
    >
      <div class="field-grid__letters">
        <div
          class="letters__item"
          v-for="(letter, index) in letters"
          :key="index"
        >
          {{ letter }}
        </div>
      </div>
      <div class="field-grid__numbers">
        <div
          class="numbers__item"
          v-for="index in 10"
          :key="index"
        >
          {{ index }}
        </div>
      </div>
      <div class="field-grid__cells">
        <cell
          class="field-grid__cell"
          v-for="index in 100"
          :key="index"
          :index="index"
        />
      </div>
    </div>
  </div>  
</template>

<script>
import Cell from "@/components/Cell"

export default {
  name: 'Field',
  components: {
    Cell,
  },
  data() {
    return {
      letters: ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ж', 'З', 'И', 'К'],
    }
  },
}
</script>

<style lang="scss" scoped>
.field {
  
  .field__field-grid {
    display: grid;
    grid-template-columns: 1fr 9fr;
    grid-template-rows: 1fr 9fr;
    font-size: 24px;

    .field-grid__numbers {
      display: grid;
      grid-template-rows: repeat(10, 40px);
      align-items: center;

      .numbers__item {
        text-align: center;
      }
    }

    .field-grid__letters {
      display: grid;
      grid-template-columns: repeat(10, 40px);
      grid-column: 2/3;
      align-items: center;

      .letters__item {
        text-align: center;
      }
    }

    .field-grid__cells {
      display: grid;
      grid-template-columns: repeat(10, 40px);
      grid-template-rows: repeat(10, 40px);
    }
  }
}

</style>