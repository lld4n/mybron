<template>
  <div class="wrapper">
    <header class="header">
      <button class="header__btn">
        <User />
      </button>
      <button class="header__btn">
        <Settings />
      </button>
    </header>
    <main class="main">
      <div class="main__top">
        <Logo />
        <h1 class="main__title">Забронируйте отель<br /><span>очень быстро</span></h1>
      </div>
      <div class="main__list">
        <div class="main__item">
          <div class="main__left">
            <Globe />
            <div class="main__text">Где</div>
          </div>
          <div class="main__right">Город или отель</div>
        </div>
        <div class="main__item">
          <div class="main__left">
            <Calendar />
            <div class="main__text">Когда</div>
          </div>
          <div class="main__right main__right_active">5 июня, ср → 6 июня, чт</div>
        </div>
        <div class="main__item">
          <div class="main__left">
            <Group />
            <div class="main__text">Гости</div>
          </div>
          <div class="main__right main__right_active">2 взрослых</div>
        </div>
        <button class="main__btn">Найти отели</button>
      </div>
    </main>
    <section class="section">
      <Block title="Мои бронирования" link="/more" link-text="Больше"></Block>
      <Block title="Недавние поиски"></Block>
      <Block title="Популярные"></Block>
    </section>
  </div>
</template>

<script setup lang="ts">
import User from "../assets/icons/user.svg";
import Settings from "../assets/icons/settings.svg";
import Logo from "../assets/logo.svg";
import Globe from "../assets/icons/globe.svg";
import Calendar from "../assets/icons/calendar.svg";
import Group from "../assets/icons/group.svg";
import Block from "../components/Block.vue";
// @ts-ignore
console.log(window.Telegram);
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
}
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px 0;
  width: 100%;
  &__btn {
    width: 36px;
    height: 36px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background-color: var(--tg-theme-secondary-bg-color);
    :deep(path) {
      fill: var(--tg-theme-text-color);
    }
  }
}
.main {
  padding: 0 16px 48px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  &__top {
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: center;
    width: 100%;
  }
  &__title {
    text-align: center;
    font-size: 28px;
    font-weight: 700;
    line-height: 30px;
    letter-spacing: -2%;
    color: var(--tg-theme-text-color);
    span {
      color: var(--tg-theme-accent-text-color);
    }
  }
  &__list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
  }
  &__item {
    display: flex;
    gap: 12px;
    padding: 12px;
    align-items: center;
    background-color: var(--tg-theme-secondary-bg-color);
    border-radius: 12px;
    cursor: pointer;
    font-size: 17px;
    font-weight: 400;
    line-height: 22px;
    letter-spacing: -0.43px;
    :deep(path) {
      fill: var(--tg-theme-hint-color);
    }
  }
  &__left {
    display: flex;
    gap: 8px;
    align-items: center;
  }
  &__right {
    flex: 1;
    text-align: end;
    color: var(--tg-theme-hint-color);
    &_active {
      color: var(--tg-theme-text-color);
    }
  }
  &__btn {
    padding: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--tg-theme-button-color);
    color: var(--tg-theme-button-text-color);
    border-radius: 12px;
    font-size: 17px;
    line-height: 22px;
    letter-spacing: -0.43px;
    text-align: center;
    font-weight: 600;
    margin-top: 8px;
  }
}
.section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
