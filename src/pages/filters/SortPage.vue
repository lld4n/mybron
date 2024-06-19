<script setup lang="ts">
import Check from "../../assets/icons/check.svg";
import { useStore } from "../../utils";
import FilterTemplate from "../../components/FilterTemplate.vue";
const store = useStore();
</script>

<template>
  <FilterTemplate title="Сортировка">
    <template v-slot:main>
      <div :class="$style.item" @click="store.changeFiltersSort('default')">
        <div :class="$style.title">По оценке гостей</div>
        <Check v-if="store.filters.sort === 'default'" />
      </div>
      <div :class="$style.bar" />
      <div :class="$style.item" @click="store.changeFiltersSort('stars')">
        <div :class="$style.title">По звездности</div>
        <Check v-if="store.filters.sort === 'stars'" />
      </div>
      <div :class="$style.bar" />
      <div :class="$style.item" @click="store.changeFiltersSort('cheap')">
        <div :class="$style.title">Сначала дешевые</div>
        <Check v-if="store.filters.sort === 'cheap'" />
      </div>
      <div :class="$style.bar" />
      <div :class="$style.item" @click="store.changeFiltersSort('expensive')">
        <div :class="$style.title">Сначала дорогие</div>
        <Check v-if="store.filters.sort === 'expensive'" />
      </div>
      <div :class="$style.bar" />
      <div :class="$style.item" @click="store.changeFiltersSort('closeness')">
        <div :class="$style.title">По близости к центру</div>
        <Check v-if="store.filters.sort === 'closeness'" />
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
