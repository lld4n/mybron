<script setup lang="ts">
import Block from "../ui/wrappers/Block.vue";
import Text from "../ui/wrappers/Text.vue";
import AddGuest from "../../assets/icons/add-guest.svg";
</script>

<template>
  <Block>
    <div :class="$style.link">
      <AddGuest />
      <Text :s="17" :l="22">Указать всех гостей</Text>
    </div>
  </Block>
</template>

<style module lang="scss">
.link {
  display: flex;
  cursor: pointer;
  gap: 14px;
  align-items: center;
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
