<script setup lang="ts"></script>

<template>
  <div :class="$style.wrapper">
    <slot></slot>
  </div>
</template>

<style module lang="scss">
.wrapper {
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background-color: var(--tg-theme-bg-color);
  border-radius: 16px;
}
</style>
