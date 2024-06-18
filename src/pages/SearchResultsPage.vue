<script setup lang="ts"></script>

<template>
  <div :class="$style.wrapper">
    <header :class="$style.header">
      <div :class="$style.info">
        <div :class="$style.title">Адлер, Россия</div>
        <div :class="$style.subtitle">31 мая — 8 июня, 2 взрослых</div>
      </div>
    </header>
  </div>
</template>

<style module lang="scss">
.wrapper {
  display: flex;
  flex-direction: column;
}
.header {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px 16px 0 16px;
}
.info {
  padding: 5px 10px;
  border-radius: 8px;
  background-color: var(--quarternary-fill-background);
}
.title {
  font-size: 14px;
  font-weight: 600;
  line-height: 18px;
  color: var(--tg-theme-text-color);
}
.subtitle {
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  color: var(--tg-theme-hint-color);
}
</style>
