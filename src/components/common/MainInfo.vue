<script setup lang="ts">
import { dates, guests, useStore } from "../../utils";
import Globe from "../../assets/icons/globe.svg";
import Calendar from "../../assets/icons/calendar.svg";
import Group from "../../assets/icons/group.svg";
import DateView from "../ui/views/DateView.vue";
import { useInter } from "../../utils/i18n";
const store = useStore();
const q = useInter();
interface Props {
  search?: boolean;
}
defineProps<Props>();
</script>

<template>
  <div :class="$style.item" @click="$router.push('/search')" v-if="!!search">
    <div :class="$style.left">
      <Globe />
      <div>{{ q.i18n.main.info.xszroj }}</div>
    </div>
    <div
      :class="[
        $style.right,
        {
          [$style.active]: !!store.search,
        },
      ]"
    >
      <template v-if="!store.search">{{ q.i18n.main.info.omdvlr }}</template>
      <template v-if="!!store.search">{{ store.search.name }}</template>
    </div>
  </div>
  <div :class="$style.item" @click="$router.push('/dates')">
    <div :class="$style.left">
      <Calendar />
      <div>{{ q.i18n.main.info.tfxstb }}</div>
    </div>
    <div
      :class="[
        $style.right,
        {
          [$style.active]: !!store.in && !!store.out,
        },
      ]"
    >
      <span v-if="!store.out">{{ q.i18n.main.info.blomgf }}</span>
      <DateView
        v-if="!!store.in && !!store.out"
        :left="dates(store.in, q.i18n, { week: true })"
        :right="dates(store.out, q.i18n, { week: true })"
      />
    </div>
  </div>
  <div :class="$style.item" @click="$router.push('/guests')">
    <div :class="$style.left">
      <Group />
      <div>{{ q.i18n.main.info.jebbqr }}</div>
    </div>
    <div :class="[$style.right, $style.active]">
      {{ guests(store.adultsCount, store.children, q.i18n) }}
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
  transition: opacity 0.1s ease-out;
  &:not([disabled]):active {
    opacity: 0.6 !important;
  }
  @media (hover: hover) {
    &:not([disabled]):hover {
      opacity: 0.85;
    }
  }
}
.left {
  display: flex;
  gap: 8px;
  align-items: center;
}
.right {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
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
