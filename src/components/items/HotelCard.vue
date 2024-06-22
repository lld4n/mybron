<script setup lang="ts">
import Carousel from "../ui/carousel/Carousel.vue";
import StarsSmall from "../../assets/icons/stars/star-small.svg";
import RatingView from "../ui/views/RatingView.vue";
const url = "https://www.state.gov/wp-content/uploads/2019/04/Japan-2107x1406.jpg";
</script>

<template>
  <div :class="$style.card" @click="$router.push('/hotel/1')">
    <Carousel>
      <img :src="url" :class="$style.image" />
      <img :src="url" :class="$style.image" />
      <img :src="url" :class="$style.image" />
    </Carousel>
    <div :class="$style.middle">
      <div :class="$style.name">
        Отель Метрополь
        <span>5 <StarsSmall /></span>
      </div>
      <div :class="$style.text">
        <RatingView :level="9" type="small" />
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
  cursor: pointer;
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
