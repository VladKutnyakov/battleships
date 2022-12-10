<template>
  <div
    ref="cell"
    class="cell"
    :data-coord-x="coordX"
    :data-coord-y="coordY"
    @click="addShip()"
  >
    <div
      class="cell__status"
      :class="`cell__status_${status}`"
    />
    <ship
      v-if="shipOnCell"
      class="cell__ship"
      :length="shipOnCell.length"
      :direction="shipOnCell.direction"
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
      shipsPlayer: state => state.shipsPlayer,
    }),
    coordX () {
      return this.index % 10 !== 0 ? this.index % 10 : 10
    },
    coordY () {
      return Math.ceil(this.index / 10)
    },
    shipOnCell () {
      return this.shipsPlayer.find(item => item.x === this.coordX && item.y === this.coordY)
    },
  },
  // watch: {
  //   selectedShip (newValue) {
  //     if (newValue) {
  //       this.$refs.cell.addEventListener('mouseover', {

  //       })
  //     }
  //   },
  // },
  methods: {
    addShip () {
      if (this.selectedShip?.count > 0) {
        this.$store.commit('setPlayerShip', {
          x: this.coordX,
          y: this.coordY,
          length: this.selectedShip.length,
          direction: 'horizontal',
        })
        this.$store.commit('reduceShipsCount', this.selectedShip.length)
      }
    },
  }
}
</script>

<style lang="scss" scoped>
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