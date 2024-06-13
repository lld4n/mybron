<template>
  <div class="wrapper">
    <div class="header">
      <button class="header__btn">
        <User />
      </button>
      <button class="header__btn">
        <Settings />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import User from "./assets/icons/user.svg";
import Settings from "./assets/icons/settings.svg";
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
}
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
  width: 100%;
  &__btn {
    width: 36px;
    height: 36px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background-color: var(--tg-theme-secondary-bg-color);
    :deep(path) {
      fill: var(--tg-theme-text-color);
    }
  }
}
</style>
