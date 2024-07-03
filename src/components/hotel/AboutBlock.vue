<script setup lang="ts">
import Block from "../ui/wrappers/Block.vue";
import HotelButton from "./HotelButton.vue";
import Title from "../ui/wrappers/Title.vue";
import { useInter } from "../../utils/i18n";
interface Props {
  text: string;
}
const q = useInter();
defineProps<Props>();
</script>

<template>
  <Block>
    <div :class="$style.top">
      <Title> {{ q.i18n.about.block.zzitbi }}</Title>
    </div>
    <div :class="$style.text">
      {{ text }}
    </div>
    <HotelButton
      :text="q.i18n.about.block.fkjnvt"
      :click="() => $router.push('/hotel/about')"
    />
  </Block>
</template>

<style module lang="scss">
.top {
  padding: 24px 16px 8px;
}
.text {
  font-size: 17px;
  font-weight: 400;
  line-height: 22px;
  color: var(--tg-theme-text-color);
  padding: 0 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 100%;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
}
</style>
