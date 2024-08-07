<script setup lang="ts">
import Block from "../ui/wrappers/Block.vue";
import Size from "../../assets/size.svg";
import Title from "../ui/wrappers/Title.vue";
import Text from "../ui/wrappers/Text.vue";
import {
  AvailableAmenityDto,
  AvailableMealDto,
  GuestDto,
  HotelOfferCancellationPolicyDto,
} from "../../utils";
import { useInter } from "../../utils/i18n";
import AmenityCarousel from "./AmenityCarousel.vue";
interface Props {
  am: AvailableAmenityDto[];
  name: string;
  meals: AvailableMealDto[];
  cancel: HotelOfferCancellationPolicyDto[];
  payment: string;
  image?: string;
  size?: number;
  guests?: GuestDto[];
}

defineProps<Props>();
const q = useInter();
</script>

<template>
  <Block>
    <div :class="$style.wrapper">
      <div :class="$style.top">
        <img :src="image" :class="$style.img" v-if="image" />
        <div :class="$style.info">
          <Title :class="$style.title">{{ name }}</Title>
          <Text :s="14" :l="18" :c="$style.gap" v-if="size">
            <Size />
            {{ size }} {{ q.i18n.summary.block.fmwogv }}²</Text
          >
          <!--          <Text :s="17" :l="22" :c="$style.gray">26 {{ q.i18n.summary.block.fmwogv }}², {{ q.i18n.summary.block.xtyqso }}</Text>-->
        </div>
      </div>
      <div :class="$style.table">
        <div :class="$style.item">
          <Text :s="17" :l="22" :c="$style.left">{{
            q.i18n.summary.block.fbpnbk
          }}</Text>
          <Text :s="17" :l="22" v-if="meals.length === 0">{{
            q.i18n.summary.block.czujdc
          }}</Text>
          <Text :s="17" :l="22" :c="$style.green" v-if="meals.length > 0">{{
            meals.filter((e) => e.included)[0].name
          }}</Text>
        </div>
        <div :class="$style.item">
          <Text :s="17" :l="22" :c="$style.left">{{
            q.i18n.summary.block.zxlnsu
          }}</Text>
          <Text :s="17" :l="22" v-if="cancel.length > 0">{{
            q.i18n.summary.block.mfkxgq
          }}</Text>
          <Text :s="17" :l="22" v-if="cancel.length === 0" :c="$style.green">{{
            q.i18n.summary.block.izfvdh
          }}</Text>
        </div>
        <div :class="$style.item">
          <Text :s="17" :l="22" :c="$style.left">{{
            q.i18n.summary.block.xbjwiw
          }}</Text>
          <Text :s="17" :l="22" v-if="payment === 'AGENCY'">{{
            q.i18n.summary.block.tlgtug
          }}</Text>
          <Text :s="17" :l="22" v-if="payment === 'HOTEL'" :c="$style.green">{{
            q.i18n.summary.block.rnamwt
          }}</Text>
        </div>
        <div :class="$style.item" v-if="guests && guests.length > 0">
          <Text :s="17" :l="22" :c="$style.left">{{
            q.i18n.summary.block.qlgaid
          }}</Text>
          <Text :s="17" :l="22" :c="$style.right">
            {{ guests.map((e) => e.firstName + " " + e.lastName).join(",") }}
          </Text>
        </div>
      </div>
      <AmenityCarousel :no-show="true" :am="am" />
    </div>
  </Block>
</template>

<style module lang="scss">
.wrapper {
  padding: 16px 0;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.top {
  padding: 0 16px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.gray {
  color: var(--tg-theme-hint-color);
}

.img {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  object-fit: cover;
}

.table {
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.item {
  display: flex;
  gap: 20px;
}

.left {
  min-width: 120px;
  color: var(--tg-theme-hint-color);
}

.green {
  color: #34c759;
}
.gap {
  display: flex;
  align-items: center;
  gap: 5px;
  rect {
    stroke: var(--tg-theme-text-color);
  }
  path {
    fill: var(--tg-theme-text-color);
  }
}
.title {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
