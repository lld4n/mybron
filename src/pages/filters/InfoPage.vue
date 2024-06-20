<script setup lang="ts">
import MainInfo from "../../components/MainInfo.vue";
</script>

<template>
  <div :class="$style.wrapper">
    <MainInfo />
    <div :class="$style.footer">
      <button :class="$style.btn" @click="$router.go(-1)">Применить</button>
    </div>
  </div>
</template>

<style module lang="scss">
.wrapper {
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  padding: 12px 16px;
  background-color: var(--tg-theme-bg-color);
}
.btn {
  border-radius: 12px;
  padding: 14px 0;
  font-size: 17px;
  line-height: 22px;
  letter-spacing: -0.43px;
  font-weight: 600;
  width: 100%;
  background-color: var(--tg-theme-button-color);
  color: var(--tg-theme-button-text-color);
}
</style>
