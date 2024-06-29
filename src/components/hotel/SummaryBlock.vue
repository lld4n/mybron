<script setup lang="ts">
import Block from "../ui/wrappers/Block.vue";
// import AmenityCarousel from "./AmenityCarousel.vue";
import Title from "../ui/wrappers/Title.vue";
import Text from "../ui/wrappers/Text.vue";
import {
  AvailableAmenityDto,
  AvailableMealDto,
  HotelOfferCancellationPolicyDto,
} from "../../utils";
const url = "https://www.state.gov/wp-content/uploads/2019/04/Japan-2107x1406.jpg";
interface Props {
  am: AvailableAmenityDto[];
  name: string;
  noShowGuests?: boolean;
  meals: AvailableMealDto[];
  cancel: HotelOfferCancellationPolicyDto[];
  payment: string;
}

defineProps<Props>();
</script>

<template>
  <Block>
    <div :class="$style.wrapper">
      <div :class="$style.top">
        <img :src="url" :class="$style.img" />
        <div :class="$style.info">
          <Title>{{ name }}</Title>
          <!--          <Text :s="17" :l="22" :c="$style.gray">26 м², одна большая кровать</Text>-->
        </div>
      </div>
      <div :class="$style.table">
        <div :class="$style.item">
          <Text :s="17" :l="22" :c="$style.left">Питание</Text>
          <Text :s="17" :l="22" v-if="meals.length === 0">Без питания</Text>
          <Text :s="17" :l="22" :c="$style.green" v-if="meals.length > 0">{{
            meals[0].name
          }}</Text>
        </div>
        <div :class="$style.item">
          <Text :s="17" :l="22" :c="$style.left">Отмена брони</Text>
          <Text :s="17" :l="22" v-if="cancel.length > 0">Платная отмена</Text>
          <Text :s="17" :l="22" v-if="cancel.length === 0" :c="$style.green"
            >Бесплатная отмена</Text
          >
        </div>
        <div :class="$style.item">
          <Text :s="17" :l="22" :c="$style.left">Оплата</Text>
          <Text :s="17" :l="22" v-if="payment === 'AGENCY'">Предоплата картой</Text>
          <Text :s="17" :l="22" v-if="payment === 'HOTEL'" :c="$style.green"
            >Оплата на месте</Text
          >
        </div>
        <div :class="$style.item" v-if="!noShowGuests">
          <Text :s="17" :l="22" :c="$style.left">Гости</Text>
          <Text :s="17" :l="22" :c="$style.right"
            >Константин Рыськов, Анна Константинопольская</Text
          >
        </div>
      </div>
      <!--      <AmenityCarousel />-->
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
</style>
