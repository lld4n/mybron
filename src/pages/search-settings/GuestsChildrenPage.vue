<script setup lang="ts">
import Block from "../../components/ui/wrappers/Block.vue";
import Title from "../../components/ui/wrappers/Title.vue";
import { ages, useStore } from "../../utils";

const store = useStore();
</script>

<template>
  <div :class="$style.wrapper">
    <Block>
      <div :class="$style.top">
        <Title>Выберите возраст ребёнка</Title>
      </div>
      <template v-for="(age, index) of ages">
        <div
          :class="$style.item"
          @click="
            store.addChildren(index);
            $router.go(-1);
          "
        >
          {{ age }}
        </div>
        <div :class="$style.bar" v-if="index < ages.length - 1" />
      </template>
    </Block>
  </div>
</template>

<style module lang="scss">
.wrapper {
  padding: 12px 16px;
}
.top {
  padding: 16px 16px 4px;
}
.bar {
  margin-left: 16px;
  width: 100%;
  height: 1px;
  background-color: var(--tg-theme-secondary-bg-color);
}
.item {
  padding: 11px 0 11px 16px;
  font-size: 17px;
  line-height: 22px;
  font-weight: 400;
  letter-spacing: -0.43px;
  cursor: pointer;
}
</style>
