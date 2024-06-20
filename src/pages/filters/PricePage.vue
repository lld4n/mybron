<script setup lang="ts">
import FilterTemplate from "../../components/FilterTemplate.vue";
import Slider from "primevue/slider";
import { onMounted, ref, watch } from "vue";
import { useStore } from "../../utils";

const numbers = ref([0, 50000]);
const inputs = ref(["0 ₽", "50 000 ₽"]);
const store = useStore();

onMounted(() => {
  numbers.value[0] = store.filters.price[0];
  numbers.value[1] = store.filters.price[1];
  inputs.value[0] = toRender(store.filters.price[0]);
  inputs.value[1] = toRender(store.filters.price[1]);
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
  ans += " ₽";
  return ans.trim();
};
watch(numbers, (list) => {
  inputs.value[0] = toRender(list[0]);
  inputs.value[1] = toRender(list[1]);
  store.changeFiltersPrice(numbers.value as [number, number]);
});
watch(
  () => inputs.value[0],
  (value, oldValue) => {
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
    store.changeFiltersPrice(numbers.value as [number, number]);
  },
);
watch(
  () => inputs.value[1],
  (value, oldValue) => {
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
    store.changeFiltersPrice(numbers.value as [number, number]);
  },
);
</script>

<template>
  <FilterTemplate title="Цена">
    <template v-slot:header> пропуск </template>
    <template v-slot:main>
      <div :class="$style.header">
        <div :class="$style.block">
          <div :class="$style.title">От</div>
          <input type="text" :class="$style.input" v-model="inputs[0]" pattern="\d*" />
        </div>
        <div :class="$style.block">
          <div :class="$style.title">До</div>
          <input type="text" :class="$style.input" v-model="inputs[1]" pattern="\d*" />
        </div>
      </div>
      <div :class="$style.wrapper">
        <div :class="$style.line" />
        <Slider v-model="numbers" range :min="0" :max="50000" />
      </div>
    </template>
  </FilterTemplate>
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
  --p-slider-handle-background: var(--tg-theme-bg-color);
  --p-slider-handle-hover-background: var(--tg-theme-bg-color);
  --p-slider-handle-content-border-radius: 50%;
  --p-slider-handle-content-hover-background: var(--tg-theme-bg-color);
  --p-slider-handle-content-width: 28px;
  --p-slider-handle-content-height: 28px;
  --p-slider-handle-content-shadow: 0px 6px 13px 0px rgba(0, 0, 0, 0.12),
    0px 0.5px 4px 0px rgba(0, 0, 0, 0.12);
  --p-slider-handle-focus-ring-width: 0;
  --p-slider-handle-focus-ring-style: transparent;
  --p-slider-handle-focus-ring-color: transparent;
  --p-slider-handle-focus-ring-offset: none;
  --p-slider-handle-focus-ring-shadow: none;
  --p-slider-handle-content-background: var(--tg-theme-bg-color);
  span {
    z-index: 100;
  }
}
</style>
