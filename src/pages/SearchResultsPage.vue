<script setup lang="ts">
import Carousel from "../components/Carousel.vue";
import Sort from "../assets/icons/sort.svg";
import UpDown from "../assets/icons/up-down.svg";
</script>

<template>
  <div :class="$style.wrapper">
    <header :class="$style.header">
      <div :class="$style.info">
        <div :class="$style.title">Адлер, Россия</div>
        <div :class="$style.subtitle">31 мая — 8 июня, 2 взрослых</div>
      </div>
      <Carousel>
        <div :class="$style.sort"><Sort /></div>
        <div :class="$style.filter">
          <div :class="$style.left">
            <div :class="$style.subtitle">Цена</div>
            <div :class="$style.title">Любая</div>
          </div>
          <UpDown />
        </div>
      </Carousel>
    </header>
  </div>
</template>

<style module lang="scss">
.sort {
  flex: 0 0 44px;
  min-width: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 44px;
  border-radius: 8px;
  background-color: var(--quarternary-fill-background);
  margin-right: 8px;
  cursor: pointer;
  path {
    fill: var(--tg-theme-text-color);
  }
}
.filter {
  flex: 0 0 auto;
  min-width: 0;
  padding: 5px 10px;
  margin-right: 8px;
  border-radius: 8px;
  background-color: var(--quarternary-fill-background);
  display: flex;
  gap: 12px;
  align-items: center;
  cursor: pointer;
}
.wrapper {
  display: flex;
  flex-direction: column;
}
.header {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px 16px 0 16px;
}
.info {
  padding: 5px 10px;
  border-radius: 8px;
  background-color: var(--quarternary-fill-background);
}
.title {
  font-size: 14px;
  font-weight: 600;
  line-height: 18px;
  color: var(--tg-theme-text-color);
}
.subtitle {
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  color: var(--tg-theme-hint-color);
}
</style>
