<script setup lang="ts">
import Block from "../ui/wrappers/Block.vue";
import CarouselCount from "../ui/carousel/CarouselCount.vue";
import Carousel from "../ui/carousel/Carousel.vue";
import Text from "../ui/wrappers/Text.vue";
import AmenityCarousel from "../hotel/AmenityCarousel.vue";
import RoomItemCard from "./RoomItemCard.vue";
import { RenderRoom } from "../../pages/hotel/types.ts";
interface Props {
  room: RenderRoom;
  click: (code: string) => void;
}

defineProps<Props>();
</script>

<template>
  <Block v-if="room.rooms.length > 0">
    <CarouselCount>
      <img :src="url.url" :class="$style.img" v-for="url of room.room.photos.photos" />
    </CarouselCount>
    <div :class="$style.content">
      <div :class="$style.header">
        <Text :s="22" :l="28" :w="600">{{ room.room.name }}</Text>
        <!--        <Text :s="17" :l="22" :c="$style.text" v-if="room.beds.length > 0"-->
        <!--          ><Beds />x{{ room.beds[0].amount }} {{ room.beds[0].type }}</Text-->
        <!--        >-->
      </div>
      <AmenityCarousel
        :am="room.room.availableAmenities.availableAmenities"
        :no-show="true"
      />
      <Carousel>
        <RoomItemCard
          :class="$style.item"
          :item="item"
          v-for="item of room.rooms"
          :click="click"
        />
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
