<script setup lang="ts">
interface Props {
  w?: number;
  s?: number;
  l?: number;
  c?: string;
  g?: boolean;
}
defineProps<Props>();
</script>

<template>
  <div
    :style="{
      fontWeight: w || 400,
      lineHeight: l + 'px' || '20px',
      fontSize: s + 'px' || '14px',
    }"
    :class="[
      c,
      {
        [$style.gray]: g,
      },
    ]"
  >
    <slot></slot>
  </div>
</template>

<style module lang="scss">
.gray {
  color: var(--tg-theme-hint-color);
}
</style>
