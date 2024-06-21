<script setup lang="ts">
import Wrapper from "./Wrapper.vue";

defineProps({
  title: { type: String, required: true },
});
</script>

<template>
  <Wrapper
    :footer="{
      text: 'Применить',
      click: () => $router.go(-1),
    }"
  >
    <div :class="$style.wrapper">
      <div :class="$style.main">
        <div :class="$style.header">
          <div :class="$style.title">{{ title }}</div>
          <slot name="header"></slot>
        </div>
        <slot name="main"></slot>
      </div>
    </div>
  </Wrapper>
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
</style>
