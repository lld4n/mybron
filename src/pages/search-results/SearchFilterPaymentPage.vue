<script setup lang="ts">
import FilterTemplate from "../../components/ui/wrappers/FilterTemplate.vue";
import CheckBox from "../../assets/icons/checkbox.svg";
import { PaymentFiltersValues, useStore } from "../../utils";
const store = useStore();
</script>

<template>
  <FilterTemplate title="Способ оплаты">
    <template v-slot:main>
      <div
        :class="$style.btn"
        @click="store.allFilters('payment', PaymentFiltersValues)"
      >
        <template v-if="store.filters.payment.length === PaymentFiltersValues.length"
          >Сбросить</template
        >
        <template v-else>Выбрать все</template>
      </div>
      <div :class="$style.bar" />
      <div :class="$style.item" @click="store.changeFilters('payment', 'hotel')">
        <div
          :class="[
            $style.check,
            { [$style.active]: store.filters.payment.includes('hotel') },
          ]"
        >
          <CheckBox v-if="store.filters.payment.includes('hotel')" />
        </div>
        <div :class="$style.value">Оплата в отеле</div>
      </div>
      <div :class="$style.item" @click="store.changeFilters('payment', 'agency')">
        <div
          :class="[
            $style.check,
            { [$style.active]: store.filters.payment.includes('agency') },
          ]"
        >
          <CheckBox v-if="store.filters.payment.includes('agency')" />
        </div>
        <div :class="$style.value">Оплата агенству</div>
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
