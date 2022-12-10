<template>
  <div class="ships-list">
    <div class="ships-list__heading">
      Арсенал
    </div>
    <div
      class="ship-list__item"
      v-for="(ship, index) in ships"
      :key="index"
    >
      <div class="item__count">
        {{ ship.count }}
      </div>
      <div class="item__ship">
        <ship
          :length="ship.length"
          :direction="'horizontal'"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import Ship from '@/components/Ship.vue'

export default {
  name: 'ShipList',
  components: {
    Ship,
  },
  computed: {
    ...mapState({
      ships: state => state.ships,
    }),
  },
}
</script>

<style lang="scss">
.ships-list {
  display: grid;
  grid-gap: 24px;

  .ships-list__heading {
    text-align: center;
    font-weight: 600;
  }

  .ship-list__item {
    display: flex;
    justify-content: start;
    align-items: center;
    grid-gap: 24px;

    .item__count {
    }

    .item__ship {
    }
  }
}
</style>