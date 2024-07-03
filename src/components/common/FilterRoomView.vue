<script setup lang="ts">
import { MealsFiltersValues, PaymentFiltersValues, useHotel } from "../../utils";
import Carousel from "../ui/carousel/Carousel.vue";
import Sort from "../../assets/icons/sort.svg";
import UpDown from "../../assets/icons/up-down.svg";
import { useInter } from "../../utils/i18n";
const hotel = useHotel();
const q = useInter();
const toRenderPrice = (v: number) => {
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
</script>

<template>
  <Carousel>
    <div
      :class="[$style.sort, { [$style.sorted]: hotel.filters.sort !== 'cheap' }]"
      @click="$router.push('/rooms/filter/sort')"
    >
      <Sort />
    </div>
    <div :class="$style.filter" @click="$router.push('/rooms/filter/price')">
      <div :class="$style.left">
        <div :class="$style.subtitle">{{ q.i18n.filter.room.view.price }}</div>
        <div :class="$style.title">
          <template
            v-if="hotel.filters.price[0] === 0 && hotel.filters.price[1] === 50000"
            >{{ q.i18n.filter.room.view.any }}</template
          >
          <template
            v-if="hotel.filters.price[0] === 0 && hotel.filters.price[1] !== 50000"
            >{{
              q.i18n.filter.room.view.to + " " + toRenderPrice(hotel.filters.price[1])
            }}</template
          >
          <template
            v-if="hotel.filters.price[0] !== 0 && hotel.filters.price[1] === 50000"
            >{{
              q.i18n.filter.room.view.from + " " + toRenderPrice(hotel.filters.price[0])
            }}</template
          >
          <template
            v-if="hotel.filters.price[0] !== 0 && hotel.filters.price[1] !== 50000"
            >{{
              toRenderPrice(hotel.filters.price[0]) +
              " — " +
              toRenderPrice(hotel.filters.price[1])
            }}</template
          >
        </div>
      </div>
      <UpDown />
    </div>
    <div :class="$style.filter" @click="$router.push('/rooms/filter/meals')">
      <div :class="$style.left">
        <div :class="$style.subtitle">{{ q.i18n.filter.room.view.meals.title }}</div>
        <div :class="$style.title">
          <template v-if="hotel.filters.meals.length === 0">{{
            q.i18n.filter.room.view.any2
          }}</template>
          <template
            v-else-if="hotel.filters.meals.length === MealsFiltersValues.length"
            >{{ q.i18n.filter.room.view.any2 }}</template
          >
          <template v-else-if="hotel.filters.meals.length === 1">
            <template v-if="hotel.filters.meals[0] === 'included'">{{
              q.i18n.filter.room.view.meals.included
            }}</template>
            <template v-if="hotel.filters.meals[0] === 'not included'">{{
              q.i18n.filter.room.view.meals.notIncluded
            }}</template>
          </template>
        </div>
      </div>
      <UpDown />
    </div>
    <div :class="$style.filter" @click="$router.push('/rooms/filter/payment')">
      <div :class="$style.left">
        <div :class="$style.subtitle">{{ q.i18n.filter.room.view.payment.title }}</div>
        <div :class="$style.title">
          <template v-if="hotel.filters.payment.length === 0">{{
            q.i18n.filter.room.view.any
          }}</template>
          <template
            v-else-if="hotel.filters.payment.length === PaymentFiltersValues.length"
            >{{ q.i18n.filter.room.view.any }}</template
          >
          <template v-else-if="hotel.filters.payment.length === 1">
            <template v-if="hotel.filters.payment[0] === 'hotel'">{{
              q.i18n.filter.room.view.payment.hotel
            }}</template>
            <template v-if="hotel.filters.payment[0] === 'agency'">{{
              q.i18n.filter.room.view.payment.agency
            }}</template>
          </template>
        </div>
      </div>
      <UpDown />
    </div>
    <div :class="$style.filter" @click="$router.push('/rooms/filter/beds')">
      <div :class="$style.left">
        <div :class="$style.subtitle">{{ q.i18n.filter.room.view.bed.title }}</div>
        <div :class="$style.title">
          <template v-if="hotel.filters.beds.length === 0">{{
            q.i18n.filter.room.view.any
          }}</template>
          <template v-else-if="hotel.filters.beds.length === 1">
            <template v-if="hotel.filters.beds[0] === 'double'">{{
              q.i18n.filter.room.view.bed.double
            }}</template>
            <template v-if="hotel.filters.beds[0] === 'single'">{{
              q.i18n.filter.room.view.bed.single
            }}</template>
            <template v-if="hotel.filters.beds[0] === 'bunk'">{{
              q.i18n.filter.room.view.bed.bunk
            }}</template>
            <template v-if="hotel.filters.beds[0] === 'sofa'">{{
              q.i18n.filter.room.view.bed.sofa
            }}</template>
          </template>
          <template v-if="hotel.filters.beds.length > 1"
            >{{ hotel.filters.beds.length }} {{ q.i18n.option.mini }}</template
          >
        </div>
      </div>
      <UpDown />
    </div>
    <div :class="$style.filter" @click="$router.push('/rooms/filter/amenities')">
      <div :class="$style.left">
        <div :class="$style.subtitle">{{ q.i18n.filter.room.view.amenity }}</div>
        <div :class="$style.title">
          <template v-if="hotel.filters.amenities.length === 0">{{
            q.i18n.filter.room.view.any2
          }}</template>
          <template v-else-if="hotel.filters.amenities.length === 1">
            {{ hotel.filters.amenities[0] }}
          </template>
          <template v-if="hotel.filters.amenities.length > 1"
            >{{ hotel.filters.amenities.length }}
            {{
              hotel.filters.amenities.length > 10
                ? q.i18n.option.maxi
                : q.i18n.option.mini
            }}</template
          >
        </div>
      </div>
      <UpDown />
    </div>
  </Carousel>
</template>

<style module lang="scss">
.sort {
  margin-left: 16px;
  flex: 0 0 44px;
  min-width: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 44px;
  border-radius: 8px;
  background-color: var(--quarternary-fill-background);
  margin-right: 8px;
  cursor: pointer;
  path {
    fill: var(--tg-theme-text-color);
  }
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
.sorted {
  position: relative;
  &::before {
    content: "";
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: var(--tg-theme-text-color);
    right: 10px;
    top: 10px;
  }
}

.filter {
  flex: 0 0 auto;
  min-width: 0;
  padding: 5px 10px;
  margin-right: 8px;
  border-radius: 8px;
  background-color: var(--quarternary-fill-background);
  display: flex;
  gap: 12px;
  align-items: center;
  cursor: pointer;
  path {
    fill: var(--tg-theme-text-color);
  }
  &:last-child {
    margin-right: 16px;
  }
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
.title {
  font-size: 14px;
  font-weight: 600;
  line-height: 18px;
  color: var(--tg-theme-text-color);
}
.subtitle {
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  color: var(--tg-theme-hint-color);
}
</style>
