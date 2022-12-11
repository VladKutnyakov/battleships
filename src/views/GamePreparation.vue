<template>
  <div class="game-preparation">
    <div class="game-preparation__heading">
      Подготовка
    </div>
    <div class="game-preparation__text">
      Выберите нужный корабль из аресенала, кликнув по нему. Затем кликните по клетке поля, чтобы поставить выбранный корабль. <br> Для удаления корябля с поля кликните по нему правой кнопкой мыши.
    </div>
    <div class="game-preparation__redactor">
      <field 
        :showShips="true"
      />
      <ships-list />
    </div>
    <div class="game-preparation__buttons">
      <app-button
        :disabled="!isFieldReady"
        @click="startGame()" 
      >
        В бой!
      </app-button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Field from '@/components/Field'
import ShipsList from '@/components/gamePreparation/ShipsList'
import AppButton from '@/components/basic/AppButton'

export default {
  name: 'GamePreparation',
  components: {
    Field,
    ShipsList,
    AppButton,
  },
  computed: {
    ...mapState({
      playerShips: state => state.playerShips,
    }),
    isFieldReady () {
      return this.playerShips.length === 10
    },
  },
  methods: {
    startGame () {
      this.$store.commit('setGameStatus', 'Game')
    }
  },
}
</script>

<style lang="scss">
.game-preparation {

  .game-preparation__heading {
    padding: 0 0 12px 0;
    text-align: center;
    font-weight: 600;
    font-size: 32px;
  }

  .game-preparation__text {
    padding: 0 0 12px 0;
    text-align: center;
    font-size: 18px;
  }

  .game-preparation__redactor {
    padding: 48px 0;
    display: flex;
    justify-content: space-between;
  }

  .game-preparation__buttons {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 48px 0 0 0;
  }
}
</style>
