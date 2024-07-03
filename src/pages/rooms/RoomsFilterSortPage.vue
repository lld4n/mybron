<script setup lang="ts">
import Check from "../../assets/icons/check.svg";
import { useHotel } from "../../utils";
import FilterTemplate from "../../components/ui/wrappers/FilterTemplate.vue";
import { useInter } from "../../utils/i18n";
const hotel = useHotel();
const q = useInter();
</script>

<template>
  <FilterTemplate :title="q.i18n.rooms.filter.sort.page.oyswlx">
    <template v-slot:main>
      <div :class="$style.item" @click="hotel.changeFiltersSort('cheap')">
        <div :class="$style.title">{{ q.i18n.rooms.filter.sort.page.supjmu }}</div>
        <Check v-if="hotel.filters.sort === 'cheap'" />
      </div>
      <div :class="$style.bar" />
      <div :class="$style.item" @click="hotel.changeFiltersSort('expensive')">
        <div :class="$style.title">{{ q.i18n.rooms.filter.sort.page.qavtmp }}</div>
        <Check v-if="hotel.filters.sort === 'expensive'" />
      </div>
    </template>
  </FilterTemplate>
</template>

<style module lang="scss">
.item {
  padding: 11px 16px 11px 0;
  display: flex;
  justify-content: space-between;
  gap: 16px;
  cursor: pointer;
  align-items: center;
  path {
    stroke: var(--tg-theme-button-color);
  }
}
.title {
  font-size: 17px;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: -0.43px;
}
.bar {
  width: 100%;
  height: 1px;
  background-color: var(--tg-theme-secondary-bg-color);
}
</style>
