<script setup lang="ts"></script>

<template>
  <div :class="$style.title">
    <slot></slot>
  </div>
</template>

<style module lang="scss">
.title {
  font-size: 20px;
  line-height: 24px;
  font-weight: 700;
  color: var(--tg-theme-text-color);
}
</style>
