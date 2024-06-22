<script setup lang="ts">
interface Props {
  w?: number;
  s?: number;
  l?: number;
  c?: string;
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
    :class="c"
  >
    <slot></slot>
  </div>
</template>

<style lang="scss"></style>
