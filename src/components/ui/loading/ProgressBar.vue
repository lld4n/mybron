<script setup lang="ts">
import Progress from "../../../assets/progress.svg";
interface Props {
  width: number;
}
defineProps<Props>();
</script>

<template>
  <div :class="$style.wrapper">
    <Progress :class="$style.line" :style="{ transform: `translateX(${width}%)` }" />
  </div>
</template>

<style module lang="scss">
.wrapper {
  overflow: hidden !important;
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
  transition: all 0.8s ease-out;
  path[data-line="line"] {
    fill: var(--tg-theme-link-color);
  }
}
</style>
