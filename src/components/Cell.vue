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
      :class="`cell__status_${status}`"
    />
    <ship
      ref="ship"
      v-if="shipOnCell && showShips"
      class="cell__ship"
      :length="shipOnCell.length"
      :orientation="shipOnCell.orientation"
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
    showShips: Boolean,
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
      gameStatus: state => state.gameStatus,
    }),
    coordX () {
      return this.index % 10 !== 0 ? this.index % 10 : 10
    },
    coordY () {
      return Math.ceil(this.index / 10)
    },
    shipOnCell () {
      return this.playerShips.find(item => item.x === this.coordX && item.y === this.coordY)
    },
  },
  watch: {
  //   selectedShip (newValue) {
  //     if (newValue) {
  //       this.$refs.cell.addEventListener('mouseenter', (event) => {
  //         if (this.isShipsNearby) {
  //           this.status = 'empty'
  //         }
  //       })
  //       this.$refs.cell.addEventListener('mouseleave', (event) => {
  //         if (this.isShipsNearby) {
  //           this.status = 'empty'
  //         } else {
  //            this.status = 'initial'
  //         }
  //       })
  //     }
  //   },
    randomShips (newValue) {
      if (newValue && this.playerShips.length !== 10) {
        this.selectRandomShip()
        this.placeShip()
      } else {
        this.$store.commit('setSelectedShip', null)
        this.$store.commit('setPlayerShipsRandomPlacement', false)
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
        !this.checkShipsNearby()
      ) {
        this.$store.commit('addPlayerShip', {
          x: this.coordX,
          y: this.coordY,
          length: this.selectedShip.length,
          orientation: this.selectedShip.orientation,
        })
        this.$store.commit('decrementShipsCount', this.selectedShip.length)
      }
    },
    checkShipsNearby () {
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
      this.playerShips.forEach(item => {
        if (item.orientation === 'horizontal' && item.y >= yBeg && item.y <= yEnd) {
          if (
            (item.x >= xBeg && item.x <= xEnd) ||
            (item.x <= xBeg && item.x + item.length - 1 >= xBeg)
          ) {
            return shipFound = true
          }
        } else if (item.orientation === 'vertical' && item.x >= xBeg && item.x <= xEnd) {
          if (
            (item.y >= yBeg && item.y <= yEnd) ||
            (item.y <= yBeg && item.y + item.length - 1 >= yBeg)
          ) {
            return shipFound = true
          }
        }
      })
      return shipFound
    },
    shot () {

    },
    removeShip () {
      if (this.gameStatus === 'GamePreparation') {
        this.playerShips.forEach(item => {
          if (item.orientation === 'horizontal') {
            if (this.coordX >= item.x && this.coordX <= item.x + item.length - 1 && this.coordY === item.y) {
              const shipLength = item.length
              this.$store.commit('removePlayerShip', item)
              this.$store.commit('incrementShipsCount', shipLength)
              return
            }
          }
          else if (item.orientation === 'vertical') {
            if (this.coordY >= item.y && this.coordY <= item.y + item.length - 1 && this.coordX === item.x) {
              const shipLength = item.length
              this.$store.commit('removePlayerShip', item)
              this.$store.commit('incrementShipsCount', shipLength)
              return
            }
          }
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
    }
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
  }

  .cell__ship {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 9;
  }
}
</style>