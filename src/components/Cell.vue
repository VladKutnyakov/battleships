<template>
  <div
    ref="cell"
    class="cell"
    @click="clickOnCell()"
    @contextmenu.prevent="removeShip()"
  >
    <div
      class="cell__status"
      :class="shipPartOnCell?.health === 0 ? 'cell__status_dead' : `cell__status_${status}`"
    />
    <!-- <ship
      ref="ship"
      v-if="shipOnCell && showShips"
      class="cell__ship"
      :length="shipOnCell.length"
      :orientation="shipOnCell.orientation"
    /> -->
    <ship-part 
      v-if="shipPartOnCell && showShips"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Ship from '@/components/Ship.vue'
import ShipPart from '@/components/ShipPart.vue'

export default {
  name: 'Cell',
  components: {
    Ship,
    ShipPart,
  },
  emits: ["placeShip", "stopRandom"],
  props: {
    index: Number,
    showShips: Boolean,
    placedShips: Array,
    randomShips: Boolean,
    dataName: String,
  },
  data() {
    return {
      status: 'initial',
    }
  },
  computed: {
    ...mapState({
      ships: state => state.ships,
      selectedShip: state => state.selectedShip,
      gameStatus: state => state.gameStatus,
    }),

    coordX () {
      return this.index % 10 !== 0 ? this.index % 10 : 10
    },
    coordY () {
      return Math.ceil(this.index / 10)
    },
    shipOnCell () {
      return this.placedShips.find(item => item?.coordinates[0].x === this.coordX && item?.coordinates[0].y === this.coordY)
    },

    shipPartOnCell () {
      return this.placedShips.find(item => item.coordinates.find(itemCoordinates => itemCoordinates.x === this.coordX && itemCoordinates.y === this.coordY))
    },

    deadShipNearby () {
      return (
        this.placedShips.find(item => item.coordinates.find(itemCoordinates => itemCoordinates.x === this.coordX && itemCoordinates.y === this.coordY + 1) && item.health === 0) ||
        this.placedShips.find(item => item.coordinates.find(itemCoordinates => itemCoordinates.x === this.coordX + 1 && itemCoordinates.y === this.coordY) && item.health === 0) ||
        this.placedShips.find(item => item.coordinates.find(itemCoordinates => itemCoordinates.x === this.coordX + 1 && itemCoordinates.y === this.coordY + 1) && item.health === 0) ||
        this.placedShips.find(item => item.coordinates.find(itemCoordinates => itemCoordinates.x === this.coordX && itemCoordinates.y === this.coordY - 1) && item.health === 0) ||
        this.placedShips.find(item => item.coordinates.find(itemCoordinates => itemCoordinates.x === this.coordX - 1 && itemCoordinates.y === this.coordY) && item.health === 0) ||
        this.placedShips.find(item => item.coordinates.find(itemCoordinates => itemCoordinates.x === this.coordX - 1 && itemCoordinates.y === this.coordY - 1) && item.health === 0) ||        this.placedShips.find(item => item.coordinates.find(itemCoordinates => itemCoordinates.x === this.coordX && itemCoordinates.y === this.coordY - 1) && item.health === 0) ||
        this.placedShips.find(item => item.coordinates.find(itemCoordinates => itemCoordinates.x === this.coordX - 1 && itemCoordinates.y === this.coordY + 1) && item.health === 0) ||
        this.placedShips.find(item => item.coordinates.find(itemCoordinates => itemCoordinates.x === this.coordX + 1 && itemCoordinates.y === this.coordY - 1) && item.health === 0) 
      )
    }
  },
  watch: {
    randomShips (newValue) {
      if (newValue && this.placedShips.length < 10) {
        this.selectRandomShip()
        this.placeShip()
      } else {
        this.$store.commit('setSelectedShip', null)
        this.$store.commit('setRandomCellsIndex', [])
        this.$emit('stopRandom')
      }
    },

    deadShipNearby (newValue) {
      if (newValue) {
        this.status = 'empty'
      }
    }
  },
  methods: {
    clickOnCell () {
      if (this.gameStatus === 'GamePreparation') {
        this.placeShip()
      } else if (this.gameStatus === 'Game' && this.dataName === 'ai') {
        this.shot()
      }
    },

    placeShip () {
      if (
        this.selectedShip?.count > 0 &&
        ((this.selectedShip?.orientation === 'horizontal' && (this.coordX + this.selectedShip?.length - 1 <= 10)) ||
        (this.selectedShip?.orientation === 'vertical' && (this.coordY + this.selectedShip?.length - 1 <= 10))) &&
        !this.checkShipsNearby(this.placedShips, this.selectedShip)
      ) {
        let coordinates = []
        for (let i = 0; i < this.selectedShip.length; i++) {
          if (this.selectedShip.orientation === 'horizontal') {
            coordinates.push({
              x: this.coordX + i,
              y: this.coordY,
            })
          } else if (this.selectedShip.orientation === 'vertical') {
            coordinates.push({
              x: this.coordX,
              y: this.coordY + i,
            })
          }
        }

        this.$emit('placeShip', {
          coordinates: coordinates,
          length: this.selectedShip.length,
          orientation: this.selectedShip.orientation,
          health: this.selectedShip.length,
        })

        this.$store.commit('decrementShipsCount', this.selectedShip.length)
      }
    },

    checkShipsNearby (shipsOnField, ship) {
      let shipFound = null
      const offset = 1
      let xBeg = this.coordX - offset
      let xEnd = null
      let yBeg = this.coordY - offset
      let yEnd = null

      // Устанавливаем начальные и конечные координаты нового корабля
      if (ship.orientation === 'horizontal') {
        xEnd = this.coordX + ship.length
        yEnd = this.coordY + offset
      }
      if (ship.orientation === 'vertical') {
        xEnd = this.coordX + offset
        yEnd = this.coordY + ship.length
      }

      // Ищем пересечения с кораблями на поле
      shipsOnField.forEach(item => {
        if (item.orientation === 'horizontal' && item.coordinates[0].y >= yBeg && item.coordinates[0].y <= yEnd) {
          if (
            (item.coordinates[0].x >= xBeg && item.coordinates[0].x <= xEnd) ||
            (item.coordinates[0].x <= xBeg && item.coordinates[0].x + item.length - 1 >= xBeg)
          ) {
            return shipFound = item
          }
        } else if (item.orientation === 'vertical' && item.coordinates[0].x >= xBeg && item.coordinates[0].x <= xEnd) {
          if (
            (item.coordinates[0].y >= yBeg && item.coordinates[0].y <= yEnd) ||
            (item.coordinates[0].y <= yBeg && item.coordinates[0].y + item.length - 1 >= yBeg)
          ) {
            return shipFound = item
          }
        }
      })

      return shipFound
    },

    removeShip () {
      if (this.gameStatus === 'GamePreparation') {
        this.placedShips.forEach(item => {
          item.coordinates.forEach(itemCoordinates => {
            if (itemCoordinates.x === this.coordX && itemCoordinates.y === this.coordY) {
              const shipLength = item.length
              this.$store.commit('removePlayerShip', item)
              this.$store.commit('incrementShipsCount', shipLength)
            }
          })
        })
      }
    },

    selectRandomShip () {
      let selectedShipIndex = Math.floor(Math.random() * 4)
      while (this.ships[selectedShipIndex]?.count === 0) {
        selectedShipIndex = Math.floor(Math.random() * 4)
      }
      const orientation = Math.floor(Math.random() * 2) === 0 ? 'horizontal' : 'vertical'
      const ship = {
        ...this.ships[selectedShipIndex],
        orientation: orientation,
      }
      this.$store.commit('setSelectedShip', ship)
    },
    
    shot () {
      let aiShip = this.shipPartOnCell
      if (aiShip) {
        if (aiShip.health > 0 && this.status !== 'dead' && this.status !== 'hit') {
          aiShip.health--
          if (aiShip.health > 0) {
            this.status = 'hit'
          } else {
            this.status = 'dead'
          }

          this.$store.commit('editAiShip', aiShip)
          
          // if (this.status === 'dead') {
          //   console.log(aiShip)
          // }
        }
      } else {
        this.status = 'empty'
      }
    },
  },
}
</script>

<style lang="scss">
.cell {
  position: relative;
  width: 40px;
  height: 40px;
  background: rgb(216,214,246);
  background: radial-gradient(circle, rgba(216,214,246,1) 0%, rgba(224,220,238,1) 0%, rgba(201,221,244,1) 100%);
  cursor: pointer;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0);
    z-index: 10;
  }

  &:hover::after {
    background: rgba(0, 0, 0, 0.1);
  }
  
  .cell__status {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    mask-position: center;
    mask-repeat: no-repeat;
    mask-size: 32px 32px;
    z-index: 12;

    &.cell__status_empty {
      mask-image: url('@/assets/svg/dot.svg');
      background-color: rgb(36, 36, 36);
    }

    &.cell__status_hit {
      mask-image: url('@/assets/svg/x.svg');
      background-color: rgb(0, 0, 0);
    }

    &.cell__status_dead {
      mask-image: url('@/assets/svg/x.svg');
      background-color: rgb(180, 50, 50);
    }
  }

  .cell__ship {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 9;
  }
}
</style>