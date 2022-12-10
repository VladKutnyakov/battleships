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
          :class="{ 'ship_disabled': ship.count <= 0 }"
          :length="ship.length"
          :direction="'horizontal'"
          @click="setSelectedShip(ship)"
        />
      </div>
    </div>
    <div
      v-if="selectedShip"
      class="ships-list__selected-ship"
    >
      <div class="selected-ship__heading">
        Выбранный корабль
      </div>
      <ship
        class="selected-ship__item"
        :length="selectedShip.length"
        :direction="'horizontal'"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Ship from '@/components/Ship.vue'

export default {
  name: 'ShipList',
  components: {
    Ship,
  },
  computed: {
    ...mapState({
      ships: state => state.ships,
      selectedShip: state => state.selectedShip,
    }),
  },
  methods: {
    setSelectedShip (ship) {
      this.$store.commit('setSelectedShip', ship)
    },
  },
}
</script>

<style lang="scss">
.ships-list {
  display: flex;
  flex-direction: column;
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
      font-size: 24px;
    }

    .item__ship {
    }
  }

  .ships-list__selected-ship {

    .selected-ship__heading {
      padding: 0 0 12px 0;
      text-align: center;
    }
  }
}
</style>