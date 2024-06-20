<script setup lang="ts">
// interface Props {
//   images: string[];
//   name: string;
//   stars: number;
//   rating: number;
//   review: number;
//   distance: number;
//   price: {
//     full: number;
//     day: number;
//   };
// }
// const props = defineProps<Props>();
import Carousel from "./Carousel.vue";
import StarsSmall from "../assets/icons/stars/star-small.svg";
import RatingView from "./RatingView.vue";
const url1 =
  "https://static1.cbrimages.com/wordpress/wp-content/uploads/2023/08/collage-maker-07-aug-2023-01-43-pm-4128.jpg";
const url2 =
  "https://www.ca.kayak.com/news/wp-content/uploads/sites/186/2023/08/THEME_HOTEL_SIGN_FIVE_STARS_FACADE_BUILDING_GettyImages-1320779330-3.jpg";
</script>

<template>
  <div :class="$style.card">
    <Carousel>
      <img :src="url2" :class="$style.image" />
      <img :src="url2" :class="$style.image" />
      <img :src="url1" :class="$style.image" />
    </Carousel>
    <div :class="$style.middle">
      <div :class="$style.name">
        Отель Метрополь
        <span>5 <StarsSmall /></span>
      </div>
      <div :class="$style.text">
        <RatingView :level="9" :clas="$style.rating" />
        <span>7829 отзывов</span>
        <span>•</span>
        <span>33,6 км от центра</span>
      </div>
    </div>
    <div :class="$style.bottom">
      <div :class="$style.price">50 500 ₽</div>
      <div :class="$style.day">25 250 ₽ за 1 ночь</div>
    </div>
  </div>
</template>

<style module lang="scss">
.middle {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding-left: 16px;
}
.name {
  font-size: 17px;
  font-weight: 600;
  line-height: 22px;
  letter-spacing: -0.43px;
  display: flex;
  gap: 8px;
  align-items: center;
  path {
    fill: var(--tg-theme-text-color);
  }
}
.rating {
  width: 20px;
  height: 23px;
}
.text {
  display: flex;
  gap: 6px;
  font-size: 13px;
  line-height: 22px;
  font-weight: 400;
}
.day {
  font-size: 13px;
  line-height: 24px;
  font-weight: 400;
}
.bottom {
  display: flex;
  gap: 6px;
  align-items: flex-end;
  padding-left: 16px;
}
.price {
  font-size: 22px;
  line-height: 28px;
  font-weight: 600;
  letter-spacing: -0.26px;
}
.card {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.image {
  flex: 0 0 340px;
  min-width: 0;
  margin-right: 8px;
  height: 240px;
  object-fit: cover;
  border-radius: 8px;
  &:first-child {
    margin-left: 16px;
  }
}
</style>
