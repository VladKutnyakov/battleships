<template>
  <div class="player-field">
    <field
      :dataName="'player'"
      :placedShips="playerShips"
      :showShips="true"
      :randomShips="playerShipsRandomPlacement"
      @placeShip="$store.commit('addPlayerShip', $event)"
      @stopRandom="$store.commit('setPlayerShipsRandomPlacement', false)"
      @shotShipOnCell="shotShip($event)"
    />
  </div>  
</template>

<script>
import { mapState } from 'vuex'
import Field from '@/components/Field'

export default {
  name: 'PlayerField',
  components: {
    Field,
  },
  computed: {
    ...mapState({
      playerShips: state => state.playerShips,
      playerShipsRandomPlacement: state => state.playerShipsRandomPlacement,
      playerTurn: state => state.playerTurn,
      aiShotCellsIndex: state => state.aiShotCellsIndex,
      shotTargetDirection: state => state.shotTargetDirection,
      shotTargetCell: state => state.shotTargetCell,
      shotTargetShipIndex: state => state.shotTargetShipIndex,
    }),
  },
  watch: {
    // Сменился ход
    playerTurn (newValue) {
      if (!newValue) {
        let cell = this.shotTargetCell

        // Самый первый выстрел
        if (!cell) {
          cell = this.getRandomCellToShot()
        }
        // Попал и ищет дальше
        else if (cell.status === 'hit' || this.shotTargetShipIndex[0]) {
          this.$store.commit('setShotTargetCell', {
            x: this.shotTargetShipIndex[0] % 10 !== 0 ? this.shotTargetShipIndex[0] % 10 : 10,
            y: Math.ceil(this.shotTargetShipIndex[0] / 10),
            index: this.shotTargetShipIndex[0],
            status: cell.status,
          })
          cell = this.shotTargetCell
          cell.direction = this.changeDirection(cell)
          cell = this.getCellToShot(cell)
        }
        // Не попал
        else {
          cell = this.getRandomCellToShot()
        }
        this.makeShot({
          index: cell.index,
          status: null,
        })
      }
    },
  },
  methods: {
    // Попал по кораблю
    shotShip ($event) {
      if (!this.playerTurn) {
        let cell = $event

        // Убил
        if ($event.status === 'dead') {
          this.$store.commit('addShotTargetShipIndex', cell.index)
          this.addDeadShipIndex()
          this.$store.commit('setShotTargetShipIndex', [])
        }
        // Попал (не в первый раз)
        if ($event.status === 'hit' && this.shotTargetDirection) {
          this.$store.commit('addShotTargetShipIndex', cell.index)
          cell = this.getCellToShot(cell)
        }
        // Попал (в первый раз)
        else if ($event.status === 'hit' && !this.shotTargetDirection) {
          this.$store.commit('addShotTargetShipIndex', cell.index)
          cell.direction = this.changeDirection()
          cell = this.getCellToShot(cell)
        }
        // Не попал
        else {
          cell = this.getRandomCellToShot()
          this.$store.commit('setShotTargetDirection', null)
        }

        this.makeShot({
          x: cell.x,
          y: cell.y,
          index: cell.index,
          status: $event.status || null,
        })
      }
    },

    makeShot (cell) {
      setTimeout(() => {
        console.log('shot', cell)
        this.$store.commit('addAiShotCellsIndex', cell.index)
        this.$store.commit('setShotTargetCell', cell)
      }, 500)
    },

    getRandomCellToShot () {
      let randomCellIndex = Math.floor(Math.random() * 100 + 1)

      while (this.aiShotCellsIndex.includes(randomCellIndex)) {
        randomCellIndex = Math.floor(Math.random() * 100 + 1)
      }
      this.$store.commit('setShotTargetDirection', null)

      const target = {
        index: randomCellIndex,
      }

      return target
    },

    getCellToShot (cell) {
      const offset = 1
      let target = cell

      console.log('before', target)

      while (this.isOutsideOfField(target, target.direction) || this.isAlreadyShot(target)) {
        target.direction = this.changeDirection(target)
      }
      
      // switch (target.direction) {
      //   case 'right':
      //     target.x += offset
      //     break
      //   case 'left':
      //     target.x -= offset
      //     break
      //   case 'up':
      //     target.y -= offset
      //     break
      //   case 'down':
      //     target.y += offset
      //     break
      // }
      
      console.log('after', target)

      // target.index = target.y * 10 + target.x - 10

      console.log('after index', target.index )

      return target
    },

    changeDirection(cell) {
      let direction = this.shotTargetDirection
      if (direction && cell.status === 'hit') {
        switch (direction) {
          case 'right':
            direction = 'left'
            break
          case 'left':
            direction = 'right'
            break
          case 'up':
            direction = 'down'
            break
          case 'down':
            direction = 'up'
            break
        }
      } else {
        const directionIndex = Math.floor(Math.random() * 4 + 1)
        switch (directionIndex) {
          case 1:
            direction = 'right'
            break
          case 2:
            direction = 'left'
            break
          case 3:
            direction = 'up'
            break
          case 4:
            direction = 'down'
            break
        }
      }

      this.$store.commit('setShotTargetDirection', direction)
      return direction
    },

    isOutsideOfField (cell, direction) {
      const offset = 1
      return (
        (direction === 'right' && cell.x + offset > 10) || 
        (direction === 'left' && cell.x - offset < 1) ||
        (direction === 'up' && cell.y - offset < 1) ||
        (direction === 'down' && cell.y + offset > 10)
      )
    },

    isAlreadyShot (cell) {
      const offset = 1
      const nextCell = cell
      switch (nextCell.direction) {
        case 'right':
          nextCell.x += offset
          break
        case 'left':
          nextCell.x -= offset
          break
        case 'up':
          nextCell.y -= offset
          break
        case 'down':
          nextCell.y += offset
          break
      }
      
      nextCell.index = nextCell.index = nextCell.y * 10 + nextCell.x - 10

      return this.aiShotCellsIndex.includes(nextCell.index)
    },

    addDeadShipIndex () {
      let begIndex = Math.min(...this.shotTargetShipIndex)
      let endIndex = Math.max(...this.shotTargetShipIndex)

      if (begIndex > 10) {
        begIndex -= 10
      }
      if (begIndex % 10 !== 1) {
        begIndex -= 1
      }
      if (endIndex < 91) {
        endIndex += 10
      }
      if (endIndex % 10 !== 0) {
        endIndex += 1
      }

      let index = begIndex
      while (index <= endIndex) {
        if (!this.aiShotCellsIndex.includes(index)) {
          this.$store.commit('addAiShotCellsIndex', index)
        }
        if (index % 10 === endIndex % 10) {
          index += 10 - ((endIndex % 10 !== 0 ? endIndex % 10 : 10) - (begIndex % 10 !== 0 ? begIndex % 10 : 10))
        } else {
          index++
        }
      }
    }
  },
}
</script>

<style lang="scss">

</style>