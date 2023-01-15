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
      aiUsedDirections: state => state.aiUsedDirections,
      shotTargetDirection: state => state.shotTargetDirection,
      shotTargetCell: state => state.shotTargetCell,
      shotTargetShipIndex: state => state.shotTargetShipIndex,
    }),
    
    alivePlayerShipsCount () {
      return this.playerShips.filter(item => item.health > 0).length
    },
  },
  watch: {
    // Сменился ход
    playerTurn (newValue) {
      if (!newValue) {
        let cell = this.shotTargetCell

        // Самый первый выстрел
        if (!cell) {
          console.log('Самый первый выстрел')
          cell = this.getRandomCellToShot()
        }
        // Попал и ищет дальше
        else if (cell.status === 'hit' || this.shotTargetShipIndex[0]) {
          console.log('Попал и ищет дальше')
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
          console.log('Не попал')
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
      if (!this.playerTurn && this.alivePlayerShipsCount > 0) {
        let cell = $event

        // Убил
        if ($event.status === 'dead') {
          console.log('Убил')
          this.$store.commit('addShotTargetShipIndex', cell.index)
          this.addDeadShipIndex()
          this.$store.commit('setShotTargetShipIndex', [])
          this.$store.commit('setAiUsedDirections', [])
        }
        // Попал (не в первый раз)
        if ($event.status === 'hit' && this.shotTargetDirection) {
          console.log('Попал (не в первый раз)')
          this.$store.commit('addShotTargetShipIndex', cell.index)
          cell.direction = this.shotTargetDirection
          cell = this.getCellToShot(cell)
        }
        // Попал (в первый раз)
        else if ($event.status === 'hit' && !this.shotTargetDirection) {
          console.log('Попал (в первый раз)')
          this.$store.commit('addShotTargetShipIndex', cell.index)
          cell.direction = this.changeDirection()
          this.$store.commit('addAiUsedDirections', cell.direction)
          cell = this.getCellToShot(cell)
        }
        // Не попал
        else {
          console.log('Не попал')
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

      // console.log('get cell to shot before', target)

      while (this.isOutsideOfField(target, target.direction) || this.isAlreadyShot(target)) {
        target.direction = this.changeDirection(target)
      }
      // console.log('get cell to shot проверки', target)
      
      switch (target.direction) {
        case 'right':
          target.x += offset
          break
        case 'left':
          target.x -= offset
          break
        case 'up':
          target.y -= offset
          break
        case 'down':
          target.y += offset
          break
      }

      target.index = target.y * 10 + target.x - 10

      // console.log('get cell to shot after', target)

      return target
    },

    changeDirection(cell) {
      console.log('change direction from', this.shotTargetDirection)
      let direction = this.shotTargetDirection
      if (direction && cell.status === 'hit' && this.aiUsedDirections.length < 2) {
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
        this.$store.commit('addAiUsedDirections', direction)
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
      console.log('change direction to', this.shotTargetDirection)
      return direction
    },

    isOutsideOfField (cell, direction) {
      const offset = 1
      const nextCell = cell
      return (
        (direction === 'right' && nextCell.x + offset > 10) || 
        (direction === 'left' && nextCell.x - offset < 1) ||
        (direction === 'up' && nextCell.y - offset < 1) ||
        (direction === 'down' && nextCell.y + offset > 10)
      )
    },

    isAlreadyShot (cell) {
      const offset = 1
      
      switch (cell.direction) {
        case 'right':
          return this.aiShotCellsIndex.includes(cell.index + offset)
        case 'left':
          return this.aiShotCellsIndex.includes(cell.index - offset)
        case 'up':
          return this.aiShotCellsIndex.includes(cell.index - offset * 10)
        case 'down':
          return this.aiShotCellsIndex.includes(cell.index + offset * 10)
      }
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