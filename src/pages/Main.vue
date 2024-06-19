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
        <div class="main__item" @click="$router.push('/search')">
          <div class="main__left">
            <Globe />
            <div class="main__text">Где</div>
          </div>
          <div class="main__right">Город или отель</div>
        </div>
        <div class="main__item" @click="$router.push('/dates')">
          <div class="main__left">
            <Calendar />
            <div class="main__text">Когда</div>
          </div>
          <div
            class="main__right"
            :class="{
              main__right_active: !!store.in && !!store.out,
            }"
          >
            <span v-if="!store.out">Выберите дату</span>
            <DateView
              v-if="!!store.in && !!store.out"
              :left="
                store.in?.toLocaleDateString('RU-ru', {
                  day: 'numeric',
                  month: 'long',
                  weekday: 'short',
                }) || 'Заезд'
              "
              :right="
                store.out?.toLocaleDateString('RU-ru', {
                  day: 'numeric',
                  month: 'long',
                  weekday: 'short',
                }) || 'Выезд'
              "
            />
          </div>
        </div>
        <div class="main__item" @click="$router.push('/guests')">
          <div class="main__left">
            <Group />
            <div class="main__text">Гости</div>
          </div>
          <div class="main__right main__right_active">
            {{ guests(store.adultsCount, store.children) }}
          </div>
        </div>
        <button class="main__btn" @click="$router.push('/search/results')">
          Найти отели
        </button>
      </div>
    </main>
    <section class="section">
      <!--      <Block-->
      <!--        title="Мои бронирования"-->
      <!--        link="/more"-->
      <!--        link-text="Больше"-->
      <!--      ></Block>-->
      <Block title="Недавние поиски">
        <Carousel>
          <div class="search">
            <div class="search__img" />
            <div class="search__right">
              <div class="search__title">Москва</div>
              <div class="search__content">
                <DateView left="29 сент" right="18 нояб" :size="0.8" />, 2 гостя
              </div>
            </div>
          </div>
          <div class="search">
            <div class="search__img" />
            <div class="search__right">
              <div class="search__title">Отель Метрополь</div>
              <div class="search__content">
                <DateView left="29 сент" right="18 нояб" :size="0.8" />, 2 гостя
              </div>
            </div>
          </div>
        </Carousel>
      </Block>
      <Block title="Популярные">
        <Carousel>
          <div class="popular">
            <div class="popular__img" />
            <div class="popular__title">Бандарбан</div>
            <div class="popular__amount">от 4800 ₽</div>
          </div>
          <div class="popular">
            <div class="popular__img" />
            <div class="popular__title">Бандарбан</div>
            <div class="popular__amount">от 4800 ₽</div>
          </div>
          <div class="popular">
            <div class="popular__img" />
            <div class="popular__title">Бандарбан</div>
            <div class="popular__amount">от 4800 ₽</div>
          </div>
        </Carousel>
      </Block>
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
import DateView from "../components/DateView.vue";
import Carousel from "../components/Carousel.vue";
import { guests, router, useStore } from "../utils";
import { onMounted } from "vue";
console.log(window.Telegram);
onMounted(() => {
  window.Telegram.WebApp.expand();
  if (window.Telegram.WebApp.colorScheme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
  }
});
window.Telegram.WebApp.onEvent("backButtonClicked", () => {
  router.go(-1);
});

const store = useStore();
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
    background-color: var(--tg-theme-bg-color);
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
    background-color: var(--tg-theme-bg-color);
    border-radius: 12px;
    cursor: pointer;
    font-size: 17px;
    font-weight: 400;
    line-height: 22px;
    letter-spacing: -0.43px;
  }
  &__left {
    display: flex;
    gap: 8px;
    align-items: center;
  }
  &__right {
    flex: 1;
    text-align: end;
    :deep(span) {
      color: var(--tg-theme-hint-color);
    }
    :deep(path) {
      fill: var(--tg-theme-hint-color);
    }
    color: var(--tg-theme-hint-color);
    &_active {
      :deep(span) {
        color: var(--tg-theme-text-color);
      }
      :deep(path) {
        fill: var(--tg-theme-text-color);
      }
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
  padding-bottom: 12px;
}
.search {
  flex: 0 0 240px;
  min-width: 0;
  padding: 8px 0;
  display: flex;
  gap: 10px;
  align-items: center;
  margin-right: 12px;
  &:last-child {
    margin-right: 0;
  }
  &__img {
    flex: 0 0 40px;
    width: 40px;
    height: 40px;
    border-radius: 8px;
    background-color: var(--tg-theme-secondary-bg-color);
  }
  &__right {
    display: flex;
    flex-direction: column;
    white-space: nowrap;
    user-select: none;
  }
  &__title {
    font-size: 14px;
    font-weight: 600;
    line-height: 18px;
    letter-spacing: -0.15px;
  }
  &__content {
    font-size: 12px;
    font-weight: 400;
    line-height: 16px;
    color: var(--tg-theme-hint-color);
    :deep(span) {
      color: var(--tg-theme-hint-color);
    }
    :deep(path) {
      fill: var(--tg-theme-hint-color);
    }
  }
}
.popular {
  flex: 0 0 160px;
  min-width: 0;
  width: 160px;
  height: 200px;
  border-radius: 12px;
  position: relative;
  user-select: none;
  margin-right: 12px;
  &:last-child {
    margin-right: 0;
  }
  &__img {
    background-color: var(--tg-theme-secondary-bg-color);
    border-radius: 12px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
  }
  &__title {
    font-size: 14px;
    font-weight: 600;
    line-height: 18px;
    letter-spacing: -0.15px;
    z-index: 2;
    position: absolute;
    top: 12px;
    left: 12px;
    color: var(--tg-theme-text-color);
  }
  &__amount {
    font-size: 12px;
    font-weight: 400;
    line-height: 16px;
    z-index: 2;
    position: absolute;
    top: 32px;
    left: 12px;
    color: var(--tg-theme-text-color);
  }
}
</style>
