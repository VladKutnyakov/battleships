<template>
  <div
    ref="cell"
    class="cell"
    :data-coord-x="coordX"
    :data-coord-y="coordY"
    @click="clickOnCell()"
    @contextmenu.prevent="removeShip()"
  >
    <div
      class="cell__status"
      :class="!showPlayerShips && aiShipOnCell?.health === 0 ? 'cell__status_dead' : `cell__status_${status}`"
    />
    <ship
      ref="playerShip"
      v-if="playerShipOnCell && showPlayerShips"
      class="cell__ship"
      :length="playerShipOnCell.length"
      :orientation="playerShipOnCell.orientation"
    />
  </div>  
</template>

<script>
import { mapState } from 'vuex'
import Ship from '@/components/Ship.vue'

export default {
  name: 'Cell',
  components: {
    Ship,
  },
  props: {
    index: Number,
    showPlayerShips: Boolean,
    randomShips: Boolean,
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
      playerShips: state => state.playerShips,
      aiShips: state => state.aiShips,
      playerShipsRandomPlacement: state => state.playerShipsRandomPlacement,
      aiShipsRandomPlacement: state => state.aiShipsRandomPlacement,
      gameStatus: state => state.gameStatus,
    }),
    coordX () {
      return this.index % 10 !== 0 ? this.index % 10 : 10
    },
    coordY () {
      return Math.ceil(this.index / 10)
    },
    playerShipOnCell () {
      return this.playerShips.find(item => item?.coordinates[0].x === this.coordX && item?.coordinates[0].y === this.coordY)
    },

    aiShipOnCell () {
      return this.aiShips.find(item => item.coordinates.find(itemCoordinates => itemCoordinates.x === this.coordX && itemCoordinates.y === this.coordY))
    },
  },
  watch: {
    randomShips (newValue) {
      if (
          newValue &&
          (this.playerShipsRandomPlacement && this.playerShips.length !== 10) ||
          (this.aiShipsRandomPlacement && this.aiShips.length !== 10)) {
        this.selectRandomShip()
        this.placeShip()
      } else {
        this.$store.commit('setSelectedShip', null)
        if (this.playerShipsRandomPlacement) {
          this.$store.commit('setPlayerShipsRandomPlacement', false)
        }
        if (this.aiShipsRandomPlacement) {
          this.$store.commit('setAiShipsRandomPlacement', false)
        }
        this.$store.commit('setRandomCellsIndex', [])
      }
    }
  },
  methods: {
    clickOnCell () {
      if (this.gameStatus === 'GamePreparation') {
        this.placeShip()
      } else if (this.gameStatus === 'Game') {
        this.shot()
      }
    },

    placeShip () {
      if (
        this.selectedShip?.count > 0 &&
        ((this.selectedShip?.orientation === 'horizontal' && (this.coordX + this.selectedShip?.length - 1 <= 10)) ||
        (this.selectedShip?.orientation === 'vertical' && (this.coordY + this.selectedShip?.length - 1 <= 10))) &&
        (
          (!this.checkShipsNearby(this.playerShips) && !this.aiShipsRandomPlacement) ||
          (!this.checkShipsNearby(this.aiShips) && this.aiShipsRandomPlacement)
        )
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

        if (this.aiShipsRandomPlacement) {
          this.$store.commit('addAiShip', {
            coordinates: coordinates,
            length: this.selectedShip.length,
            orientation: this.selectedShip.orientation,
            health: this.selectedShip.length,
          })
        } else {
          this.$store.commit('addPlayerShip', {
            coordinates: coordinates,
            length: this.selectedShip.length,
            orientation: this.selectedShip.orientation,
            health: this.selectedShip.length,
          })
        }
        console.log(this.selectedShip.length)
        this.$store.commit('decrementShipsCount', this.selectedShip.length)
      }
    },

    checkShipsNearby (shipsOnField) {
      let shipFound = false
      const offset = 1
      let xBeg = this.coordX - offset
      let xEnd
      let yBeg = this.coordY - offset
      let yEnd

      // Устанавливаем начальные и конечные координаты нового корабля
      if (this.selectedShip.orientation === 'horizontal') {
        xEnd = this.coordX + this.selectedShip.length
        yEnd = this.coordY + offset
      }
      if (this.selectedShip.orientation === 'vertical') {
        xEnd = this.coordX + offset
        yEnd = this.coordY + this.selectedShip.length
      }

      // Ищем пересечения с кораблями на поле
      shipsOnField.forEach(item => {
        if (item.orientation === 'horizontal' && item.coordinates[0].y >= yBeg && item.coordinates[0].y <= yEnd) {
          if (
            (item.coordinates[0].x >= xBeg && item.coordinates[0].x <= xEnd) ||
            (item.coordinates[0].x <= xBeg && item.coordinates[0].x + item.length - 1 >= xBeg)
          ) {
            return shipFound = true
          }
        } else if (item.orientation === 'vertical' && item.coordinates[0].x >= xBeg && item.coordinates[0].x <= xEnd) {
          if (
            (item.coordinates[0].y >= yBeg && item.coordinates[0].y <= yEnd) ||
            (item.coordinates[0].y <= yBeg && item.coordinates[0].y + item.length - 1 >= yBeg)
          ) {
            return shipFound = true
          }
        }
      })

      return shipFound
    },

    removeShip () {
      if (this.gameStatus === 'GamePreparation') {
        this.playerShips.forEach(item => {
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
      const aiShip = this.aiShipOnCell
      if (aiShip) {
        if (aiShip.health > 0 && this.status !== 'dead') {
          aiShip.health--
          if (aiShip.health > 0) {
            this.status = 'hit'
          } else {
            this.status = 'dead'
          }
          this.$store.commit('editAiShip', aiShip)
        }
      } else {
        this.status = 'empty'
      }
    },
  }
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
    width: 100%;
    height: 100%;
    mask-position: center;
    mask-repeat: no-repeat;
    mask-size: 32px 32px;
    z-index: 11;

    &.cell__status_empty {
      mask-image: url('@/assets/svg/dot.svg');
      background-color: rgb(36, 36, 36);
    }

    &.cell__status_hit {
      mask-image: url('@/assets/svg/x.svg');
      background-color: rgb(180, 50, 50);
    }

    &.cell__status_dead {
      mask-image: url('@/assets/svg/x.svg');
      background-color: rgb(0, 0, 0);
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