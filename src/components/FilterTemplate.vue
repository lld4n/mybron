<script setup lang="ts">
defineProps({
  title: { type: String, required: true },
});
</script>

<template>
  <div :class="$style.wrapper">
    <div :class="$style.main">
      <div :class="$style.header">
        <div :class="$style.title">{{ title }}</div>
        <slot name="header"></slot>
      </div>
      <slot name="main"></slot>
    </div>
    <div :class="$style.footer">
      <button :class="$style.btn" @click="$router.go(-1)">Применить</button>
    </div>
  </div>
</template>

<style module lang="scss">
.wrapper {
  padding: 12px 16px;
}
.main {
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  background-color: var(--tg-theme-bg-color);
  padding-left: 16px;
}
.title {
  font-size: 20px;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: -0.45px;
  flex: 1;
}
.header {
  padding: 24px 16px 4px 0;
  display: flex;
  gap: 5px;
  align-items: center;
}
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  padding: 12px 16px;
  background-color: var(--tg-theme-bg-color);
}
.btn {
  border-radius: 12px;
  padding: 14px 0;
  font-size: 17px;
  line-height: 22px;
  letter-spacing: -0.43px;
  font-weight: 600;
  width: 100%;
  background-color: var(--tg-theme-button-color);
  color: var(--tg-theme-button-text-color);
}
</style>
