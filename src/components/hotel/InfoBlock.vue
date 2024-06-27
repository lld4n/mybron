<script setup lang="ts">
import HotelButton from "./HotelButton.vue";
import DateView from "../ui/views/DateView.vue";
import Pencil from "../../assets/icons/pencil.svg";
import { dates, guests, useStore } from "../../utils";
const store = useStore();
interface Props {
  offersCount: number;
  minPrice: number;
}

defineProps<Props>();
</script>

<template>
  <div :class="$style.wrapper">
    <div :class="$style.top">
      <div :class="$style.left">
        <div :class="$style.title">
          <DateView :left="dates(store.in)" :right="dates(store.out!)" />
        </div>
        <div :class="$style.text">
          {{ guests(store.adultsCount, store.children) }}
        </div>
      </div>
      <button :class="$style.btn" @click="$router.push('/hotel/info')">
        <Pencil />
      </button>
    </div>
    <HotelButton
      :text="offersCount + ' вариантов от ' + minPrice + ' ₽'"
      :click="() => $router.push('')"
    />
  </div>
</template>

<style module lang="scss">
.wrapper {
  border-radius: 12px;
  background-color: var(--tg-theme-bg-color);
}
.top {
  padding: 24px 16px 0;
  display: flex;
  align-items: center;
  gap: 10px;
}
.left {
  flex: 1;
}
.title {
  font-size: 20px;
  line-height: 24px;
  font-weight: 700;
  color: var(--tg-theme-text-color);
}
.text {
  font-size: 14px;
  line-height: 18px;
  font-weight: 400;
  color: var(--tg-theme-hint-color);
}
.btn {
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
</style>
