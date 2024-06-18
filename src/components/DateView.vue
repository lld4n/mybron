<script setup lang="ts">
import Arrow from "../assets/icons/arrow.svg";
defineProps({
  left: String,
  right: String,
  size: {
    type: Number,
    required: false,
    default: 1,
  },
});
</script>

<template>
  <span class="date">
    {{ left }}
    <Arrow :style="{ transform: 'scale(' + size + ')' }" />
    {{ right }}
  </span>
</template>

<style scoped lang="scss">
.date {
  :deep(path) {
    fill: var(--tg-theme-text-color);
  }
}
</style>
