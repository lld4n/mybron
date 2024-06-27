<script setup lang="ts">
import Block from "../ui/wrappers/Block.vue";
import Title from "../ui/wrappers/Title.vue";
import Clock from "../../assets/conditions/clock.svg";
import Shape from "../../assets/conditions/shape.svg";
import Umbrella from "../../assets/conditions/umbrella.svg";
import Text from "../ui/wrappers/Text.vue";
import { TaxDto } from "../../utils";
interface Props {
  deposit: TaxDto | null;
  fee: TaxDto | null;
  inTime: string;
  outTime: string;
}

defineProps<Props>();
</script>

<template>
  <Block>
    <div :class="$style.top">
      <Title>Условия пребывания</Title>
    </div>
    <div :class="$style.content">
      <div :class="$style.item">
        <Clock />
        <div :class="$style.right">
          <Text :s="17" :l="22" :w="600">Заезд и выезд</Text>
          <div :class="$style.line">
            <Text :s="17" :l="22" :g="true" :c="$style.fix">Заезд</Text>
            <Text :s="17" :l="22">{{ inTime }}</Text>
          </div>
          <div :class="$style.line">
            <Text :s="17" :l="22" :g="true" :c="$style.fix">Выезд</Text>
            <Text :s="17" :l="22">{{ outTime }}</Text>
          </div>
        </div>
      </div>
      <div :class="$style.item" v-if="!!deposit">
        <Shape />
        <div :class="$style.right">
          <Text :s="17" :l="22" :w="600">Депозит</Text>
          <Text :s="17" :l="22">{{ deposit.amount }} ₽ на весь период нахождения</Text>
        </div>
      </div>
      <div :class="$style.item" v-if="!!fee">
        <Umbrella />
        <div :class="$style.right">
          <Text :s="17" :l="22" :w="600">Курортный сбор</Text>
          <Text :s="17" :l="22">{{ fee.amount }} ₽ c гостя в сутки</Text>
        </div>
      </div>
    </div>
  </Block>
</template>

<style module lang="scss">
.top {
  padding: 24px 16px 20px;
}
.item {
  padding: 12px 0 0 16px;
  display: flex;
  gap: 10px;
  path {
    fill: var(--tg-theme-hint-color);
  }
  &:last-child {
    .right {
      border-bottom: none;
    }
  }
}
.right {
  padding: 0 16px 12px 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-bottom: 1px solid var(--tg-theme-secondary-bg-color);
}
.line {
  display: flex;
  gap: 20px;
}
.fix {
  width: 52px;
}
</style>
