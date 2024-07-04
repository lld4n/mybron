<script setup lang="ts">
import Block from "../ui/wrappers/Block.vue";
import Title from "../ui/wrappers/Title.vue";
import Clock from "../../assets/conditions/clock.svg";
import Shape from "../../assets/conditions/shape.svg";
import Umbrella from "../../assets/conditions/umbrella.svg";
import Text from "../ui/wrappers/Text.vue";
import { TaxDto } from "../../utils";
import { useInter } from "../../utils/i18n";
interface Props {
  deposit: TaxDto | null;
  fee: TaxDto | null;
  inTime: string;
  outTime: string;
}

defineProps<Props>();
const q = useInter();
</script>

<template>
  <Block>
    <div :class="$style.top">
      <Title>{{ q.i18n.conditions.block.ymbbbt }}</Title>
    </div>
    <div :class="$style.content">
      <div :class="$style.item">
        <Clock />
        <div :class="$style.right">
          <Text :s="17" :l="22" :w="600">{{ q.i18n.conditions.block.hubjac }}</Text>
          <div :class="$style.line">
            <Text :s="17" :l="22" :g="true" :c="$style.fix">{{
              q.i18n.conditions.block.vjmyje
            }}</Text>
            <Text :s="17" :l="22">{{ inTime }}</Text>
          </div>
          <div :class="$style.line">
            <Text :s="17" :l="22" :g="true" :c="$style.fix">{{
              q.i18n.conditions.block.gyebhz
            }}</Text>
            <Text :s="17" :l="22">{{ outTime }}</Text>
          </div>
        </div>
      </div>
      <div :class="$style.item" v-if="!!deposit">
        <Shape />
        <div :class="$style.right">
          <Text :s="17" :l="22" :w="600">{{ q.i18n.conditions.block.xfqgkq }}</Text>
          <Text :s="17" :l="22"
            >{{ deposit.amount }} ₽ {{ q.i18n.conditions.block.vvuhrj }}</Text
          >
        </div>
      </div>
      <div :class="$style.item" v-if="!!fee">
        <Umbrella />
        <div :class="$style.right">
          <Text :s="17" :l="22" :w="600">{{ q.i18n.conditions.block.rzocgb }}</Text>
          <Text :s="17" :l="22"
            >{{ fee.amount }} ₽ {{ q.i18n.conditions.block.kioiwm }}</Text
          >
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
  width: 80px;
}
</style>
