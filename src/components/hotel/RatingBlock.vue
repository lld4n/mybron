<script setup lang="ts">
import Block from "../Block.vue";
import RatingView from "../RatingView.vue";
const ratings = [
  {
    name: "Питание",
    percent: 100,
  },
  {
    name: "Расположение",
    percent: 90,
  },
  {
    name: "Удобство парковки",
    percent: 80,
  },
  {
    name: "Обслуживание",
    percent: 70,
  },
  {
    name: "Чистота номеров",
    percent: 60,
  },
  {
    name: "Завтрак",
    percent: 50,
  },
];
</script>

<template>
  <Block title="Оценка гостей">
    <div :class="$style.rating">
      <RatingView :level="10" type="big" />
      <div :class="$style.right">
        <div :class="$style.title">Превосходно</div>
        <div :class="$style.subtitle">5252 отзывов на Tripadvisor</div>
      </div>
    </div>
    <div :class="$style.percents">
      <div :class="$style.item" v-for="item of ratings">
        <div :class="$style.top">
          <div :class="$style.text">{{ item.name }}</div>
          <div :class="$style.text">{{ item.percent }}%</div>
        </div>
        <div :class="$style.line">
          <div
            :class="$style.active"
            :style="{
              width: item.percent + '%',
            }"
          />
        </div>
      </div>
    </div>
  </Block>
</template>

<style module lang="scss">
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
  padding: 24px 16px 0;
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
