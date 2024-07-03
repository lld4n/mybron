<script setup lang="ts">
import Block from "../ui/wrappers/Block.vue";
import RatingView from "../ui/views/RatingView.vue";
import Title from "../ui/wrappers/Title.vue";
import { useInter } from "../../utils/i18n";
const q = useInter()
const backgrounds: { [percent: number]: string } = {
  10: "#FF3B30",
  20: "#FD5F28",
  30: "#FE8B20",
  40: "#FE8B20",
  50: "#FEBA19",
  60: "#FEBA19",
  70: "#8CC928",
  80: "#8CC928",
  90: "#34C759",
  100: "#34C759",
};

const titles = [
  q.i18n.rating.block.ywhbqt,
  q.i18n.rating.block.bceyma,
  q.i18n.rating.block.rlamyx,
  q.i18n.rating.block.nvcefp,
  q.i18n.rating.block.fccxkt,
  q.i18n.rating.block.ktolhh,
  q.i18n.rating.block.hgglao,
  q.i18n.rating.block.ikmiwg,
  q.i18n.rating.block.bdibqe,
  q.i18n.rating.block.phnyej,
  q.i18n.rating.block.ayhzlk,
];
interface Props {
  ratings: { name: string; percent: number }[];
  count: number;
  rating: number;
}

defineProps<Props>();
</script>

<template>
  <Block>
    <div :class="$style.header">
      <Title>{{ q.i18n.rating.block.hhsqkl }}</Title>
    </div>
    <div :class="$style.rating">
      <RatingView :level="rating" type="big" />
      <div :class="$style.right">
        <div :class="$style.title">{{ titles[rating] || q.i18n.rating.block.ubbrda }}</div>
        <div :class="$style.subtitle">{{ count }} {{ q.i18n.rating.block.jbgljg }}Tripadvisor</div>
      </div>
    </div>
    <div :class="$style.percents">
      <div :class="$style.item" v-for="item of ratings">
        <div :class="$style.top">
          <div :class="$style.text">{{ item.name }}</div>
          <div :class="$style.text">{{ item.percent }}%</div>
        </div>
        <div :class="$style.line">
          <div :class="$style.active" :style="{
            backgroundColor: backgrounds[item.percent],
            width: item.percent + '%',
          }" />
        </div>
      </div>
    </div>
  </Block>
</template>

<style module lang="scss">
.header {
  padding: 24px 16px 20px;
}

.rating {
  display: flex;
  gap: 10px;
  padding: 0 16px;
}

.right {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.title {
  font-size: 17px;
  line-height: 22px;
  font-weight: 500;
  color: var(--tg-theme-text-color);
}

.subtitle {
  color: var(--tg-theme-hint-color);
  font-size: 14px;
  font-weight: 400;
  line-height: 18px;
}

.percents {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  padding: 24px 16px 20px;
}

.item {
  flex: 1;
  min-width: 150px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.top {
  display: flex;
  gap: 5px;
  justify-content: space-between;
  width: 100%;
  align-items: center;
}

.text {
  font-size: 12px;
  line-height: 16px;
  font-weight: 400;
  color: var(--tg-theme-text-color);
}

.line {
  border-radius: 2px;
  width: 100%;
  height: 3px;
  background-color: var(--tg-theme-secondary-bg-color);
  position: relative;
}

.active {
  position: absolute;
  border-radius: 2px;
  top: 0;
  bottom: 0;
  height: 3px;
  left: 0;
  background-color: #34c759;
}
</style>
