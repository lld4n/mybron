<script setup lang="ts">
interface Props {
  click: () => void;
  text: string;
}
defineProps<Props>();
</script>

<template>
  <div :class="$style.wrapper">
    <button :class="$style.btn" @click="click">{{ text }}</button>
  </div>
</template>

<style module lang="scss">
.wrapper {
  padding: 16px;
  width: 100%;
}
.btn {
  width: 100%;
  padding: 14px 0;
  background-color: var(--tertiary-fill-background);
  border-radius: 12px;
  font-size: 17px;
  line-height: 22px;
  font-weight: 600;
  color: var(--tg-theme-text-color);
  transition: opacity 0.1s ease-out;
  &:not([disabled]):active {
    opacity: 0.6 !important;
  }
  @media (hover: hover) {
    &:not([disabled]):hover {
      opacity: 0.85;
    }
  }
}
</style>
