<script setup lang="ts">
import Arrow from "../../../assets/icons/arrow.svg";
interface Props {
  left: string;
  right: string;
}
defineProps<Props>();
</script>

<template>
  <span :class="$style.date">
    {{ left }}
    <Arrow />
    {{ right }}
  </span>
</template>

<style module lang="scss">
.date {
  path {
    fill: var(--tg-theme-text-color);
  }
}
</style>
