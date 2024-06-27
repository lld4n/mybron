<script setup lang="ts">
import Block from "../ui/wrappers/Block.vue";
import Title from "../ui/wrappers/Title.vue";
interface Props {
  data: string[];
}

defineProps<Props>();
</script>

<template>
  <Block>
    <div :class="$style.top">
      <Title>Дополнительная информация</Title>
    </div>
    <div :class="$style.text">
      <span v-for="text of data">{{ text }}</span>
    </div>
  </Block>
</template>

<style module lang="scss">
.top {
  padding: 24px 16px 8px;
}
.text {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0 16px 16px;
  font-size: 17px;
  line-height: 22px;
  font-weight: 400;
  color: var(--tg-theme-text-color);
}
</style>
