<script setup lang="ts">
import FilterTemplate from "../../components/ui/wrappers/FilterTemplate.vue";
import Slider from "primevue/slider";
import { onMounted, ref, watch } from "vue";
import { useHotel, useStore } from "../../utils";
import { useRoute } from "vue-router";
import { useInter } from "../../utils/i18n";
import Wrapper from "../../components/ui/wrappers/Wrapper.vue";
const route = useRoute();
const numbers = ref([0, 50000]);
//TODO: валюта
const inputs = ref(["0 ₽", "50 000 ₽"]);
const store = useStore();
const hotel = useHotel();
const q = useInter();
const room = route.fullPath.includes("rooms");
onMounted(() => {
  window.Telegram.WebApp.headerColor =
    window.Telegram.WebApp.themeParams.secondary_bg_color || "";
  window.Telegram.WebApp.MainButton.onClick(() => {}).hide();
  if (room) {
    numbers.value[0] = hotel.filters.price[0];
    numbers.value[1] = hotel.filters.price[1];
    inputs.value[0] = toRender(hotel.filters.price[0]);
    inputs.value[1] = toRender(hotel.filters.price[1]);
  } else {
    numbers.value[0] = store.filters.price[0];
    numbers.value[1] = store.filters.price[1];
    inputs.value[0] = toRender(store.filters.price[0]);
    inputs.value[1] = toRender(store.filters.price[1]);
  }
});

const toRender = (v: number) => {
  if (v > 50000) v = 50000;
  if (v < 0) v = 0;
  let ans = "";
  let i = 0;
  const s = String(v);
  for (let j = s.length - 1; j >= 0; j--) {
    i++;
    ans += s[j];
    if (i === 3) {
      i = 0;
      ans += " ";
    }
  }
  ans = ans.split("").reverse().join("");
  //TODO: валюта
  ans += " ₽";
  return ans.trim();
};
watch(numbers, (list) => {
  inputs.value[0] = toRender(list[0]);
  inputs.value[1] = toRender(list[1]);
  if (room) {
    hotel.changeFiltersPrice(numbers.value as [number, number]);
  } else {
    store.changeFiltersPrice(numbers.value as [number, number]);
  }
});
watch(
  () => inputs.value[0],
  (value, oldValue) => {
    //TODO: валюта
    if (!oldValue.includes("₽")) {
      const s = value.replace(/\D/g, "").slice(0, -1);
      const v = Number(s) || 0;
      inputs.value[0] = toRender(v);
      numbers.value[0] = v;
    } else {
      const v = Number(value.replace(/\D/g, ""));
      inputs.value[0] = toRender(v);
      numbers.value[0] = v;
    }
    if (room) {
      hotel.changeFiltersPrice(numbers.value as [number, number]);
    } else {
      store.changeFiltersPrice(numbers.value as [number, number]);
    }
  },
);
watch(
  () => inputs.value[1],
  (value, oldValue) => {
    //TODO: валюта
    if (!oldValue.includes("₽")) {
      const s = value.replace(/\D/g, "").slice(0, -1);
      const v = Number(s) || 0;
      inputs.value[1] = toRender(v);
      numbers.value[1] = v;
    } else {
      const v = Number(value.replace(/\D/g, ""));
      inputs.value[1] = toRender(v);
      numbers.value[1] = v;
    }
    if (room) {
      hotel.changeFiltersPrice(numbers.value as [number, number]);
    } else {
      store.changeFiltersPrice(numbers.value as [number, number]);
    }
  },
);

const focus = () => {
  inputs.value[1] = "";
  numbers.value[1] = 0;
};
</script>

<template>
  <Wrapper>
    <FilterTemplate :title="q.i18n.filter.price.page.appvei">
      <template v-slot:main>
        <div :class="$style.header">
          <div :class="$style.block">
            <div :class="$style.title">{{ q.i18n.filter.price.page.baffkd }}</div>
            <input
              type="text"
              :class="$style.input"
              v-model="inputs[0]"
              inputmode="numeric"
            />
          </div>
          <div :class="$style.block">
            <div :class="$style.title">{{ q.i18n.filter.price.page.wyzrfe }}</div>
            <input
              type="text"
              :class="$style.input"
              v-model="inputs[1]"
              inputmode="numeric"
              @focus="focus"
            />
          </div>
        </div>
        <div :class="$style.wrapper">
          <div :class="$style.line" />
          <Slider v-model="numbers" range :min="0" :max="50000" />
        </div>
      </template>
    </FilterTemplate>
  </Wrapper>
</template>

<style module lang="scss">
.header {
  display: flex;
  gap: 12px;
  padding: 16px 16px 16px 0;
  width: 100%;
}

.input {
  background-color: var(--tg-theme-bg-color);
  font-size: 17px;
  line-height: 22px;
  font-weight: 400;
  width: 100%;
  color: var(--tg-theme-text-color);
}
.block {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--tg-theme-hint-color);
}
.title {
  font-size: 13px;
  line-height: 18px;
  font-weight: 400;
  color: var(--tg-theme-hint-color);
}
.line {
  position: absolute;
  top: 50%;
  height: 4px;
  background-color: var(--tg-theme-secondary-bg-color);
  transform: translateY(-50%);
  width: calc(100% + 28px);
  z-index: 1;
  left: -14px;
}
.wrapper {
  margin: 24px 30px 28px 16px;
  position: relative;
  --p-slider-transition-duration: 0;
  --p-slider-track-background: var(--tg-theme-secondary-bg-color);
  --p-slider-track-border-radius: 0;
  --p-slider-track-size: 4px;
  --p-slider-range-background: var(--tg-theme-button-color);
  --p-slider-handle-width: 28px;
  --p-slider-handle-height: 28px;
  --p-slider-handle-border-radius: 50%;
  --p-slider-handle-background: #fff;
  --p-slider-handle-hover-background: #fff;
  --p-slider-handle-content-border-radius: 50%;
  --p-slider-handle-content-hover-background: #fff;
  --p-slider-handle-content-width: 28px;
  --p-slider-handle-content-height: 28px;
  --p-slider-handle-content-shadow: 0px 6px 13px 0px rgba(0, 0, 0, 0.12),
    0px 0.5px 4px 0px rgba(0, 0, 0, 0.12);
  --p-slider-handle-focus-ring-width: 0;
  --p-slider-handle-focus-ring-style: transparent;
  --p-slider-handle-focus-ring-color: transparent;
  --p-slider-handle-focus-ring-offset: none;
  --p-slider-handle-focus-ring-shadow: none;
  --p-slider-handle-content-background: #fff;
  span {
    z-index: 100;
  }
}
</style>
