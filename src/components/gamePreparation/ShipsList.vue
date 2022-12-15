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
          :orientation="'horizontal'"
          @click="chooseShip(ship)"
        />
      </div>
    </div>
    <div
      v-if="selectedShip && !playerShipsRandomPlacement"
      class="ships-list__selected-ship"
    >
      <div class="selected-ship__heading">
        Выбранный корабль
      </div>
      <div class="selected-ship__ship-item">
        <ship
          :length="selectedShip.length"
          :orientation="selectedShip.orientation"
        />
        <div
          class="ship-item__icon"
          @click="flipChoosenShip()"
        >
          <img src="@/assets/svg/arrow-flip.svg" />
        </div>
      </div>
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
      playerShipsRandomPlacement: state => state.playerShipsRandomPlacement,
    }),
  },
  methods: {
    chooseShip (ship) {
      ship.orientation = 'horizontal'
      this.$store.commit('setSelectedShip', ship)
    },
    flipChoosenShip () {
      let newShip = this.selectedShip
      if (newShip.orientation === 'horizontal') {
        newShip.orientation = 'vertical'
      } else if (newShip.orientation === 'vertical') {
        newShip.orientation = 'horizontal'
      }
      this.$store.commit('setSelectedShip', newShip)
    }
  },
}
</script>

<style lang="scss">
.ships-list {
  display: flex;
  flex-direction: column;
  grid-gap: 16px;
  min-width: 210px;

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

    .selected-ship__ship-item {
      display: flex;
      align-items: start;
      justify-content: space-between;
      // grid-gap: 4px;

      .ship-item__icon {
        width: 40px;
        cursor: pointer;

        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>