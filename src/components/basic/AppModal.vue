<template>
  <div
    v-if="active"
    class="modal__wrapper"
    tabindex="0"
    @click.self="close()"
  >
    <div 
      class="modal__content-wrapper"
    >
      <div
        class="modal__header"
      >
        Конец игры
      </div>
      <div
        class="modal__content"
      >
        <slot>
          Игра окончена
        </slot>
      </div>
      <div
        class="modal__footer"
      >
        <div class="footer__btn-group">
          <app-button
            @click="sumbit()"
          >
            Новая игра
          </app-button>
          <app-button @click="close()">
            Закрыть
          </app-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppButton from '@/components/basic/AppButton';

export default {
  name: 'AppModal',
  components: {
    AppButton,
  },
  props: {
    active: Boolean,
  },
  watch: {
    active (newValue) {
      if (newValue) {
        document.querySelector('body').style.overflowY = 'hidden'
        document.addEventListener('keydown', this.onEscape)
      } else {
        document.querySelector('body').style.overflowY = 'auto'
        document.removeEventListener('keydown', this.onEscape)
      }
    }
  },
  methods: {
    sumbit () {
      this.$emit('submit')
    },

    close () {
      this.$emit('close')
    },

    onEscape ($event) {
      if ($event.keyCode === 27) {
        this.close()
      }
    },
  },
}
</script>

<style lang="scss">
.modal__wrapper {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9998;

  .modal__content-wrapper {
    display: flex;
    flex-direction: column;
    position: relative;
    flex: 80% 0 1;
    align-items: center;
    z-index: 9999;

    .modal__header {
      display: flex;
      justify-content: center;
      width: 100%;
      padding: 24px;
      color: rgb(255, 255, 255);
      background-color: rgb(110, 0, 0);
      border-radius: 16px 16px 0 0;
      font-size: 24px;
    }

    .modal__content {
      display: flex;
      justify-content: center;
      padding: 24px;
      width: 100%;
      min-height: 120px;
      background-color: rgb(255, 255, 255);
    }

    .modal__footer {
      display: flex;
      justify-content: center;
      padding: 12px 24px;
      width: 100%;
      background-color: rgb(255, 255, 255);
      border-top: 1px solid rgb(56, 56, 56);
      border-radius: 0 0 16px 16px;

      .footer__btn-group {
        display: flex;
        flex: 40% 0 0;
        justify-content: space-between;
      }
    }
  }
}
</style>