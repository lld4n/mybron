<script setup lang="ts">
import HotelButton from "./HotelButton.vue";
import DateView from "../ui/views/DateView.vue";
import Pencil from "../../assets/icons/pencil.svg";
import { dates, guests, useStore } from "../../utils";
import { useRoute } from "vue-router";
import { useInter } from "../../utils/i18n";
const store = useStore();
interface Props {
  offersCount: number;
  minPrice: number;
}
const route = useRoute();

defineProps<Props>();
const q = useInter();
</script>

<template>
  <div :class="$style.wrapper">
    <div :class="$style.top">
      <div :class="$style.left">
        <div :class="$style.title">
          <DateView
            :left="dates(store.in, q.i18n)"
            :right="dates(store.out!, q.i18n)"
          />
        </div>
        <div :class="$style.text">
          {{ guests(store.adultsCount, store.children, q.i18n) }}
        </div>
      </div>
      <button :class="$style.btn" @click="$router.push('/hotel/info')">
        <Pencil />
      </button>
    </div>
    <!--    TODO: валюта-->
    <HotelButton
      :text="offersCount + ' ' + q.i18n.info.block.quazcu + minPrice + ' ₽'"
      :click="() => $router.push('/rooms/' + route.params.id)"
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
