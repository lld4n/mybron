<script setup lang="ts">
import { guests, useStore } from "../../utils";
import Globe from "../../assets/icons/globe.svg";
import Calendar from "../../assets/icons/calendar.svg";
import Group from "../../assets/icons/group.svg";
import DateView from "../ui/DateView.vue";
const store = useStore();

const toRenderDate = (d: Date) => {
  if (!d) return "";
  const day = d.getDate();
  const month = d.getMonth();
  const months = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ];
  const weekDays = ["вс", "пн", "вт", "ср", "чт", "пт", "сб"];
  const week = d.getDay();

  return `${day} ${months[month]}, ${weekDays[week]}`;
};
interface Props {
  search?: boolean;
}
defineProps<Props>();
</script>

<template>
  <div :class="$style.item" @click="$router.push('/search')" v-if="!!search">
    <div :class="$style.left">
      <Globe />
      <div>Где</div>
    </div>
    <div :class="$style.right">Город или отель</div>
  </div>
  <div :class="$style.item" @click="$router.push('/dates')">
    <div :class="$style.left">
      <Calendar />
      <div>Когда</div>
    </div>
    <div
      :class="[
        $style.right,
        {
          [$style.active]: !!store.in && !!store.out,
        },
      ]"
    >
      <span v-if="!store.out">Выберите дату</span>
      <DateView
        v-if="!!store.in && !!store.out"
        :left="toRenderDate(store.in)"
        :right="toRenderDate(store.out)"
      />
    </div>
  </div>
  <div :class="$style.item" @click="$router.push('/guests')">
    <div :class="$style.left">
      <Group />
      <div>Гости</div>
    </div>
    <div :class="[$style.right, $style.active]">
      {{ guests(store.adultsCount, store.children) }}
    </div>
  </div>
</template>

<style module lang="scss">
.item {
  display: flex;
  gap: 12px;
  padding: 12px;
  align-items: center;
  background-color: var(--tg-theme-bg-color);
  border-radius: 12px;
  cursor: pointer;
  font-size: 17px;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: -0.43px;
}
.left {
  display: flex;
  gap: 8px;
  align-items: center;
}
.right {
  flex: 1;
  text-align: end;
  span {
    color: var(--tg-theme-hint-color);
  }
  path {
    fill: var(--tg-theme-hint-color);
  }
  color: var(--tg-theme-hint-color);
}
.active {
  span {
    color: var(--tg-theme-text-color);
  }
  path {
    fill: var(--tg-theme-text-color);
  }
  color: var(--tg-theme-text-color);
}
</style>
