<script setup lang="ts">
import Block from "../ui/wrappers/Block.vue";
import Title from "../ui/wrappers/Title.vue";
import { useInter } from "../../utils/i18n";
import Text from "../ui/wrappers/Text.vue";
const q = useInter();
interface Props {
  currency?: string;
  vat: number;
  total: number;
  name: string;
}

defineProps<Props>();
</script>

<template>
  <Block>
    <div :class="$style.top">
      <Title>{{ q.i18n.hotel.total.title }}</Title>
    </div>
    <div :class="$style.list">
      <div :class="$style.item">
        <Text :s="17" :l="22" :c="$style.overflow">{{ name }}</Text>
        <!--TODO: валюта-->
        <Text :s="17" :l="22">{{ total - vat }} ₽</Text>
      </div>
      <div :class="$style.item">
        <Text :s="17" :l="22">{{ q.i18n.hotel.total.tax }}</Text>
        <!--TODO: валюта-->
        <Text :s="17" :l="22">{{ vat }} ₽</Text>
      </div>
      <div :class="$style.item">
        <Text :s="17" :l="22">{{ q.i18n.hotel.total.total }}</Text>
        <!--TODO: валюта-->
        <Text :s="28" :l="34" :w="700">{{ total }} ₽</Text>
      </div>
    </div>
  </Block>
</template>

<style module lang="scss">
.top {
  padding: 24px 16px 4px;
}
.list {
  padding-left: 16px;
}
.item {
  padding: 11px 16px 11px 0;
  display: flex;
  gap: 16px;
  overflow: hidden;
  align-items: center;
  border-bottom: 1px solid var(--tg-theme-secondary-bg-color);
  justify-content: space-between;
  white-space: nowrap;
}
.overflow {
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
