<script setup lang="ts">
import Text from "../ui/wrappers/Text.vue";
</script>

<template>
  <div :class="$style.wrapper">
    <div :class="$style.top">
      <Text :s="20" :l="24" :w="600">40 000 ₽</Text>
      <Text :s="14" :l="18">2 гостя, 7 ночей</Text>
    </div>
    <div :class="$style.list">
      <Text :s="14" :l="18">Без питания</Text>
      <Text :s="14" :l="18" :c="$style.green">Бесплатная отмена</Text>
      <Text :s="14" :l="18">Предоплата картой</Text>
    </div>
    <button :class="$style.btn" @click="$router.push('/checkout')">
      <Text :s="17" :l="22" :w="600">Выбрать</Text>
    </button>
  </div>
</template>

<style module lang="scss">
.wrapper {
  padding: 12px;
  border: 1px solid var(--tg-theme-secondary-bg-color);
  border-radius: 12px;
}
.top {
  display: flex;
  flex-direction: column;
}
.list {
  margin-top: 16px;
  margin-bottom: 22px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.btn {
  min-width: 170px;
  width: 100%;
  padding: 14px 0;
  border-radius: 12px;
  background-color: var(--tg-theme-button-color);
  color: var(--tg-theme-button-text-color);
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
