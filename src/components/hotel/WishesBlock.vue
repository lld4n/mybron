<script setup lang="ts">
import Block from "../ui/wrappers/Block.vue";
import Text from "../ui/wrappers/Text.vue";
import AddWish from "../../assets/icons/add-wish.svg";
</script>

<template>
  <Block>
    <div :class="$style.link">
      <AddWish />
      <Text :s="17" :l="22">Добавить пожелания</Text>
    </div>
  </Block>
</template>

<style module lang="scss">
.link {
  display: flex;
  gap: 14px;
  align-items: center;
  cursor: pointer;
  padding: 11px 16px;
  color: var(--tg-theme-link-color);
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
