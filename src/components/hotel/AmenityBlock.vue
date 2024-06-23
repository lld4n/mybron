<script setup lang="ts">
import Block from "../ui/wrappers/Block.vue";
import Title from "../ui/wrappers/Title.vue";
import HotelButton from "./HotelButton.vue";
</script>

<template>
  <Block>
    <div :class="$style.top">
      <Title>Удобства</Title>
    </div>
    <div>TODO: ждем дизайн</div>
    <HotelButton text="Все удобства" :click="() => {}" />
  </Block>
</template>

<style module lang="scss">
.top {
  padding: 24px 16px 4px;
}
</style>
