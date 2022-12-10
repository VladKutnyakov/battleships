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
          :showShips="showShips"
        />
      </div>
    </div>
  </div>  
</template>

<script>
import Cell from '@/components/Cell'

export default {
  name: 'Field',
  components: {
    Cell,
  },
  props: {
    showShips: Boolean,
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
      grid-gap: 2px;
      align-items: center;

      .numbers__item {
        text-align: center;
      }
    }

    .field-grid__letters {
      display: grid;
      grid-template-columns: repeat(10, 40px);
      grid-column: 2/3;
      grid-gap: 2px;
      align-items: center;

      .letters__item {
        text-align: center;
      }
    }

    .field-grid__cells {
      display: grid;
      grid-template-columns: repeat(10, 40px);
      grid-template-rows: repeat(10, 40px);
      grid-gap: 2px;
      border: 2px solid rgb(59, 59, 59);
      background-color: rgb(59, 59, 59);
    }
  }
}

</style>