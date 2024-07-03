<script setup lang="ts">
import Check from "../../assets/icons/check.svg";
import { useStore } from "../../utils";
import FilterTemplate from "../../components/ui/wrappers/FilterTemplate.vue";
import { useInter } from "../../utils/i18n";
const store = useStore();
const q = useInter();
</script>

<template>
  <FilterTemplate :title="q.i18n.search.filter.sort.page.yalmsm">
    <template v-slot:main>
      <div :class="$style.item" @click="store.changeFiltersSort('default')">
        <div :class="$style.title">{{ q.i18n.search.filter.sort.page.wwwnqs }}</div>
        <Check v-if="store.filters.sort === 'default'" />
      </div>
      <div :class="$style.bar" />
      <div :class="$style.item" @click="store.changeFiltersSort('stars')">
        <div :class="$style.title">{{ q.i18n.search.filter.sort.page.tynstc }}</div>
        <Check v-if="store.filters.sort === 'stars'" />
      </div>
      <div :class="$style.bar" />
      <div :class="$style.item" @click="store.changeFiltersSort('cheap')">
        <div :class="$style.title">{{ q.i18n.search.filter.sort.page.awghfo }}</div>
        <Check v-if="store.filters.sort === 'cheap'" />
      </div>
      <div :class="$style.bar" />
      <div :class="$style.item" @click="store.changeFiltersSort('expensive')">
        <div :class="$style.title">{{ q.i18n.search.filter.sort.page.mixjqi }}</div>
        <Check v-if="store.filters.sort === 'expensive'" />
      </div>
      <div :class="$style.bar" />
      <div :class="$style.item" @click="store.changeFiltersSort('closeness')">
        <div :class="$style.title">{{ q.i18n.search.filter.sort.page.fnwwwk }}</div>
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
