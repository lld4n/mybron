<script setup lang="ts">
import FilterTemplate from "../../components/ui/wrappers/FilterTemplate.vue";
import CheckBox from "../../assets/icons/checkbox.svg";
import { StarsFiltersValues, useStore } from "../../utils";
import StarsView from "../../components/ui/views/StarsView.vue";
const store = useStore();
</script>

<template>
  <FilterTemplate title="Способ оплаты">
    <template v-slot:main>
      <div :class="$style.btn" @click="store.allFilters('stars', StarsFiltersValues)">
        <template v-if="store.filters.stars.length === StarsFiltersValues.length"
          >Сбросить</template
        >
        <template v-else>Выбрать все</template>
      </div>
      <div :class="$style.bar" />
      <div :class="$style.item" @click="store.changeFilters('stars', 1)">
        <div
          :class="[$style.check, { [$style.active]: store.filters.stars.includes(1) }]"
        >
          <CheckBox v-if="store.filters.stars.includes(1)" />
        </div>
        <div :class="$style.value">
          <StarsView :level="1" type="big" />
        </div>
      </div>
      <div :class="$style.item" @click="store.changeFilters('stars', 2)">
        <div
          :class="[$style.check, { [$style.active]: store.filters.stars.includes(2) }]"
        >
          <CheckBox v-if="store.filters.stars.includes(2)" />
        </div>
        <div :class="$style.value"><StarsView :level="2" type="big" /></div>
      </div>
      <div :class="$style.item" @click="store.changeFilters('stars', 3)">
        <div
          :class="[$style.check, { [$style.active]: store.filters.stars.includes(3) }]"
        >
          <CheckBox v-if="store.filters.stars.includes(3)" />
        </div>
        <div :class="$style.value"><StarsView :level="3" type="big" /></div>
      </div>
      <div :class="$style.item" @click="store.changeFilters('stars', 4)">
        <div
          :class="[$style.check, { [$style.active]: store.filters.stars.includes(4) }]"
        >
          <CheckBox v-if="store.filters.stars.includes(4)" />
        </div>
        <div :class="$style.value"><StarsView :level="4" type="big" /></div>
      </div>
      <div :class="$style.item" @click="store.changeFilters('stars', 5)">
        <div
          :class="[$style.check, { [$style.active]: store.filters.stars.includes(5) }]"
        >
          <CheckBox v-if="store.filters.stars.includes(5)" />
        </div>
        <div :class="$style.value"><StarsView :level="5" type="big" /></div>
      </div>
    </template>
  </FilterTemplate>
</template>

<style module lang="scss">
.btn {
  padding: 12px 16px 12px 0;
  font-size: 17px;
  line-height: 22px;
  font-weight: 400;
  letter-spacing: -0.43px;
  color: var(--tg-theme-link-color);
  cursor: pointer;
}
.bar {
  width: 100%;
  height: 1px;
  background-color: var(--tg-theme-secondary-bg-color);
}
.item {
  display: flex;
  gap: 11px;
  cursor: pointer;
  align-items: center;
  &:last-of-type .value {
    border-bottom: none;
  }
}
.check {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: 1px solid var(--tg-theme-hint-color);
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 0 0 22px;
}
.active {
  border: 1px solid var(--tg-theme-button-color);
  background-color: var(--tg-theme-button-color);
}
.value {
  padding: 11px 0;
  font-size: 17px;
  line-height: 22px;
  letter-spacing: -0.43px;
  font-weight: 400;
  color: var(--tg-theme-text-color);
  flex: 1;
  border-bottom: 1px solid var(--tg-theme-secondary-bg-color);
}
</style>
