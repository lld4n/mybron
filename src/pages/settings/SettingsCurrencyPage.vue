<script setup lang="ts">
import Text from "../../components/ui/wrappers/Text.vue";
import Title from "../../components/ui/wrappers/Title.vue";
import { currencies, useInter } from "../../utils/i18n";
import Block from "../../components/ui/wrappers/Block.vue";
import Check from "../../assets/icons/check.svg";
const q = useInter();
</script>

<template>
  <div :class="$style.wrapper">
    <Block>
      <div :class="$style.top">
        <Title>{{ q.i18n.settings.currency }}</Title>
      </div>
      <div :class="$style.list">
        <div
          :class="$style.item"
          v-for="item of currencies"
          @click="q.changeCurrency(item)"
        >
          <Text :s="17" :l="22" :c="$style.text">{{ item }}</Text>
          <div :class="$style.right">
            <Text :s="17" :l="22">{{ q.i18n.currency[item] }}</Text>
            <Check v-if="q.currency === item" />
          </div>
        </div>
      </div>
    </Block>
  </div>
</template>

<style module lang="scss">
.wrapper {
  padding: 12px 16px;
}
.top {
  padding: 24px 16px 4px;
}
.list {
  display: flex;
  flex-direction: column;
  padding-left: 16px;
}
.item {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  &:last-child {
    .right {
      border-bottom: none;
    }
  }
}
.right {
  flex: 1;
  display: flex;
  justify-content: space-between;
  gap: 4px;
  align-items: center;
  padding: 11px 16px 11px 0;
  border-bottom: 1px solid var(--tg-theme-secondary-bg-color);
}
.text {
  text-transform: uppercase;
  color: var(--tg-theme-hint-color);
}
</style>
