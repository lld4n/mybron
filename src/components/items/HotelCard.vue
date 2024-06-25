<script setup lang="ts">
import Carousel from "../ui/carousel/Carousel.vue";
import StarsSmall from "../../assets/icons/stars/star-small.svg";
// import RatingView from "../ui/views/RatingView.vue";
interface Props {
  images: string[];
  id: number;
  stars: number;
  name: string;
  reviews?: {
    rating: number;
    count: number;
  };
  center: number;
  price: { all: number; currency: string; nights: number };
}

defineProps<Props>();
</script>

<template>
  <div :class="$style.card" @click="$router.push('/hotel/1')">
    <Carousel>
      <img v-for="url of images" :src="url" alt="Image" :class="$style.image" />
    </Carousel>
    <div :class="$style.middle">
      <div :class="$style.name">
        <div>{{ name }}</div>
        <span>{{ stars }} <StarsSmall /></span>
      </div>
      <div :class="$style.text">
        <!--        <RatingView :level="9" type="small" />-->
        <!--        <span>7829 отзывов</span>-->
        <!--        <span>•</span>-->
        <span>{{ center }} км от центра</span>
      </div>
    </div>
    <div :class="$style.bottom">
      <div :class="$style.price">{{ price.all }} ₽</div>
      <div :class="$style.day" v-if="price.nights > 1">
        ~{{ Math.floor(price.all / (price.nights || 1)) }} ₽ за 1 ночь
      </div>
    </div>
  </div>
</template>

<style module lang="scss">
.middle {
  overflow: hidden;
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
  overflow: hidden;
  padding-right: 16px;
  path {
    fill: var(--tg-theme-text-color);
  }
  div {
    //flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  span {
    white-space: nowrap;
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
