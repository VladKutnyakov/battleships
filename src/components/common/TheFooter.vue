<template>
  <div class="footer">
    <div class="footer__contacts">
      <div class="contacts__author">
        Кутняков Владислав 2022 г.
      </div>
      <div class="contacts__socials">
        <a
          href="https://github.com/VladKutnyakov"
          target="_blank"
        >
          <div class="socials__item socials__item-github" />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheFooter',
}
</script>

<style lang="scss">
.footer {
  position: relative;
  width: 100%;
  padding: 16px 0;
  color: rgba(36, 32, 32, 0.8);
  font-size: 16px;

  .footer__contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .contacts__socials {
      padding: 8px 0 0 0;

      .socials__item {
          width: 24px;
          height: 24px;
          background-size: cover;
          background-repeat: no-repeat;
          mask-repeat: no-repeat;
          mask-size: cover;
          mask-repeat: no-repeat;
          mask-size: cover;
          background-color: rgb(0, 0, 0);
          transition: 0.2s all;

        &:hover {
          background-color: rgb(219, 197, 0);
        }

        &.socials__item-github {
          mask-image: url(@/assets/svg/github.svg);
          -webkit-mask-image: url(@/assets/svg/github.svg);
        }
      }
    }
  }
}
</style>