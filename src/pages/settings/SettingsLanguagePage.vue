<script setup lang="ts">
import Text from "../../components/ui/wrappers/Text.vue";
import Title from "../../components/ui/wrappers/Title.vue";
import { languages, SlugType, useInter } from "../../utils/i18n";
import Block from "../../components/ui/wrappers/Block.vue";
import Check from "../../assets/icons/check.svg";
const q = useInter();
</script>

<template>
  <div :class="$style.wrapper">
    <Block>
      <div :class="$style.top">
        <Title>{{ q.i18n.settings.language }}</Title>
      </div>
      <div :class="$style.list">
        <div
          :class="$style.item"
          v-for="item in languages"
          @click="q.changeLanguage(item.slug as SlugType)"
        >
          <div :class="$style.right">
            <Text :s="17" :l="22">{{ item.name }}</Text>
            <Check v-if="q.i18n.slug === item.slug" />
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
</style>
