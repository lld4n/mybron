<script setup lang="ts">
import FilterView from "../components/FilterView.vue";
import MapIcon from "../assets/icons/map.svg";
import HotelCard from "../components/HotelCard.vue";
</script>

<template>
  <div :class="$style.wrapper">
    <header :class="$style.header">
      <div :class="$style.info">
        <div :class="$style.title">Адлер, Россия</div>
        <div :class="$style.subtitle">31 мая — 8 июня, 2 взрослых</div>
      </div>
      <FilterView />
    </header>
    <div :class="$style.list">
      <HotelCard v-for="_ of Array.from({ length: 5 })" />
    </div>
    <button :class="$style.btn"><MapIcon /> На карте</button>
  </div>
</template>

<style module lang="scss">
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
.btn {
  display: flex;
  position: fixed;
  bottom: 12px;
  right: 12px;
  padding: 13px 24px;
  border-radius: 12px;
  font-size: 17px;
  line-height: 22px;
  align-items: center;
  font-weight: 600;
  background-color: var(--tg-theme-button-color);

  color: var(--tg-theme-button-text-color);
  gap: 6px;
  path {
    fill: var(--tg-theme-button-text-color);
  }
}
.list {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 20px 0;
}
</style>
