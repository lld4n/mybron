<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    default: false,
  },
  linkText: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <div :class="$style.wrapper">
    <div :class="$style.header">
      <h2 :class="$style.title">{{ title }}</h2>
      <router-link :to="link" v-if="link" :class="$style.link">{{
        linkText
      }}</router-link>
    </div>
    <div :class="$style.main">
      <slot></slot>
    </div>
  </div>
</template>

<style module lang="scss">
.wrapper {
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: 24px 0 12px;
  background-color: var(--tg-theme-bg-color);
  border-radius: 16px;
  gap: 8px;
}
.header {
  display: flex;
  gap: 10px;
  justify-content: space-between;
  align-items: center;
}
.title {
  font-size: 20px;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: -0.45px;
  color: var(--tg-theme-text-color);
  padding-left: 16px;
}
.link {
  font-size: 17px;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: -0.43px;
  color: var(--tg-theme-link-color);
}
.main {
  padding: 12px 0;
  overflow: hidden;
}
</style>
