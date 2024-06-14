<script setup lang="ts">
import Search from "../assets/icons/search.svg";
import Point from "../assets/icons/point.svg";
const value = defineModel("value");
</script>

<template>
  <div class="wrapper">
    <label class="header" for="search">
      <Search />
      <input
        id="search"
        type="text"
        placeholder="Город или отель"
        class="input"
        autocomplete="off"
        v-model="value"
      />
    </label>
    <div class="content">
      <div class="content__block">
        <div class="content__list">
          <div class="content__item">
            <Point />
            <div class="content__info">
              <div class="content__left">
                <div class="content__city">Москва</div>
                <div class="content__location">Россия</div>
              </div>
              <div class="content__right">1500 отелей</div>
            </div>
          </div>
          <div class="content__bar" />
          <div class="content__item">
            <Point />
            <div class="content__info">
              <div class="content__left">
                <div class="content__city">Москва</div>
                <div class="content__location">Россия</div>
              </div>
              <div class="content__right">1500 отелей</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="content__block">
        <div class="content__title">Рядом с вами</div>
        <div class="content__list">
          <div class="content__item">
            <Point />
            <div class="content__info">
              <div class="content__left">
                <div class="content__city">Москва</div>
                <div class="content__location">Россия</div>
              </div>
              <div class="content__right">1500 отелей</div>
            </div>
          </div>
        </div>
      </div>
      <div class="content__additional">Основано на выбранном языке и вашем IP</div>
    </div>
    <div class="content">
      <div class="content__block">
        <div class="content__title">Популярные</div>
        <div class="content__list">
          <div class="content__item">
            <Point />
            <div class="content__info">
              <div class="content__left">
                <div class="content__city">Москва</div>
                <div class="content__location">Россия</div>
              </div>
              <div class="content__right">1500 отелей</div>
            </div>
          </div>
          <div class="content__bar" />
          <div class="content__item">
            <Point />
            <div class="content__info">
              <div class="content__left">
                <div class="content__city">Москва</div>
                <div class="content__location">Россия</div>
              </div>
              <div class="content__right">1500 отелей</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  display: flex;
  flex-direction: column;
  padding: 16px;
  height: 100%;
}
.header {
  margin-bottom: 20px;
  display: flex;
  padding: 8px;
  border-radius: 10px;
  background: var(--tg-theme-bg-color);
  gap: 6px;
  align-items: center;
  :deep(path) {
    fill: var(--tg-theme-hint-color);
  }
}
.input {
  flex: 1;
  width: 100%;
  font-size: 17px;
  line-height: 22px;
  background-color: var(--tg-theme-bg-color);
  letter-spacing: -0.4px;
  color: var(--tg-theme-text-color);

  &::placeholder {
    color: var(--tg-theme-hint-color);
  }
}
.content {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 8px;
  &__block {
    display: flex;
    border-radius: 12px;
    flex-direction: column;
    background-color: var(--tg-theme-bg-color);
  }
  &__additional {
    font-size: 13px;
    font-weight: 400;
    line-height: 18px;
    letter-spacing: -0.08px;
    color: var(--tg-theme-hint-color);
    padding: 5px 16px;
  }
  &__title {
    font-size: 20px;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: -0.45px;
    padding: 16px 16px 0 16px;
  }
  &__list {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
  &__item {
    width: 100%;
    display: flex;
    gap: 18px;
    align-items: center;
    padding: 10px 0 10px 16px;
  }
  &__info {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 16px;
  }
  &__left {
    display: flex;
    flex-direction: column;
    flex: 1;
  }
  &__city {
    font-size: 17px;
    font-weight: 400;
    line-height: 22px;
    letter-spacing: -0.43px;
    color: var(--tg-theme-text-color);
  }
  &__location {
    font-size: 14px;
    line-height: 18px;
    font-weight: 400;
    letter-spacing: -0.15px;
    color: var(--tg-theme-hint-color);
  }
  &__right {
    font-size: 14px;
    font-weight: 400;
    line-height: 18px;
    letter-spacing: -0.15px;
    color: var(--tg-theme-hint-color);
    padding-right: 16px;
  }
  &__bar {
    width: calc(100% - 36px);
    height: 1px;
    margin-left: 36px;
    background-color: var(--tg-theme-secondary-bg-color);
  }
}
</style>
