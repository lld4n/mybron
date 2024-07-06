<script setup lang="ts">
interface Props {
  width: number;
}
// TODO: анимация загрузки
defineProps<Props>();
</script>

<template>
  <div :class="$style.wrapper">
    <div :class="$style.line" :style="{ transform: `translateX(${width}%)` }">
      <div :class="$style.inner"></div>
    </div>
  </div>
</template>

<style module lang="scss">
.wrapper {
  overflow: hidden;
  border-radius: 8px;
  display: flex;
  width: 230px;
  height: 10px;
  background-color: var(--tertiary-fill-background);
  position: relative;
}
.line {
  position: absolute;
  top: 0;
  left: -100%;
  bottom: 0;
  width: 230px;
  height: 10px;
  border-radius: 8px;
  background-color: var(--tg-theme-button-color);
  transition: all 0.3s ease-in-out;
}
//.inner {
//  position: absolute;
//  top: 0;
//  left: 0;
//  right: 0;
//  bottom: 0;
//  height: 100%;
//  width: 100%;
//  background: linear-gradient(
//    90deg,
//    rgba(255, 255, 255, 0) 0%,
//    rgba(255, 255, 255, 0.2) 40%,
//    rgba(255, 255, 255, 0.5) 52%,
//    rgba(255, 255, 255, 0.2) 65%,
//    rgba(255, 255, 255, 0) 100%
//  );
//  //padding: 1px;
//  background-blend-mode: color;
//}
</style>
