<script setup lang="ts">
import HotelButton from "./HotelButton.vue";
import DateView from "../DateView.vue";
import Pencil from "../../assets/icons/pencil.svg";
</script>

<template>
  <div :class="$style.wrapper">
    <div :class="$style.top">
      <div :class="$style.left">
        <div :class="$style.title"><DateView left="31 мая" right="8 июня" /></div>
        <div :class="$style.text">2 взрослых</div>
      </div>
      <button :class="$style.btn" @click="$router.push('/hotel/1/info')">
        <Pencil />
      </button>
    </div>
    <HotelButton text="7 вариантов от 17 000 ₽" :click="() => $router.push('')" />
  </div>
</template>

<style module lang="scss">
.wrapper {
  border-radius: 12px;
  background-color: var(--tg-theme-bg-color);
}
.top {
  padding: 24px 16px 0;
  display: flex;
  align-items: center;
  gap: 10px;
}
.left {
  flex: 1;
}
.title {
  font-size: 20px;
  line-height: 24px;
  font-weight: 700;
  color: var(--tg-theme-text-color);
}
.text {
  font-size: 14px;
  line-height: 18px;
  font-weight: 400;
  color: var(--tg-theme-hint-color);
}
</style>
