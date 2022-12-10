<template>
  <div class="game-preparation">
    <div class="game-preparation__heading">
      Подготовка
    </div>
    <div class="game-preparation__text">
      Выберите нужный корабль из аресенала, кликнув по нему. Затем кликните по клетке, чтобы поставить выбранный корабль.<br>Вы можете развернуть поставленный корабль, кликнув по нему.
    </div>
    <div class="game-preparation__redactor">
      <field />
      <ships-list />
    </div>
    <div class="game-preparation__buttons">
      <app-button
        :disabled="!isFieldReady"  
      >
        В бой!
      </app-button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Field from "@/components/Field";
import ShipsList from "@/components/gamePreparation/ShipsList";
import AppButton from "@/components/basic/AppButton";

export default {
  name: 'GamePreparation',
  components: {
    Field,
    ShipsList,
    AppButton,
  },
  computed: {
    ...mapState({
      shipsPlayer: state => state.shipsPlayer,
    }),
    isFieldReady () {
      return this.shipsPlayer.length === 10
    }
  }
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
    align-items: center;
  }

  .game-preparation__buttons {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 72px 0;
  }
}
</style>
