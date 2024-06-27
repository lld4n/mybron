<script setup lang="ts">
import Block from "../ui/wrappers/Block.vue";
import CarouselCount from "../ui/carousel/CarouselCount.vue";
import Carousel from "../ui/carousel/Carousel.vue";
import Text from "../ui/wrappers/Text.vue";
// import AmenityCarousel from "../hotel/AmenityCarousel.vue";
import RoomItemCard from "./RoomItemCard.vue";
const url = "https://www.state.gov/wp-content/uploads/2019/04/Japan-2107x1406.jpg";
</script>

<template>
  <Block>
    <CarouselCount>
      <img :src="url" :class="$style.img" />
      <img :src="url" :class="$style.img" />
      <img :src="url" :class="$style.img" />
    </CarouselCount>
    <div :class="$style.content">
      <div :class="$style.header">
        <Text :s="22" :l="28" :w="600">Супериор с двуспальной кроватью</Text>
        <Text :s="17" :l="22" :c="$style.text">26 м², одна большая кровать</Text>
      </div>
      <!--      <AmenityCarousel />-->
      <Carousel>
        <RoomItemCard :class="$style.item" />
        <RoomItemCard :class="$style.item" />
        <RoomItemCard :class="$style.item" />
        <RoomItemCard :class="$style.item" />
        <RoomItemCard :class="$style.item" />
      </Carousel>
    </div>
  </Block>
</template>

<style module lang="scss">
.img {
  flex: 0 0 100%;
  min-width: 0;
  height: 250px;
  object-fit: cover;
}
.content {
  background-color: var(--tg-theme-bg-color);
  margin-top: -20px;
  z-index: 2;
}
.header {
  padding: 12px 16px 16px;
}
.text {
  color: var(--tg-theme-hint-color);
}
.item {
  margin-top: 16px;
  margin-bottom: 24px;
  margin-right: 8px;
  &:last-child {
    margin-right: 16px;
  }
  &:first-child {
    margin-left: 16px;
  }
}
</style>
